// frontend/src/components/CertificationsShowcase.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Terminal, RefreshCw, ExternalLink, Zap, CheckCircle2 } from 'lucide-react';
import { certificationsList } from '../utils/profileData';
import { transitions, variants } from '../utils/motion';

const themeStyles: Record<string, {
  border: string;
  glow: string;
  badge: string;
  text: string;
  bgGlow: string;
  accent: string;
}> = {
  amber: {
    border: 'hover:border-amber-500/40 border-amber-950/20 bg-amber-950/5',
    glow: 'glow-amber',
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    text: 'text-amber-400',
    bgGlow: 'rgba(245, 158, 11, 0.05)',
    accent: '#f59e0b',
  },
  emerald: {
    border: 'hover:border-emerald-500/40 border-emerald-950/20 bg-emerald-950/5',
    glow: 'glow-emerald',
    badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    text: 'text-emerald-400',
    bgGlow: 'rgba(16, 185, 129, 0.05)',
    accent: '#10b981',
  },
  cyan: {
    border: 'hover:border-cyan-500/40 border-cyan-950/20 bg-cyan-950/5',
    glow: 'glow-cyan',
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    text: 'text-cyan-400',
    bgGlow: 'rgba(6, 182, 212, 0.05)',
    accent: '#06b6d4',
  },
  violet: {
    border: 'hover:border-violet-500/40 border-violet-950/20 bg-violet-950/5',
    glow: 'glow-violet',
    badge: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    text: 'text-violet-400',
    bgGlow: 'rgba(139, 92, 246, 0.05)',
    accent: '#8b5cf6',
  },
  rose: {
    border: 'hover:border-rose-500/40 border-rose-950/20 bg-rose-950/5',
    glow: 'glow-rose',
    badge: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    text: 'text-rose-400',
    bgGlow: 'rgba(244, 63, 94, 0.05)',
    accent: '#f43f5e',
  },
};

export default function CertificationsShowcase() {
  // Store verification states for each certification
  // states: 'idle' | 'verifying' | 'verified'
  const [verificationStates, setVerificationStates] = useState<Record<string, 'idle' | 'verifying' | 'verified'>>({});
  const [activeTerminalLogs, setActiveTerminalLogs] = useState<Record<string, string[]>>({});

  const handleVerify = (certId: string, issuer: string, credId: string) => {
    if (verificationStates[certId] === 'verified' || verificationStates[certId] === 'verifying') return;

    setVerificationStates(prev => ({ ...prev, [certId]: 'verifying' }));
    setActiveTerminalLogs(prev => ({ ...prev, [certId]: [] }));

    const logs = [
      `[SYS_INIT] Loading cryptographic authentication pipelines...`,
      `[HANDSHAKE] Querying active directory of ${issuer.toUpperCase()}...`,
      `[QUERY] Searching credential ledger for GUID: ${credId}`,
      `[DECRYPT] Decrypting verified signature checksum...`,
      `[SUCCESS] Credential matches Siva Panyam signature record.`,
      `[STATUS] AUTHENTICATION CONFIRMED: ACTIVE // SECURE`
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setActiveTerminalLogs(prev => ({
          ...prev,
          [certId]: [...(prev[certId] || []), log]
        }));

        if (index === logs.length - 1) {
          setVerificationStates(prev => ({ ...prev, [certId]: 'verified' }));
        }
      }, (index + 1) * 600);
    });
  };

  return (
    <motion.div
      variants={variants.staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      className="grid md:grid-cols-2 gap-6"
    >
      {certificationsList.map((cert) => {
        const style = themeStyles[cert.themeColor] || themeStyles.cyan;
        const state = verificationStates[cert.id] || 'idle';
        const logs = activeTerminalLogs[cert.id] || [];

        return (
          <motion.div
            key={cert.id}
            variants={variants.slideUpFade}
            whileHover={{ y: -4 }}
            transition={transitions.springHover}
            className={`p-6 border rounded-2xl relative group/card flex flex-col justify-between overflow-hidden transition-all duration-500 ${style.border} ${style.glow}`}
          >
            {/* Ambient Background Glow Spot */}
            <div 
              className="absolute -top-12 -right-12 w-32 h-32 blur-3xl opacity-20 pointer-events-none rounded-full"
              style={{ backgroundColor: cert.glowColor }}
            />

            {/* Microchip blueprint grid overlay */}
            <div className="absolute inset-0 scanlines-overlay opacity-5 pointer-events-none" />

            {/* High-Tech corner lines */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-tl" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-tr" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-bl" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-zinc-900 group-hover/card:border-zinc-700 transition-colors pointer-events-none rounded-br" />

            <div>
              {/* Header Segment */}
              <div className="flex justify-between items-start mb-4 border-b border-zinc-900/60 pb-3">
                <div className="text-left font-mono">
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest block mb-1">
                    {cert.issuer} CREDENTIAL // {cert.date}
                  </span>
                  <h3 className="font-bold text-white text-sm md:text-base tracking-tight uppercase group-hover/card:text-zinc-200 transition-colors leading-snug">
                    {cert.name}
                  </h3>
                </div>
                
                {/* Simulated Verification status badges */}
                <div className="shrink-0">
                  {state === 'verified' ? (
                    <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 block shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 className="w-5 h-5" />
                    </span>
                  ) : state === 'verifying' ? (
                    <span className="p-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 block animate-spin">
                      <RefreshCw className="w-5 h-5" />
                    </span>
                  ) : (
                    <span className="p-1 rounded-full bg-zinc-900/80 text-zinc-600 border border-zinc-950 block">
                      <ShieldCheck className="w-5 h-5" />
                    </span>
                  )}
                </div>
              </div>

              {/* Skills Exposure Tags list */}
              <div className="flex flex-wrap gap-1.5 mb-5 font-mono text-[9px]">
                {cert.skillsExposure.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-zinc-950/80 border border-zinc-900 text-zinc-500 uppercase tracking-tighter"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Simulated High-Tech Log Terminal Frame */}
              <AnimatePresence>
                {state !== 'idle' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-black/90 border border-zinc-900 rounded-xl overflow-hidden mb-5 flex flex-col justify-start"
                  >
                    <div className="bg-zinc-950 px-3 py-1.5 border-b border-zinc-900 flex justify-between items-center font-mono text-[8px] text-zinc-500 select-none">
                      <div className="flex items-center gap-1.5">
                        <Terminal className="w-3 h-3 text-zinc-500" />
                        <span>cred_verifier_hub.sh</span>
                      </div>
                      <span className="text-[7px] uppercase font-bold tracking-widest text-zinc-600">Secure pipeline</span>
                    </div>
                    <div className="p-3.5 font-mono text-[8px] sm:text-[9px] text-left leading-relaxed text-zinc-500 space-y-1 max-h-[140px] overflow-y-auto custom-scrollbar">
                      {logs.map((log, lIdx) => {
                        const isSuccess = log.includes('[SUCCESS]');
                        const isStatus = log.includes('[STATUS]');
                        return (
                          <div 
                            key={lIdx} 
                            className={`${
                              isSuccess ? 'text-emerald-400 font-bold' : 
                              isStatus ? `${style.text} font-bold` : 'text-zinc-500'
                            }`}
                          >
                            {log}
                          </div>
                        );
                      })}
                      {state === 'verifying' && (
                        <div className="text-cyan-400 flex items-center gap-1 font-bold animate-pulse">
                          <span>█ Connecting...</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Interactive Actions */}
            <div className="flex justify-between items-center border-t border-zinc-900/60 pt-4 mt-auto">
              <span className="text-[8px] font-mono text-zinc-600 block">
                CRED_ID: <span className="font-bold text-zinc-500">{cert.credentialId}</span>
              </span>

              <div className="flex gap-2">
                {state === 'idle' && (
                  <button
                    onClick={() => handleVerify(cert.id, cert.issuer, cert.credentialId)}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-950 text-[9px] font-mono font-bold text-zinc-400 hover:text-white border border-zinc-800 hover:border-zinc-500 rounded-md cursor-pointer transition-all flex items-center gap-1"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Verify Credential</span>
                  </button>
                )}

                {state === 'verified' && (
                  <a
                    href={cert.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-white text-black text-[9px] font-mono font-bold rounded-md hover:scale-[1.03] transition-all flex items-center gap-1 shadow-[0_0_12px_rgba(255,255,255,0.1)]"
                  >
                    <span>Inspect Authority</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

          </motion.div>
        );
      })}
    </motion.div>
  );
}
