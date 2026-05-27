// frontend/src/components/ProjectLabSandbox.tsx
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, Pause, Sliders, CheckCircle2, 
  Terminal, ShieldAlert, BookOpen, BarChart2, DollarSign, Database, UserCheck 
} from 'lucide-react';

interface SandboxProps {
  projectId: string;
  themeColor: string; // 'amber' | 'emerald' | 'cyan' | 'violet' | 'rose'
}

export default function ProjectLabSandbox({ projectId, themeColor }: SandboxProps) {
  // We will build distinct, active states for each of the sandboxes
  
  // ==========================================
  // 1. TUNEAURA SANDBOX STATE
  // ==========================================
  const [synthPlaying, setSynthPlaying] = useState(false);
  const [binauralHz, setBinauralHz] = useState(10); // Alpha waves
  const [volume, setVolume] = useState(0.4);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Canvas wave rendering effect
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = themeColor === 'amber' ? '#fbbf24' : '#10b981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const amplitude = synthPlaying ? 25 * volume : 4;
      const waveSpeed = synthPlaying ? binauralHz * 0.05 : 0.05;

      for (let x = 0; x < canvas.width; x++) {
        // Multi-frequency wave formula
        const y = canvas.height / 2 + 
          Math.sin(x * 0.015 + offset) * amplitude + 
          Math.cos(x * 0.035 - offset * 1.5) * (amplitude * 0.3);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw active particles if playing
      if (synthPlaying) {
        ctx.fillStyle = themeColor === 'amber' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(16, 185, 129, 0.15)';
        for (let i = 0; i < 5; i++) {
          const px = (offset * 120 + i * 90) % canvas.width;
          const py = canvas.height / 2 + Math.sin(px * 0.015 + offset) * amplitude;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      offset += waveSpeed;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [synthPlaying, binauralHz, volume, themeColor]);

  // Audio Context synthesis
  const toggleSynth = () => {
    if (synthPlaying) {
      // Stop oscillator nodes
      try {
        if (osc1Ref.current) osc1Ref.current.stop();
        if (osc2Ref.current) osc2Ref.current.stop();
      } catch (e) {}
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setSynthPlaying(false);
    } else {
      // Start browser Web Audio synthesis
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Gain controller
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);
        gain.connect(ctx.destination);
        gainNodeRef.current = gain;

        // Base focus frequency (150Hz) and shifted frequency (150Hz + binaural offset)
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(140, ctx.currentTime);
        
        const osc2 = ctx.createOscillator();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(140 + binauralHz, ctx.currentTime);

        // Merge stereo separation using panners if supported, or direct mix
        const merger = ctx.createChannelMerger(2);
        osc1.connect(merger, 0, 0);
        osc2.connect(merger, 0, 1);
        merger.connect(gain);

        osc1.start();
        osc2.start();

        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        setSynthPlaying(true);
      } catch (e) {
        console.error('Web Audio API not supported or blocked:', e);
        // Fallback to fake play
        setSynthPlaying(true);
      }
    }
  };

  useEffect(() => {
    // Dynamic synth modulation
    if (synthPlaying && gainNodeRef.current && osc2Ref.current && audioCtxRef.current) {
      const ct = audioCtxRef.current.currentTime;
      gainNodeRef.current.gain.setValueAtTime(volume * 0.25, ct);
      osc2Ref.current.frequency.setValueAtTime(140 + binauralHz, ct);
    }
  }, [binauralHz, volume, synthPlaying]);

  useEffect(() => {
    // Teardown audio nodes on unmount
    return () => {
      try {
        if (osc1Ref.current) osc1Ref.current.stop();
        if (osc2Ref.current) osc2Ref.current.stop();
      } catch (e) {}
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // ==========================================
  // 2. STUDYBUDDY SANDBOX STATE
  // ==========================================
  const initialCards = [
    { q: 'What is the core difference between dense and sparse vectors in RAG systems?', a: 'Dense vectors capture deep semantic meanings and synonyms (e.g. OpenAI embeddings), while sparse vectors match exact keywords and lexical frequencies (e.g. BM25 indexes). Combined, they form Hybrid Search.' },
    { q: 'Explain the purpose of the SuperMemo SM-2 Interval Equation.', a: 'It calculates optimal spacings for reviewing items based on recall quality. The interval rises exponentially for high ratings (quality 4-5) to secure retention while minimizing study repetition counts.' },
    { q: 'How does WebRTC coordinate connection signaling without dedicated servers?', a: 'It uses temporary signaling hooks (like Socket.io or WebSockets) to exchange SDP offer/answer tokens and ICE network candidate pathways. Once connected, data syncs strictly peer-to-peer.' }
  ];
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [smParams, setSmParams] = useState({ interval: 1, repetitions: 0, ef: 2.5 });

  const handleSMAnswer = (score: number) => {
    // SuperMemo-2 scheduling math formulas
    let newRepetitions = 0;
    let newInterval = 1;
    let newEf = smParams.ef + (0.1 - (5 - score) * (0.08 + (5 - score) * 0.02));
    if (newEf < 1.3) newEf = 1.3;

    if (score >= 3) {
      if (smParams.repetitions === 0) {
        newInterval = 1;
      } else if (smParams.repetitions === 1) {
        newInterval = 6;
      } else {
        newInterval = Math.round(smParams.interval * newEf);
      }
      newRepetitions = smParams.repetitions + 1;
    } else {
      newRepetitions = 0;
      newInterval = 1;
    }

    setSmParams({ interval: newInterval, repetitions: newRepetitions, ef: Number(newEf.toFixed(2)) });
    setFlipped(false);
    // Cycle to next card
    setCurrentCardIdx((prev) => (prev + 1) % initialCards.length);
  };

  // ==========================================
  // 3. KUBEASSIST SANDBOX STATE
  // ==========================================
  const [k8sTerminalLogs, setK8sTerminalLogs] = useState<string[]>([
    'KUBEASSIST_CLI // AGENT ONLINE // namespace: default',
    'STATUS: Container auth-service-x23 has crashed in namespace default.',
    'REASON: CrashLoopBackOff // Exit Code: 137 (OOMKilled)',
    'Press "Troubleshoot Container" to initiate localized model diagnostics.'
  ]);
  const [k8sRunning, setK8sRunning] = useState(false);
  const [correctedYaml, setCorrectedYaml] = useState('');

  const troubleshootK8s = () => {
    if (k8sRunning) return;
    setK8sRunning(true);
    setK8sTerminalLogs([
      '[DAEMON] Hooking container auth-service-x23 stderr file buffers...',
      '[TELEMETRY] Scanning memory boundaries logs...',
      '[TELEMETRY] Java Heap limit set: -Xmx800m. Container allocation: memory.limit=512Mi.',
      '[DIAGNOSTIC] EXTREME OUT-OF-MEMORY LEAK DETECTED.',
      '[OLLAMA] Prompting localized Llama-3 model sidecar...',
      '[OLLAMA] Parsing structural manifest error files...',
      '[SUCCESS] Model solved discrepancy. Correcting YAML spec variables...'
    ]);

    setTimeout(() => {
      setK8sTerminalLogs(prev => [
        ...prev,
        '[LINT] Manifest output validated. Spec limits matched with security policy.',
        '[COMPLETED] Deployment YAML prepared. Apply changes using panel tools.'
      ]);
      setCorrectedYaml(`apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service-x23
spec:
  template:
    spec:
      containers:
      - name: auth-node
        image: auth-service:v2.1
        resources:
          requests:
            memory: "512Mi"
            cpu: "200m"
          limits:
            memory: "1024Mi" # Corrected limit (Java-Heap safe)
            cpu: "500m"`);
      setK8sRunning(false);
    }, 2000);
  };

  // ==========================================
  // 4. RIVALRISE SANDBOX STATE
  // ==========================================
  const [wargameMove, setWargameMove] = useState('lower_pricing');
  const [wargameLogs, setWargameLogs] = useState<string[]>([]);
  const [isWargaming, setIsWargaming] = useState(false);

  const triggerWargame = () => {
    setIsWargaming(true);
    setWargameLogs(['[SYSTEM] Loading Rival profiles from vector directories...']);
    
    setTimeout(() => {
      setWargameLogs(p => [...p, `[MOVE] User chosen action: ${wargameMove.toUpperCase()}`]);
    }, 400);

    setTimeout(() => {
      setWargameLogs(p => [...p, '[AGENT-A] Modeling Response: Price elasticity is high. Auto-pricing triggers competitive match (-12%).']);
    }, 900);

    setTimeout(() => {
      setWargameLogs(p => [...p, '[AGENT-B] Modeling Response: Shifts strategy to brand retention. Dispatches AdWords ad blitz targeted at users.']);
    }, 1400);

    setTimeout(() => {
      setWargameLogs(p => [...p, '[WARGAME] Solved Equilibrium: Market stabilization achieved. Margin impact: User (-4%), Competitors (-9%). Nash value solved.']);
      setIsWargaming(false);
    }, 2000);
  };

  // ==========================================
  // 5. RESTAURANT AGENT SANDBOX STATE
  // ==========================================
  const [tasteNotes, setTasteNotes] = useState<string[]>(['Spicy']);
  const [suggestedRoute, setSuggestedRoute] = useState<{ name: string; match: string; address: string; routeMins: number }[]>([]);
  
  const toggleTaste = (note: string) => {
    if (tasteNotes.includes(note)) {
      setTasteNotes(tasteNotes.filter(t => t !== note));
    } else {
      setTasteNotes([...tasteNotes, note]);
    }
  };

  const generateItinerary = () => {
    if (tasteNotes.length === 0) return;
    const db: Record<string, { name: string; match: string; address: string; routeMins: number }[]> = {
      'Spicy': [
        { name: 'Sichuan Pavilion', match: '96% Match (Spicy, Numbling Sichuan Pepper)', address: '12 Brigade Road, Bangalore', routeMins: 12 },
        { name: 'Chili Dragon Cafe', match: '88% Match (Spicy, Volcano Noodles)', address: '24 MG Road, Bangalore', routeMins: 8 }
      ],
      'Umami': [
        { name: 'Izakaya Tenshin', match: '98% Match (Umami, Miso Glazed Pork)', address: '18 Indiranagar, Bangalore', routeMins: 15 },
        { name: 'Dashi Ramen House', match: '92% Match (Umami, Double Shoyu Broth)', address: '45 Koramangala, Bangalore', routeMins: 10 }
      ],
      'Tangy': [
        { name: 'Citrus Bistro', match: '91% Match (Citrus, Lemon Sorbet and Tarts)', address: '5 Lavelle Road, Bangalore', routeMins: 20 },
        { name: 'Tamarind Fusion', match: '87% Match (Tangy, Tamarind reduction)', address: '3 Jayanagar, Bangalore', routeMins: 14 }
      ]
    };
    
    // Merge results
    let merged: typeof suggestedRoute = [];
    tasteNotes.forEach(note => {
      if (db[note]) merged = [...merged, ...db[note]];
    });
    setSuggestedRoute(merged.slice(0, 3));
  };

  // ==========================================
  // 6. ECOTRACK SANDBOX STATE
  // ==========================================
  const [distanceMiles, setDistanceMiles] = useState(150);
  const [factoryKwh, setFactoryKwh] = useState(400);
  const totalCarbonKg = (distanceMiles * 0.411 + factoryKwh * 0.92).toFixed(1);

  // ==========================================
  // 7. FANVERSI SANDBOX STATE
  // ==========================================
  const [storyDraft, setStoryDraft] = useState('Aragorn reached for his laser blaster to destroy the cybernetic orcs in Rivendell.');
  const [loreInfractions, setLoreInfractions] = useState<{ word: string; category: string; description: string }[]>([]);
  const [scannedLore, setScannedLore] = useState(false);

  const scanLore = () => {
    setScannedLore(true);
    const infractions = [];
    if (storyDraft.toLowerCase().includes('laser') || storyDraft.toLowerCase().includes('blaster')) {
      infractions.push({ word: 'laser blaster', category: 'Technology Anachronism', description: 'Laser systems and plasma weaponry violate Middle-Earth Third Age technology levels.' });
    }
    if (storyDraft.toLowerCase().includes('cybernetic')) {
      infractions.push({ word: 'cybernetic', category: 'Lore Concept Mismatch', description: 'Cybernetics and robot upgrades contradict canonical Tolkien fantasy biology rules.' });
    }
    setLoreInfractions(infractions);
  };

  // ==========================================
  // 8. ELECTION SIMULATOR STATE
  // ==========================================
  const [stateSwing, setStateSwing] = useState({ PA: 49.2, OH: 47.8, WI: 50.5 });
  const [campaignFocus, setCampaignFocus] = useState('economy');
  const [isCampaigning, setIsCampaigning] = useState(false);

  const runCampaign = () => {
    setIsCampaigning(true);
    setTimeout(() => {
      if (campaignFocus === 'economy') {
        setStateSwing({
          PA: Number((stateSwing.PA + 1.2).toFixed(1)),
          OH: Number((stateSwing.OH + 2.1).toFixed(1)),
          WI: Number((stateSwing.WI + 0.5).toFixed(1)),
        });
      } else if (campaignFocus === 'healthcare') {
        setStateSwing({
          PA: Number((stateSwing.PA + 1.8).toFixed(1)),
          OH: Number((stateSwing.OH - 0.4).toFixed(1)),
          WI: Number((stateSwing.WI + 1.4).toFixed(1)),
        });
      } else {
        setStateSwing({
          PA: Number((stateSwing.PA - 0.5).toFixed(1)),
          OH: Number((stateSwing.OH + 1.8).toFixed(1)),
          WI: Number((stateSwing.WI - 0.2).toFixed(1)),
        });
      }
      setIsCampaigning(false);
    }, 1000);
  };

  // ==========================================
  // 9. BANK SYSTEM LEDGER SANDBOX STATE
  // ==========================================
  const [ledgerLogs, setLedgerLogs] = useState<string[]>([
    '[SYSTEM] Raft Ledger Node Cluster initialized.',
    '[NODES] Replication Leader: node_1 (active). Followers: node_2, node_3.',
    '[LEDGER] Current Balances: Account_A = $1500, Account_B = $300'
  ]);
  const [transAmt, setTransAmt] = useState(150);
  const [isTransacting, setIsTransacting] = useState(false);

  const triggerTransaction = () => {
    if (isTransacting) return;
    setIsTransacting(true);
    setLedgerLogs(p => [...p, `[INIT] Request: Transfer $${transAmt} from Account_A -> Account_B`]);

    setTimeout(() => {
      setLedgerLogs(p => [...p, '[CONSENSUS] Raft leader acquiring transaction mutability lock.']);
    }, 300);

    setTimeout(() => {
      setLedgerLogs(p => [...p, '[BALANCE] Checking Account_A balance... Validated ($1500 >= $150).']);
    }, 600);

    setTimeout(() => {
      setLedgerLogs(p => [...p, '[REPLICATE] Distributing WAL ledger logs to node_2 and node_3 follower replicas...']);
    }, 950);

    setTimeout(() => {
      setLedgerLogs(p => [...p, '[AUDIT] Commit double-entry ledger stream: [ACC_A: -$150] | [ACC_B: +$150]. Hash: cb89f...']);
    }, 1300);

    setTimeout(() => {
      setLedgerLogs(p => [...p, `[SUCCESS] Transaction committed. Balanced Sync state. Acc_A: $1350, Acc_B: $450.`]);
      setIsTransacting(false);
    }, 1600);
  };

  return (
    <div className="w-full bg-zinc-950/80 border border-zinc-900 rounded-xl p-6 relative backdrop-blur-md">
      
      {/* Background ambient lighting overlay */}
      <div className={`absolute top-0 right-0 w-36 h-36 bg-${themeColor}-500/5 rounded-full filter blur-2xl pointer-events-none`} />

      {/* 1. TUNEAURA SANDBOX */}
      {projectId === 'tuneaura' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" /> Web Audio Synthesizer Interface
            </h4>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
              Procedural Synthesis
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">Binaural Frequency Offset</span>
                  <span className="text-amber-400 font-bold">{binauralHz} Hz (Alpha Focus)</span>
                </div>
                <input 
                  type="range" min="4" max="25" value={binauralHz} 
                  onChange={(e) => setBinauralHz(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-900 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">Master Level volume</span>
                  <span className="text-amber-400 font-bold">{Math.round(volume * 100)}%</span>
                </div>
                <input 
                  type="range" min="0" max="1" step="0.05" value={volume} 
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-amber-500 bg-zinc-900 h-1 rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={toggleSynth}
                className={`w-full py-3 border font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 ${
                  synthPlaying 
                    ? 'border-amber-500 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20' 
                    : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-700 hover:text-white'
                }`}
              >
                {synthPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" /> Stop Synthesis Session
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Begin Focus Synthesis
                  </>
                )}
              </button>
            </div>

            <div className="flex flex-col border border-zinc-900 rounded-lg p-4 bg-black/90">
              <span className="text-[10px] text-zinc-500 font-mono uppercase mb-2">Procedural Frequency Waveform</span>
              <canvas ref={canvasRef} width="350" height="110" className="w-full h-[110px] rounded bg-zinc-950" />
              <span className="text-[8px] text-zinc-600 font-mono mt-2 text-right">
                Active OSC Output: Sine(140Hz) + Sine(140Hz + {binauralHz}Hz) representing Combined Focus state
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 2. STUDYBUDDY SANDBOX */}
      {projectId === 'studybuddy' && (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" /> SuperMemo SM-2 Interval Sandbox
            </h4>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
              RAG Quiz Core
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {/* Flashcard container */}
            <div className="md:col-span-3 flex flex-col gap-3">
              <div className="min-h-[170px] bg-black/80 border border-zinc-800 rounded-xl p-5 flex flex-col justify-between relative overflow-hidden">
                <div className="space-y-2">
                  <span className="text-[8px] tracking-wider uppercase text-zinc-600 font-bold">RAG FLASHCARD 0{currentCardIdx + 1}</span>
                  <p className="text-xs text-white font-sans font-medium leading-relaxed">
                    {initialCards[currentCardIdx].q}
                  </p>
                  
                  {flipped && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-xs text-zinc-400 pt-3 border-t border-zinc-900 font-sans leading-relaxed mt-4"
                    >
                      {initialCards[currentCardIdx].a}
                    </motion.div>
                  )}
                </div>

                {!flipped ? (
                  <button 
                    onClick={() => setFlipped(true)}
                    className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-[10px] font-bold text-white uppercase rounded-lg cursor-pointer"
                  >
                    Reveal Vectorized Answer
                  </button>
                ) : (
                  <div className="flex gap-2 justify-between mt-4">
                    <button onClick={() => handleSMAnswer(1)} className="flex-1 py-1.5 bg-red-950/20 border border-red-900/40 hover:bg-red-900/10 text-[9px] font-bold text-red-400 rounded uppercase cursor-pointer">Fail</button>
                    <button onClick={() => handleSMAnswer(3)} className="flex-1 py-1.5 bg-yellow-950/20 border border-yellow-900/40 hover:bg-yellow-900/10 text-[9px] font-bold text-yellow-400 rounded uppercase cursor-pointer">Hard</button>
                    <button onClick={() => handleSMAnswer(5)} className="flex-1 py-1.5 bg-emerald-950/20 border border-emerald-900/40 hover:bg-emerald-900/10 text-[9px] font-bold text-emerald-400 rounded uppercase cursor-pointer">Easy</button>
                  </div>
                )}
              </div>
            </div>

            {/* Algorithm stats panel */}
            <div className="md:col-span-2 bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between font-mono text-[10px]">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase tracking-widest block border-b border-zinc-900 pb-1.5 mb-3">SM-2 Spacing Factors</span>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Calculated Interval:</span>
                    <span className="text-emerald-400 font-bold">{smParams.interval} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Repetitions Score:</span>
                    <span className="text-emerald-400 font-bold">{smParams.repetitions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Easiness Factor (EF):</span>
                    <span className="text-emerald-400 font-bold">{smParams.ef}</span>
                  </div>
                </div>
              </div>

              <div className="text-[8px] text-zinc-600 leading-relaxed border-t border-zinc-900 pt-2.5 font-sans">
                Every rating choice dynamically modifies the Easiness Factor and computes card scheduling to prevent memory decay.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. KUBEASSIST SANDBOX */}
      {projectId === 'kubeassist' && (
        <div className="flex flex-col gap-4 font-mono text-xs text-zinc-400">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400" /> Dynamic K8s Linter & Terminal Sidecar
            </h4>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">
              Container Telemetry
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-4 min-h-[220px]">
            {/* Command terminal logs */}
            <div className="flex flex-col bg-black/90 border border-zinc-900 rounded-lg p-4 justify-between h-[220px]">
              <div className="space-y-1 overflow-y-auto max-h-[140px] custom-scrollbar text-[9px] leading-relaxed">
                {k8sTerminalLogs.map((log, i) => {
                  let color = 'text-zinc-500';
                  if (log.includes('REASON:')) color = 'text-red-400 font-bold';
                  else if (log.includes('STATUS:')) color = 'text-yellow-400';
                  else if (log.startsWith('[OLLAMA]')) color = 'text-purple-400';
                  else if (log.includes('[SUCCESS]')) color = 'text-green-400 font-bold';
                  else if (log.startsWith('[COMPLETED]')) color = 'text-cyan-400 font-bold';
                  return <div key={i} className={color}>{log}</div>;
                })}
              </div>

              <button
                onClick={troubleshootK8s}
                disabled={k8sRunning}
                className="w-full py-2 bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/30 text-[10px] font-bold text-cyan-400 rounded uppercase cursor-pointer"
              >
                {k8sRunning ? 'Processing Diagnostics...' : 'Troubleshoot Container'}
              </button>
            </div>

            {/* Yaml correction viewer */}
            <div className="flex flex-col bg-zinc-950 border border-zinc-900 rounded-lg p-4 justify-between h-[220px]">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block mb-2 border-b border-zinc-900 pb-1">Automated YAML Patch</span>
                {correctedYaml ? (
                  <pre className="text-[8px] text-green-400 font-mono overflow-y-auto max-h-[140px] custom-scrollbar leading-tight bg-black/50 p-2.5 rounded border border-zinc-900">
                    {correctedYaml}
                  </pre>
                ) : (
                  <div className="h-[120px] flex items-center justify-center border border-dashed border-zinc-900 text-[9px] text-zinc-600 text-center px-4">
                    Diagnostics not executed yet. Click Troubleshoot on the terminal.
                  </div>
                )}
              </div>
              
              {correctedYaml && (
                <div className="flex items-center gap-1.5 text-[8px] text-green-400 bg-green-500/5 px-2.5 py-1.5 border border-green-500/20 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Dry-Run Kube-Linter passes. Ready to deploy.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. RIVALRISE SANDBOX */}
      {projectId === 'rivalrise' && (
        <div className="flex flex-col gap-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-violet-400" /> Swarm Wargaming Matrix
            </h4>
            <span className="text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded uppercase">
              Nash Equilibrium Solver
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] text-zinc-500 uppercase block">Inject Market Decision</label>
                <select 
                  value={wargameMove} 
                  onChange={(e) => setWargameMove(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded p-2.5 text-zinc-300 text-xs focus:border-violet-500"
                >
                  <option value="lower_pricing">Lower SaaS prices by 15%</option>
                  <option value="merge_analytics">Aquire regional analytics provider</option>
                  <option value="open_source">Open source database engine core</option>
                </select>
              </div>

              <button
                onClick={triggerWargame}
                disabled={isWargaming}
                className="w-full py-2.5 bg-violet-950/20 hover:bg-violet-950/40 border border-violet-500/30 text-[10px] font-bold text-violet-400 rounded uppercase cursor-pointer"
              >
                {isWargaming ? 'Executing game loops...' : 'Simulate Competitor Swarm'}
              </button>
            </div>

            <div className="md:col-span-3 flex flex-col bg-black/90 border border-zinc-900 rounded-lg p-4 justify-between min-h-[170px]">
              <div className="space-y-2">
                <span className="text-[8px] text-zinc-500 uppercase block">Active Swarm Decisions Timeline</span>
                <div className="space-y-1.5 max-h-[110px] overflow-y-auto custom-scrollbar text-[9px] leading-relaxed">
                  {wargameLogs.length > 0 ? (
                    wargameLogs.map((log, i) => {
                      let color = 'text-zinc-400';
                      if (log.startsWith('[MOVE]')) color = 'text-white font-bold';
                      else if (log.startsWith('[AGENT-A]')) color = 'text-cyan-400';
                      else if (log.startsWith('[AGENT-B]')) color = 'text-amber-400';
                      else if (log.startsWith('[WARGAME]')) color = 'text-green-400 font-bold text-glow-green';
                      return <div key={i} className={color}>{log}</div>;
                    })
                  ) : (
                    <div className="text-zinc-600 text-center py-6">Awaiting simulation trigger parameters.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. RESTAURANT AGENT SANDBOX */}
      {projectId === 'airestaurant' && (
        <div className="flex flex-col gap-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-rose-400" /> Taste Vector Alignment Itinerary Builder
            </h4>
            <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase">
              Location Agent
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block mb-2">Vector Flavor Alignment Tags</span>
                <div className="flex flex-wrap gap-2">
                  {['Spicy', 'Umami', 'Tangy'].map((note) => {
                    const active = tasteNotes.includes(note);
                    return (
                      <button
                        key={note}
                        onClick={() => toggleTaste(note)}
                        className={`px-3 py-1.5 border rounded text-[10px] font-bold cursor-pointer uppercase transition-all ${
                          active
                            ? 'bg-rose-500/25 border-rose-500 text-rose-400'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                        }`}
                      >
                        {note}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={generateItinerary}
                className="w-full py-2 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/30 text-[10px] font-bold text-rose-400 rounded uppercase cursor-pointer"
              >
                Synthesize Itinerary Route
              </button>
            </div>

            <div className="md:col-span-3 flex flex-col bg-black/95 border border-zinc-900 rounded-lg p-4 min-h-[160px] justify-between">
              <span className="text-[8px] text-zinc-500 uppercase block mb-1">Generated Route Stops</span>
              <div className="space-y-2 flex-1 max-h-[110px] overflow-y-auto custom-scrollbar pt-2">
                {suggestedRoute.length > 0 ? (
                  suggestedRoute.map((stop, idx) => (
                    <div key={idx} className="p-2 border border-zinc-900 bg-zinc-950 rounded flex justify-between items-center text-[10px]">
                      <div>
                        <div className="text-white font-bold">{idx + 1}. {stop.name}</div>
                        <div className="text-[9px] text-zinc-500">{stop.address}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-rose-400 font-bold block">{stop.match}</span>
                        <span className="text-[8px] text-zinc-600 block">Drive: {stop.routeMins} mins</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-zinc-600 text-center py-6">Select flavor alignment notes and build itinerary.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. ECOTRACK SANDBOX */}
      {projectId === 'ecotrack' && (
        <div className="flex flex-col gap-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" /> Edge carbon calculation dashboard
            </h4>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
              TFLite Edge Core
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Logistics distances (Truck miles)</span>
                  <span className="text-emerald-400 font-bold">{distanceMiles} miles</span>
                </div>
                <input 
                  type="range" min="10" max="500" value={distanceMiles}
                  onChange={(e) => setDistanceMiles(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-900 h-1 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Factory operations load (kWh)</span>
                  <span className="text-emerald-400 font-bold">{factoryKwh} kWh</span>
                </div>
                <input 
                  type="range" min="50" max="1000" value={factoryKwh}
                  onChange={(e) => setFactoryKwh(Number(e.target.value))}
                  className="w-full accent-emerald-500 bg-zinc-900 h-1 rounded-lg"
                />
              </div>
            </div>

            <div className="bg-black/90 border border-zinc-900 rounded-xl p-5 flex flex-col justify-between items-center text-center">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block mb-1">AGGREGATED EMISSIONS OFFSET</span>
                <div className="text-3xl font-black text-white">{totalCarbonKg} <span className="text-xs text-zinc-500">CO2 kg</span></div>
              </div>
              
              <div className="mt-3 flex items-center gap-2 text-[9px] text-green-400 bg-green-500/5 px-3 py-1.5 border border-green-500/10 rounded">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Edge metrics hashed and compiled successfully.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. FANVERSI SANDBOX */}
      {projectId === 'fanversi' && (
        <div className="flex flex-col gap-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Database className="w-4 h-4 text-violet-400" /> Lore consistency vector scanner
            </h4>
            <span className="text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded uppercase">
              RAG Validation
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-3 space-y-3">
              <span className="text-[9px] text-zinc-500 uppercase block">Chapter Draft Text Workspace</span>
              <textarea 
                value={storyDraft}
                onChange={(e) => setStoryDraft(e.target.value)}
                className="w-full h-[120px] bg-black border border-zinc-800 rounded p-3 text-zinc-300 text-xs focus:border-violet-500 custom-scrollbar focus:outline-none"
              />
              <button
                onClick={scanLore}
                className="w-full py-2 bg-violet-950/20 hover:bg-violet-950/40 border border-violet-500/30 text-[10px] font-bold text-violet-400 rounded uppercase cursor-pointer"
              >
                Scan Lore Canon Consistency
              </button>
            </div>

            <div className="md:col-span-2 bg-zinc-950 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block mb-3 border-b border-zinc-900 pb-1">Canon Infraction Warnings</span>
                <div className="space-y-3">
                  {scannedLore ? (
                    loreInfractions.length > 0 ? (
                      loreInfractions.map((warn, i) => (
                        <div key={i} className="text-[9px] border border-red-500/20 bg-red-500/5 p-2 rounded">
                          <div className="text-red-400 font-bold uppercase">{warn.category}</div>
                          <div className="text-zinc-500 italic mt-0.5">Found: "{warn.word}"</div>
                          <p className="text-zinc-400 mt-1 font-sans leading-tight">{warn.description}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-[10px] text-green-400 bg-green-500/5 border border-green-500/20 rounded p-2.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>Lore consistency intact! 100% compliant.</span>
                      </div>
                    )
                  ) : (
                    <div className="text-[9px] text-zinc-600 text-center py-6">Awaiting canon validation scan...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. ELECTION SIMULATOR SANDBOX */}
      {projectId === 'election' && (
        <div className="flex flex-col gap-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" /> Electoral Demographic State Simulator
            </h4>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase">
              Agent-Based Matrix
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <span className="text-[9px] text-zinc-500 uppercase block mb-2">Campaign focal message</span>
                <div className="flex flex-col gap-2">
                  {[
                    { id: 'economy', label: 'Pro-Growth Tax Adjustments' },
                    { id: 'healthcare', label: 'Universal Health Care Credits' }
                  ].map((focus) => (
                    <button
                      key={focus.id}
                      onClick={() => setCampaignFocus(focus.id)}
                      className={`p-2.5 border text-left rounded text-[10px] font-bold cursor-pointer uppercase transition-all ${
                        campaignFocus === focus.id
                          ? 'bg-cyan-500/25 border-cyan-500 text-cyan-400'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-300'
                      }`}
                    >
                      {focus.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={runCampaign}
                disabled={isCampaigning}
                className="w-full py-2 bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/30 text-[10px] font-bold text-cyan-400 rounded uppercase cursor-pointer"
              >
                {isCampaigning ? 'Running campaign simulations...' : 'Launch Campaign Drive'}
              </button>
            </div>

            <div className="md:col-span-3 bg-black/90 border border-zinc-900 rounded-lg p-4 min-h-[160px] flex flex-col justify-between">
              <span className="text-[8px] text-zinc-500 uppercase block mb-3">State Vote Margin Swings</span>
              <div className="space-y-3 pt-1 flex-1">
                {Object.entries(stateSwing).map(([state, val]) => {
                  const percentVal = Math.min(Math.max(val, 40), 60);
                  const delta = (val - 50).toFixed(1);
                  const isLead = val >= 50;

                  return (
                    <div key={state} className="space-y-1 text-[10px]">
                      <div className="flex justify-between font-bold">
                        <span className="text-white">{state} Swing state</span>
                        <span className={isLead ? 'text-cyan-400' : 'text-rose-400'}>
                          {isLead ? `Lead +${delta}%` : `Deficit ${delta}%`} ({val}%)
                        </span>
                      </div>
                      <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden relative">
                        <div 
                          className={`h-full transition-all duration-500 ${isLead ? 'bg-cyan-500' : 'bg-rose-500'}`}
                          style={{ width: `${percentVal}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. BANK SYSTEM LEDGER SANDBOX */}
      {projectId === 'bank' && (
        <div className="flex flex-col gap-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-rose-400" /> Append-Only Replicated Consensus Ledger
            </h4>
            <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase">
              Raft WAL Ledger
            </span>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="space-y-2">
                <span className="text-[9px] text-zinc-500 uppercase block">Input Transaction Amount</span>
                <input 
                  type="number" value={transAmt}
                  onChange={(e) => setTransAmt(Math.max(Number(e.target.value), 1))}
                  className="w-full bg-black border border-zinc-800 rounded p-2.5 text-zinc-300 text-xs focus:border-rose-500 focus:outline-none"
                />
              </div>

              <button
                onClick={triggerTransaction}
                disabled={isTransacting}
                className="w-full py-2 bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/30 text-[10px] font-bold text-rose-400 rounded uppercase cursor-pointer"
              >
                {isTransacting ? 'Processing Consensus logs...' : 'Submit Transaction'}
              </button>
            </div>

            <div className="md:col-span-3 bg-black/95 border border-zinc-900 rounded-lg p-4 min-h-[170px] flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[8px] text-zinc-500 uppercase block">Raft Ledger Transaction Pipeline Logs</span>
                <div className="space-y-1 max-h-[110px] overflow-y-auto custom-scrollbar text-[9px] leading-relaxed">
                  {ledgerLogs.map((log, i) => {
                    let color = 'text-zinc-500';
                    if (log.startsWith('[INIT]')) color = 'text-white font-bold';
                    else if (log.startsWith('[BALANCE]')) color = 'text-yellow-400';
                    else if (log.startsWith('[REPLICATE]')) color = 'text-purple-400';
                    else if (log.startsWith('[AUDIT]')) color = 'text-cyan-400';
                    else if (log.startsWith('[SUCCESS]')) color = 'text-green-400 font-bold text-glow-green';
                    return <div key={i} className={color}>{log}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
