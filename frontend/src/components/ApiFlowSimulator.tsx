// frontend/src/components/ApiFlowSimulator.tsx
import { useState, useEffect } from 'react';
import { Terminal, Play, Loader, CheckCircle } from 'lucide-react';
import type { ApiStep } from '../utils/projectData';

interface ApiSimulatorProps {
  steps: ApiStep[];
  themeColor: string; // 'amber' | 'emerald' | 'cyan' | 'violet' | 'rose'
}

const methodColors: Record<string, string> = {
  GET: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  POST: 'bg-green-500/10 text-green-400 border-green-500/30',
  PUT: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  DELETE: 'bg-red-500/10 text-red-400 border-red-500/30',
  WS: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
};

const themeGlows: Record<string, string> = {
  amber: 'text-amber-400 border-amber-500/30',
  emerald: 'text-emerald-400 border-emerald-500/30',
  cyan: 'text-cyan-400 border-cyan-500/30',
  violet: 'text-violet-400 border-violet-500/30',
  rose: 'text-rose-400 border-rose-500/30',
};

export default function ApiFlowSimulator({ steps, themeColor }: ApiSimulatorProps) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState<'idle' | 'running' | 'completed'>('idle');

  const activeStep = steps[activeStepIdx];
  const glowClass = themeGlows[themeColor] || themeGlows.cyan;

  // Initialize terminal on step selection
  useEffect(() => {
    setTerminalLogs([
      `NEURAL_OS_CONSOLE // READY`,
      `========================`,
      `ENDPOINT: [${activeStep.method}] ${activeStep.endpoint}`,
      `STATUS: awaiting_trigger`,
      `Click "Run Session Simulation" below to execute packet pipeline.`
    ]);
    setSimulationProgress('idle');
    setIsSimulating(false);
  }, [activeStepIdx, activeStep]);

  const runSimulation = async () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    setSimulationProgress('running');
    setTerminalLogs([]);

    const addLogWithDelay = (message: string, delay: number) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setTerminalLogs((prev) => [...prev, message]);
          resolve();
        }, delay);
      });
    };

    try {
      await addLogWithDelay(`[SYSTEM] Initializing telemetry stream...`, 100);
      await addLogWithDelay(`[NET] Resolving remote gateway server...`, 300);
      await addLogWithDelay(`[SEC] Building TLS Handshake session (AES_256_GCM)...`, 400);
      await addLogWithDelay(`[NET] Connection established. Allocating thread buffers.`, 300);
      
      if (activeStep.payload) {
        await addLogWithDelay(`[REQ] Serializing request data structure...`, 300);
        await addLogWithDelay(`[REQ] PAYLOAD:\n${JSON.stringify(JSON.parse(activeStep.payload), null, 2)}`, 600);
      }
      
      await addLogWithDelay(`[NET] Transmitting payload stream to endpoint...`, 400);
      await addLogWithDelay(`[HTTP] ${activeStep.method} ${activeStep.endpoint} -> Processing...`, 500);
      
      await addLogWithDelay(`[RES] Gateway code: 200 OK`, 400);
      
      if (activeStep.response.startsWith('{') || activeStep.response.startsWith('[')) {
        await addLogWithDelay(`[RES] DATA:\n${JSON.stringify(JSON.parse(activeStep.response), null, 2)}`, 700);
      } else {
        await addLogWithDelay(`[RES] SIGNAL: ${activeStep.response}`, 500);
      }
      
      await addLogWithDelay(`[SYSTEM] Syncing local client states.`, 300);
      await addLogWithDelay(`[COMPLETED] Pipeline execution successful. 0 packets dropped.`, 200);
      setSimulationProgress('completed');
    } catch (e) {
      setTerminalLogs((prev) => [...prev, `[CRITICAL_ERROR] Execution pipeline broken.`]);
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6 font-mono text-xs w-full text-zinc-400">
      
      {/* Route List Selection Bar */}
      <div className="lg:col-span-2 flex flex-col gap-2.5">
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest border-b border-zinc-900 pb-2 mb-1 flex items-center gap-1.5">
          <Terminal className="w-3.5 h-3.5" />
          <span>API Sequence Map</span>
        </div>
        
        <div className="flex flex-col gap-2">
          {steps.map((step, idx) => {
            const isActive = idx === activeStepIdx;
            return (
              <button
                key={step.step}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all duration-300 ${
                  isActive 
                    ? `bg-zinc-950 border-${themeColor}-500/40 text-white shadow-md`
                    : 'bg-zinc-950/40 border-zinc-900 hover:border-zinc-800 text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border ${
                    isActive ? `bg-white text-black border-white` : 'bg-zinc-900 border-zinc-800'
                  }`}>
                    Step 0{step.step}
                  </span>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border uppercase shrink-0 ${methodColors[step.method]}`}>
                    {step.method}
                  </span>
                </div>
                <h4 className="font-bold text-[11px] truncate mb-1 text-zinc-300">{step.title}</h4>
                <code className="text-[9px] block text-zinc-500 truncate">{step.endpoint}</code>
              </button>
            );
          })}
        </div>
      </div>

      {/* Terminal View Panel */}
      <div className="lg:col-span-3 flex flex-col gap-3 min-h-[380px]">
        {/* Terminal Header */}
        <div className="flex justify-between items-center bg-zinc-950 border border-zinc-900 rounded-t-lg px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            <span className="text-[10px] text-zinc-500 ml-2">secure_session_shell.sh</span>
          </div>
          <div className="text-[8px] bg-zinc-900 border border-zinc-800 text-zinc-500 rounded px-2 py-0.5 uppercase">
            Bps: 115200
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 bg-black/95 border-x border-b border-zinc-900 rounded-b-lg p-5 overflow-y-auto max-h-[320px] custom-scrollbar flex flex-col gap-1.5 font-mono text-[10px] text-zinc-400 min-h-[260px] scanlines-overlay">
          {terminalLogs.map((log, idx) => {
            const isJson = log.startsWith('{') || log.startsWith('[') || log.includes('  "');
            const isError = log.includes('[CRITICAL_ERROR]');
            const isSystem = log.startsWith('[SYSTEM]') || log.startsWith('[NET]') || log.startsWith('[SEC]');
            const isResponse = log.startsWith('[RES]') || log.startsWith('[HTTP]');
            const isCompleted = log.startsWith('[COMPLETED]');

            let logColorClass = 'text-zinc-400';
            if (isError) logColorClass = 'text-red-400 font-bold';
            else if (isSystem) logColorClass = 'text-zinc-500';
            else if (isResponse) logColorClass = `text-${themeColor}-400 font-bold`;
            else if (isCompleted) logColorClass = 'text-green-400 font-bold text-glow-green';
            else if (isJson) logColorClass = 'text-cyan-400';

            return (
              <pre key={idx} className={`whitespace-pre-wrap font-mono ${logColorClass}`}>
                {log}
              </pre>
            );
          })}
          {isSimulating && (
            <div className="flex items-center gap-1.5 text-zinc-500 animate-pulse mt-1">
              <Loader className="w-3 h-3 animate-spin" />
              <span>executing connection protocols...</span>
            </div>
          )}
        </div>

        {/* Action Panel Footer */}
        <div className="flex items-center justify-between gap-4 p-4 border border-zinc-900 bg-zinc-950/40 rounded-xl">
          <div className="max-w-[60%] space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Telemetry Action</span>
            <p className="text-[10px] text-zinc-400 truncate leading-relaxed font-sans">{activeStep.description}</p>
          </div>

          <button
            onClick={runSimulation}
            disabled={isSimulating}
            className={`px-4 py-2 border rounded font-semibold tracking-wider text-[10px] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer active:scale-95 ${
              isSimulating
                ? 'border-zinc-800 text-zinc-600 bg-zinc-900/10'
                : simulationProgress === 'completed'
                ? 'border-green-500/40 hover:border-green-400 text-green-400 bg-green-500/5 hover:bg-green-500/10'
                : `border-${themeColor}-500/40 hover:border-${themeColor}-400 ${glowClass} bg-${themeColor}-500/5 hover:bg-${themeColor}-500/10`
            }`}
          >
            {isSimulating ? (
              <>
                <Loader className="w-3 h-3 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : simulationProgress === 'completed' ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Sequence Done</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
