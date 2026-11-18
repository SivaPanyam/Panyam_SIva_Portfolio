// frontend/src/components/ProjectLabSandbox.tsx
import { useState } from 'react';
import { 
  Play, Pause, CheckCircle2, 
  Terminal, ShieldAlert, Cpu, Leaf, Database, BarChart2, Target, RotateCcw
} from 'lucide-react';

interface SandboxProps {
  projectId: string;
  themeColor?: string; // 'amber' | 'emerald' | 'cyan' | 'violet' | 'rose'
}

export default function ProjectLabSandbox({ projectId }: SandboxProps) {
  // ==========================================
  // 1. AGENTBENCH-LITE SANDBOX (FAULT INJECTION & RECOVERY)
  // ==========================================
  const [agentStrategy, setAgentStrategy] = useState<'baseline' | 'recovery'>('recovery');
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [agentLogs, setAgentLogs] = useState<string[]>([
    '[INIT] Benchmark task #4: Query customer profile & verify status',
    '[READY] Click "Run Benchmark Test" to observe execution loop.'
  ]);

  const runAgentTest = () => {
    if (agentRunning) return;
    setAgentRunning(true);
    setAgentStep(0);
    setAgentLogs(['[INIT] Executing task with strategy: ' + agentStrategy.toUpperCase()]);

    const steps = agentStrategy === 'baseline' 
      ? [
          '[STEP 1] Model requests action: lookup_customer(id="USR_4920")',
          '[FAULT] Runtime exception injected: tool "lookup_customer" parameter mismatch (expected int, got str)',
          '[ERROR] Baseline agent has no structured error recovery handler.',
          '[FAILED] Task terminated in step 2 with terminal status: FAILED (0% recovery rate)'
        ]
      : [
          '[STEP 1] Model requests action: lookup_customer(id="USR_4920")',
          '[FAULT] Runtime exception injected: parameter schema validation failed.',
          '[BOUNDED RECOVERY] Error frame injected back to model: {"error": "validation_error", "retries_left": 1}',
          '[STEP 2] Model self-corrects: lookup_customer(id=4920)',
          '[SUCCESS] Tool executed successfully. Customer verified.',
          '[COMPLETED] Task resolved under bounded limit in 2 steps (100% recovery rate)'
        ];

    steps.forEach((msg, idx) => {
      setTimeout(() => {
        setAgentLogs(prev => [...prev, msg]);
        setAgentStep(idx + 1);
        if (idx === steps.length - 1) {
          setAgentRunning(false);
        }
      }, (idx + 1) * 750);
    });
  };

  // ==========================================
  // 2. VOICEKISAN SANDBOX (MULTIMODAL DIALECT PIPELINE)
  // ==========================================
  const [selectedCrop, setSelectedCrop] = useState('tomato');
  const [selectedDistrict, setSelectedDistrict] = useState('Kurnool');
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('కర్నూలు మార్కెట్లో టమాటా ధర ఎంత ఉంది?');
  const [mandiOutput, setMandiOutput] = useState<{ price: number; trend: string; confidence: number }>({
    price: 1850,
    trend: '+8.4% (Next 7 days)',
    confidence: 94
  });

  const triggerVoiceQuery = () => {
    setIsProcessingVoice(true);
    setTimeout(() => {
      const basePrices: Record<string, number> = {
        tomato: 1850,
        onion: 2400,
        chilli: 16500,
        potato: 1420
      };
      setVoiceTranscript(`కర్నూలు మార్కెట్లో ${selectedCrop} ధర ఎంత ఉంది?`);
      setMandiOutput({
        price: basePrices[selectedCrop] || 2000,
        trend: '+6.2% expected based on regional rainfall',
        confidence: 96
      });
      setIsProcessingVoice(false);
    }, 1000);
  };

  // ==========================================
  // 3. RECALL-OS (HYBRID SEMANTIC SEARCH RETRIEVAL)
  // ==========================================
  const [searchQuery, setSearchQuery] = useState('EPERM operation not permitted');
  const [searchResults, setSearchResults] = useState([
    { id: 'MEM_901a', title: 'Windows OneDrive EPERM lock resolution', bm25: 0.94, cosine: 0.98, rrf: 0.96 },
    { id: 'MEM_842b', title: 'Vite node_modules .vite-temp permission patch', bm25: 0.89, cosine: 0.92, rrf: 0.91 },
    { id: 'MEM_714c', title: 'PowerShell script execution policy unlock', bm25: 0.72, cosine: 0.84, rrf: 0.78 }
  ]);

  const runHybridSearch = (q: string) => {
    setSearchQuery(q);
    if (!q.trim()) return;
    setSearchResults([
      { id: 'MEM_901a', title: `Resolved: ${q} root cause & workaround`, bm25: 0.95, cosine: 0.97, rrf: 0.96 },
      { id: 'MEM_842b', title: `Architecture spec: local hybrid storage index`, bm25: 0.88, cosine: 0.91, rrf: 0.90 },
      { id: 'MEM_714c', title: `CLI daemon memory compaction notes`, bm25: 0.68, cosine: 0.81, rrf: 0.75 }
    ]);
  };

  // ==========================================
  // 4. LOCAL-RAG / MINI-SEMANTIC-SEARCH (COSINE SIMILARITY ENGINE)
  // ==========================================
  const [vA, setVA] = useState<[number, number, number]>([0.8, 0.6, 0.0]);
  const [vB, setVB] = useState<[number, number, number]>([0.6, 0.8, 0.0]);

  const computeCosine = (a: [number, number, number], b: [number, number, number]) => {
    const dot = a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
    const normA = Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]) || 1;
    const normB = Math.sqrt(b[0]*b[0] + b[1]*b[1] + b[2]*b[2]) || 1;
    return dot / (normA * normB);
  };
  const cosineScore = computeCosine(vA, vB);

  // ==========================================
  // 5. AEGIS-AI (CLEAN ARCHITECTURE BOUNDARY CHECK)
  // ==========================================
  const [activeLayer, setActiveLayer] = useState<'entity' | 'usecase' | 'adapter' | 'framework'>('usecase');

  // ==========================================
  // 6. AGRICAST-AI (TIME-SERIES FORECAST INSPECTOR)
  // ==========================================
  const [forecastHorizon, setForecastHorizon] = useState<7 | 14 | 30>(14);

  // ==========================================
  // 7. GITOPS-WARROOM (VIRTUAL GIT DAG INCIDENT)
  // ==========================================
  const [resolvedIncident, setResolvedIncident] = useState(false);

  // ==========================================
  // 8. GRADIENT-DESCENT-PLAYGROUND (LOSS SURFACE OPTIMIZER)
  // ==========================================
  const [learningRate, setLearningRate] = useState(0.1);
  const [optimizerType, setOptimizerType] = useState<'sgd' | 'momentum' | 'adam'>('adam');
  const [gdStep, setGdStep] = useState(0);
  const [currentCoord, setCurrentCoord] = useState<[number, number]>([2.5, 2.5]);
  const currentLoss = (currentCoord[0] ** 2 + currentCoord[1] ** 2).toFixed(4);

  const stepOptimizer = () => {
    setGdStep(prev => prev + 1);
    setCurrentCoord(([x, y]) => {
      const gradX = 2 * x;
      const gradY = 2 * y;
      const rate = optimizerType === 'adam' ? learningRate * 1.5 : optimizerType === 'momentum' ? learningRate * 1.2 : learningRate;
      const nextX = Math.max(-3, Math.min(3, x - gradX * rate));
      const nextY = Math.max(-3, Math.min(3, y - gradY * rate));
      return [nextX, nextY];
    });
  };

  const resetOptimizer = () => {
    setGdStep(0);
    setCurrentCoord([2.5, 2.5]);
  };

  return (
    <div className="space-y-6">
      {/* 1. AGENTBENCH-LITE SANDBOX */}
      {projectId === 'agentbench' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-400" /> Agent Reliability & Bounded Recovery Simulator
            </h4>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-mono">
              Fault Injection Testbed
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Select Agent Strategy</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAgentStrategy('baseline')}
                    className={`py-2 px-3 border text-xs font-mono rounded-lg transition-all ${
                      agentStrategy === 'baseline'
                        ? 'border-red-500 bg-red-500/10 text-red-400 font-bold'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                    }`}
                  >
                    Baseline (No Recovery)
                  </button>
                  <button
                    onClick={() => setAgentStrategy('recovery')}
                    className={`py-2 px-3 border text-xs font-mono rounded-lg transition-all ${
                      agentStrategy === 'recovery'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold'
                        : 'border-zinc-800 bg-zinc-900/40 text-zinc-400'
                    }`}
                  >
                    Bounded Self-Correction
                  </button>
                </div>
              </div>

              <div className="p-3 border border-zinc-900 bg-zinc-950/80 rounded-lg text-xs font-mono space-y-2">
                <div className="flex justify-between text-zinc-500 text-[10px]">
                  <span>MAX STEPS: 10</span>
                  <span>RETRIES BUDGET: 2</span>
                </div>
                <div className="text-zinc-400">
                  Target: <span className="text-white font-bold">Query Customer Profile</span> with intentional parameter type injection.
                </div>
              </div>

              <button
                onClick={runAgentTest}
                disabled={agentRunning}
                className="w-full py-3 border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {agentRunning ? <Pause className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                {agentRunning ? 'Simulating Agent Loop...' : 'Run Benchmark Test'}
              </button>
            </div>

            <div className="border border-zinc-900 bg-black/90 p-4 rounded-xl flex flex-col justify-between font-mono text-[10px] min-h-[220px]">
              <div className="text-zinc-500 uppercase tracking-wider border-b border-zinc-900 pb-2 mb-2 flex justify-between">
                <span>Execution Trace Stream</span>
                <span className="text-amber-400">Step {agentStep}/4</span>
              </div>
              <div className="space-y-1.5 overflow-y-auto max-h-[160px] text-left">
                {agentLogs.map((log, i) => (
                  <div key={i} className={
                    log.includes('[SUCCESS]') || log.includes('[COMPLETED]') ? 'text-emerald-400' :
                    log.includes('[ERROR]') || log.includes('[FAILED]') ? 'text-red-400' :
                    log.includes('[FAULT]') ? 'text-amber-400 font-bold' :
                    log.includes('[BOUNDED') ? 'text-cyan-400' : 'text-zinc-400'
                  }>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. VOICEKISAN SANDBOX */}
      {projectId === 'voicekisan' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" /> Multimodal Indic Voice & Mandi Forecasting
            </h4>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono">
              Telugu / Hindi STT Pipeline
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Select Commodity & District</label>
                <div className="grid grid-cols-2 gap-2">
                  <select 
                    value={selectedCrop} 
                    onChange={(e) => setSelectedCrop(e.target.value)}
                    className="p-2 border border-zinc-800 bg-zinc-900 text-xs text-white rounded font-mono"
                  >
                    <option value="tomato">Tomato (టమాటా)</option>
                    <option value="onion">Onion (ఉల్లిపాయ)</option>
                    <option value="chilli">Chilli (మిరపకాయ)</option>
                    <option value="potato">Potato (బంగాళాదుంప)</option>
                  </select>
                  <select 
                    value={selectedDistrict} 
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="p-2 border border-zinc-800 bg-zinc-900 text-xs text-white rounded font-mono"
                  >
                    <option value="Kurnool">Kurnool APMC</option>
                    <option value="Nashik">Nashik APMC</option>
                    <option value="Kolar">Kolar APMC</option>
                  </select>
                </div>
              </div>

              <button
                onClick={triggerVoiceQuery}
                disabled={isProcessingVoice}
                className="w-full py-3 border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                {isProcessingVoice ? 'Transcribing & Fetching...' : 'Simulate Voice Input (Telugu)'}
              </button>
            </div>

            <div className="border border-zinc-900 bg-zinc-950/80 p-4 rounded-xl font-mono text-xs space-y-3">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-1">
                Gnani STT Transcription
              </div>
              <p className="text-emerald-400 italic font-sans text-sm">"{voiceTranscript}"</p>
              <div className="border-t border-zinc-900 pt-2 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Live Wholesale Modal Price:</span>
                  <span className="text-white font-bold">₹{mandiOutput.price} / Quintal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">SARIMA 7-Day Trend:</span>
                  <span className="text-emerald-400 font-bold">{mandiOutput.trend}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Model Grounding Confidence:</span>
                  <span className="text-zinc-300">{mandiOutput.confidence}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. RECALL-OS SANDBOX */}
      {projectId === 'recallos' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" /> Local-First Hybrid Retrieval (BM25 + Cosine)
            </h4>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase font-mono">
              Zero-Cloud Privacy
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-mono text-zinc-400 block">Interactive Query Simulator</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => runHybridSearch(e.target.value)}
                  placeholder="Enter bug symptom or keyword..."
                  className="flex-1 p-2.5 border border-zinc-800 bg-zinc-900 text-xs text-white rounded font-mono focus:border-cyan-500 outline-none"
                />
              </div>
            </div>

            <div className="border border-zinc-900 rounded-xl overflow-hidden">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-zinc-950 text-zinc-500 text-[10px] border-b border-zinc-900">
                  <tr>
                    <th className="p-3">Memory Node</th>
                    <th className="p-3">BM25</th>
                    <th className="p-3">Dense Vector</th>
                    <th className="p-3">RRF Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900">
                  {searchResults.map((res) => (
                    <tr key={res.id} className="hover:bg-zinc-900/30">
                      <td className="p-3">
                        <div className="text-white font-bold">{res.title}</div>
                        <div className="text-[10px] text-zinc-500">{res.id}</div>
                      </td>
                      <td className="p-3 text-cyan-400">{res.bm25}</td>
                      <td className="p-3 text-violet-400">{res.cosine}</td>
                      <td className="p-3 text-emerald-400 font-bold">{res.rrf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. LOCAL-RAG & MINI-SEMANTIC-SEARCH */}
      {projectId === 'localrag' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Terminal className="w-4 h-4 text-violet-400" /> First-Principles NumPy Vector Cosine Engine
            </h4>
            <span className="text-[10px] text-violet-400 bg-violet-500/10 border border-violet-500/20 px-2 py-0.5 rounded uppercase font-mono">
              Dot Product / L2 Norm
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Vector A (Query) Dimension Modulation</label>
                <div className="flex gap-2">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="flex-1 space-y-1">
                      <div className="text-[10px] text-zinc-500 font-mono">Dim {idx + 1}</div>
                      <input
                        type="range" min="0" max="1" step="0.1" value={vA[idx]}
                        onChange={(e) => {
                          const next: [number, number, number] = [...vA];
                          next[idx] = parseFloat(e.target.value);
                          setVA(next);
                        }}
                        className="w-full accent-violet-500"
                      />
                      <div className="text-xs font-mono text-white text-center">{vA[idx]}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Vector B (Document) Dimension Modulation</label>
                <div className="flex gap-2">
                  {[0, 1, 2].map((idx) => (
                    <div key={idx} className="flex-1 space-y-1">
                      <div className="text-[10px] text-zinc-500 font-mono">Dim {idx + 1}</div>
                      <input
                        type="range" min="0" max="1" step="0.1" value={vB[idx]}
                        onChange={(e) => {
                          const next: [number, number, number] = [...vB];
                          next[idx] = parseFloat(e.target.value);
                          setVB(next);
                        }}
                        className="w-full accent-violet-500"
                      />
                      <div className="text-xs font-mono text-white text-center">{vB[idx]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-zinc-900 bg-zinc-950 p-4 rounded-xl flex flex-col justify-center items-center text-center font-mono">
              <div className="text-xs text-zinc-500 uppercase tracking-widest mb-2">Computed Cosine Similarity</div>
              <div className="text-4xl font-black text-violet-400 mb-2">
                {cosineScore.toFixed(4)}
              </div>
              <div className="text-xs text-zinc-400 max-w-xs">
                {cosineScore > 0.85 ? 'High semantic grounding match (Eligible for RAG prompt injection)' :
                 cosineScore > 0.60 ? 'Moderate semantic correlation' : 'Low semantic correlation (Filtered out by threshold)'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. AEGIS-AI SANDBOX */}
      {projectId === 'aegis' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" /> Clean Architecture Dependency Inspector
            </h4>
            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase font-mono">
              Strict Layer Inversion
            </span>
          </div>

          <div className="grid md:grid-cols-4 gap-2 font-mono text-xs">
            {[
              { id: 'entity', label: '1. Domain Entities', desc: 'Core business types & enterprise invariants' },
              { id: 'usecase', label: '2. Use-Case Interactors', desc: 'Application orchestrations & model interfaces' },
              { id: 'adapter', label: '3. Interface Adapters', desc: 'Controllers, presenters, & gateway mocks' },
              { id: 'framework', label: '4. Frameworks & Drivers', desc: 'React 19, FastAPI, Google GenAI SDK' }
            ].map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id as any)}
                className={`p-3 border rounded-lg text-left transition-all ${
                  activeLayer === layer.id 
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-300' 
                    : 'border-zinc-900 bg-zinc-950/60 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="font-bold text-white mb-1">{layer.label}</div>
                <div className="text-[10px] leading-tight">{layer.desc}</div>
              </button>
            ))}
          </div>

          <div className="border border-zinc-900 bg-zinc-950/80 p-4 rounded-xl font-mono text-xs text-zinc-400 space-y-2">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">
              Dependency Rule Check: Inner layers know NOTHING about outer layers.
            </div>
            <p>
              When Google GenAI or OpenAI updates their SDK signature, only <span className="text-cyan-400 font-bold">Layer 4 (ModelGateway Adapter)</span> is touched. The entire test suite and domain rules remain completely untouched and green.
            </p>
          </div>
        </div>
      )}

      {/* 6. AGRICAST-AI SANDBOX */}
      {projectId === 'agricast' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" /> APMC Time-Series Forecasting Horizon
            </h4>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono">
              SARIMA Seasonality
            </span>
          </div>

          <div className="flex gap-2">
            {[7, 14, 30].map((h) => (
              <button
                key={h}
                onClick={() => setForecastHorizon(h as any)}
                className={`py-2 px-4 border rounded font-mono text-xs ${
                  forecastHorizon === h ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold' : 'border-zinc-800 text-zinc-500'
                }`}
              >
                {h}-Day Forecast
              </button>
            ))}
          </div>

          <div className="border border-zinc-900 bg-black/90 p-6 rounded-xl flex flex-col items-center justify-center font-mono">
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3">Model Residual Error (MAPE)</div>
            <div className="text-3xl font-black text-emerald-400 mb-1">7.8% MAPE</div>
            <div className="text-xs text-zinc-400">95% Confidence Band: ₹1,680 - ₹1,990 / Quintal</div>
          </div>
        </div>
      )}

      {/* 7. GITOPS-WARROOM SANDBOX */}
      {projectId === 'gitops' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" /> Forward Deployed Engineer Incident Triage
            </h4>
            <span className="text-[10px] text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded uppercase font-mono">
              Production Git Disaster
            </span>
          </div>

          <div className="border border-zinc-900 bg-zinc-950 p-4 rounded-xl space-y-3 font-mono text-xs">
            <div className="text-rose-400 font-bold uppercase tracking-wider">
              [CRITICAL OUTAGE] Production Hotfix Overwritten by Accidental Reset
            </div>
            <p className="text-zinc-400">
              Customer deployment pipeline failed at 02:00 UTC. HEAD was forcefully reset to 3 commits prior.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setResolvedIncident(true)}
                className="py-2.5 px-4 bg-rose-500/10 border border-rose-500/30 hover:border-rose-500 text-rose-400 font-bold rounded cursor-pointer"
              >
                Execute: git reflog && git reset --hard HEAD@&#123;1&#125;
              </button>
              {resolvedIncident && (
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs animate-fade-in">
                  <CheckCircle2 className="w-4 h-4" /> Commit recovered! Production pipeline green.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 8. GRADIENT-DESCENT-PLAYGROUND SANDBOX */}
      {projectId === 'gradient' && (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
            <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400" /> Loss Surface Convergence Simulator
            </h4>
            <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-mono">
              SGD / Momentum / Adam
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 block">Optimizer Algorithm</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sgd', 'momentum', 'adam'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setOptimizerType(opt); resetOptimizer(); }}
                      className={`py-2 border text-xs font-mono rounded uppercase ${
                        optimizerType === opt ? 'border-amber-500 bg-amber-500/10 text-amber-400 font-bold' : 'border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-500">Learning Rate (alpha)</span>
                  <span className="text-amber-400 font-bold">{learningRate}</span>
                </div>
                <input
                  type="range" min="0.01" max="0.3" step="0.01" value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={stepOptimizer}
                  className="flex-1 py-2.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 font-mono font-bold text-xs uppercase rounded flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4" /> Step Iteration
                </button>
                <button
                  onClick={resetOptimizer}
                  className="p-2.5 border border-zinc-800 text-zinc-400 hover:text-white rounded cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="border border-zinc-900 bg-black/90 p-4 rounded-xl font-mono text-xs flex flex-col justify-center items-center text-center">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Iteration Step {gdStep}</div>
              <div className="text-3xl font-black text-amber-400 mb-1">Loss: {currentLoss}</div>
              <div className="text-zinc-500 text-[10px]">Coordinates: ({currentCoord[0].toFixed(3)}, {currentCoord[1].toFixed(3)})</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
