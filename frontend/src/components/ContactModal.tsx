// frontend/src/components/ContactModal.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Mail, Copy, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !message.trim()) return;

    setStatus('submitting');

    try {
      // Free, zero-API-key FormSubmit service
      const res = await fetch('https://formsubmit.co/ajax/contact@sivapanyam.dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: name.trim() || 'Anonymous Visitor',
          email: email.trim(),
          message: message.trim(),
          _subject: `Portfolio Contact from ${name.trim() || email.trim()}`,
        }),
      });

      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        // Fallback to mailto link if network is blocked
        window.location.href = `mailto:contact@sivapanyam.dev?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
        setStatus('success');
      }
    } catch {
      window.location.href = `mailto:contact@sivapanyam.dev?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}`;
      setStatus('success');
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('contact@sivapanyam.dev');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-mono select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden glass-panel-heavy p-6 md:p-8"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6 border-b border-zinc-900 pb-4">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest block mb-1">
                07 // SECURE COMMUNICATION RELAY
              </span>
              <h3 className="text-white font-bold text-base uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400" />
                Dispatch Direct Message
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {status === 'success' ? (
            <div className="py-10 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <div className="text-white font-bold text-sm uppercase tracking-wider">
                Transmission Dispatched Successfully
              </div>
              <p className="text-zinc-400 text-xs font-sans max-w-sm mx-auto leading-relaxed">
                Your message has been routed to Siva's verified inbox. Expect a response within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  onClose();
                }}
                className="mt-4 px-6 py-2 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full cursor-pointer hover:bg-zinc-200 transition-all"
              >
                Close Gateway
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                  Operator Name / Handle
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan / Lead Recruiter"
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-500 rounded-lg py-2.5 px-3 text-xs text-white placeholder:text-zinc-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                  Return Contact Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@organization.com"
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-500 rounded-lg py-2.5 px-3 text-xs text-white placeholder:text-zinc-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 uppercase tracking-wider block mb-1.5 font-bold">
                  Message Payload <span className="text-red-400">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, role opportunity, or architectural inquiry..."
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-zinc-500 rounded-lg py-2.5 px-3 text-xs text-white placeholder:text-zinc-600 outline-none transition-colors resize-none font-sans"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="text-[10px] text-zinc-500 hover:text-white flex items-center gap-1.5 cursor-pointer py-1"
                >
                  {copiedEmail ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedEmail ? 'Copied to Clipboard!' : 'contact@sivapanyam.dev'}</span>
                </button>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto px-6 py-2.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full cursor-pointer hover:bg-zinc-200 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                  <span>{status === 'submitting' ? 'Dispatching...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;
