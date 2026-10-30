// frontend/src/utils/commandRegistry.ts
import React from 'react';
import { portfolioProjects } from './projectData';
import { skillCategories, experienceTimeline } from './profileData';
import { resolvePath, type VFSNode } from './virtualFileSystem';

export interface CommandContext {
  currentPath: string[];
  setCurrentPath: (path: string[]) => void;
  openProjectModal?: (projectId: string) => void;
  toggleDevMode?: () => void;
  toggleMatrix?: () => void;
}

export interface Command {
  name: string;
  description: string;
  usage?: string;
  hidden?: boolean;
  execute: (args: string[], ctx?: CommandContext) => Promise<string | React.ReactNode>;
}

export const commandRegistry: Record<string, Command> = {
  help: {
    name: 'help',
    description: 'Displays a directory of all permitted console prompt operations.',
    usage: 'help [command_name]',
    execute: async (args) => {
      if (args.length > 0) {
        const cmdName = args[0].toLowerCase();
        const cmd = commandRegistry[cmdName];
        if (cmd && !cmd.hidden) {
          return `
Command: ${cmd.name}
Description: ${cmd.description}
Usage: ${cmd.usage || cmd.name}
`;
        }
        return `[ERROR] Command "${args[0]}" not found in secure prompt index.`;
      }

      const list = Object.values(commandRegistry)
        .filter(c => !c.hidden)
        .map(c => `  ${c.name.padEnd(16)} - ${c.description}`)
        .join('\n');

      return `
NEURAL_OS v1.2.0 - VIRTUAL UNIX SHELL (bash/zsh compatible)
===================================================
${list}

[FILESYSTEM DIRECTORY]
  ls, cd, pwd, cat, tree   - Navigate virtual portfolio filesystem
[SYSTEM TOOLS]
  neofetch, ping, clear    - Telemetry and system diagnostics
[EASTER EGGS]
  sudo hire siva, rm -rf / - Root access overrides

[TIP] Try: "neofetch" or "ls -la" or "cat bio.md"
`;
    }
  },

  // 1. FILESYSTEM: PWD
  pwd: {
    name: 'pwd',
    description: 'Prints current working directory path.',
    execute: async (_args, ctx) => {
      const path = ctx?.currentPath || ['~'];
      return path.join('/');
    }
  },

  // 2. FILESYSTEM: LS / DIR
  ls: {
    name: 'ls',
    description: 'Lists files and directories in current or target path.',
    usage: 'ls [-l | -la] [path]',
    execute: async (args, ctx) => {
      const currentPath = ctx?.currentPath || ['~'];
      const isDetailed = args.includes('-l') || args.includes('-la') || args.includes('-al');
      const targetArg = args.find(a => !a.startsWith('-')) || '.';

      const target = resolvePath(currentPath, targetArg);
      if (!target.node) {
        return `ls: cannot access '${targetArg}': No such file or directory`;
      }

      if (target.node.type === 'file') {
        return isDetailed
          ? `${target.node.permissions || '-rw-r--r--'}  1  siva  staff  ${target.node.size || '1KB'}  Oct 30 14:00  ${target.node.name}`
          : target.node.name;
      }

      const children = target.node.children || {};
      const entries = Object.values(children);

      if (entries.length === 0) {
        return `(empty directory)`;
      }

      if (isDetailed) {
        const lines = entries.map(e => {
          const perm = e.permissions || (e.type === 'dir' ? 'drwxr-xr-x' : '-rw-r--r--');
          const size = (e.size || (e.type === 'dir' ? '4.0KB' : '1.0KB')).padStart(7);
          const icon = e.type === 'dir' ? '📁' : '📄';
          return `${perm}  1 siva staff ${size} Oct 30 14:00 ${icon} ${e.name}${e.type === 'dir' ? '/' : ''}`;
        });
        return `total ${entries.length * 4}\n` + lines.join('\n');
      }

      const formatted = entries.map(e => {
        return e.type === 'dir' ? `${e.name}/` : e.name;
      }).join('    ');

      return formatted;
    }
  },

  // 3. FILESYSTEM: CD
  cd: {
    name: 'cd',
    description: 'Change directory in the virtual filesystem.',
    usage: 'cd [directory | .. | ~]',
    execute: async (args, ctx) => {
      if (!ctx) return 'VFS context unavailable.';
      const targetDir = args[0] || '~';
      const target = resolvePath(ctx.currentPath, targetDir);

      if (!target.node) {
        return `cd: ${targetDir}: No such file or directory`;
      }
      if (target.node.type !== 'dir') {
        return `cd: not a directory: ${targetDir}`;
      }

      ctx.setCurrentPath(target.path);
      return '';
    }
  },

  // 4. FILESYSTEM: CAT
  cat: {
    name: 'cat',
    description: 'Concatenate and display content of files.',
    usage: 'cat <filename>',
    execute: async (args, ctx) => {
      if (args.length === 0) {
        return 'usage: cat <filename>';
      }
      const currentPath = ctx?.currentPath || ['~'];
      const target = resolvePath(currentPath, args[0]);

      if (!target.node) {
        return `cat: ${args[0]}: No such file or directory`;
      }
      if (target.node.type === 'dir') {
        return `cat: ${args[0]}: Is a directory`;
      }

      return target.node.content || `(file is empty)`;
    }
  },

  // 5. FILESYSTEM: TREE
  tree: {
    name: 'tree',
    description: 'Generates a recursive directory tree visualization.',
    execute: async (_args, ctx) => {
      const currentPath = ctx?.currentPath || ['~'];
      const root = resolvePath(currentPath, '.').node;
      if (!root || root.type !== 'dir') return '.';

      const lines: string[] = [root.name];
      function traverse(node: VFSNode, prefix: string) {
        const children = Object.values(node.children || {});
        children.forEach((child, idx) => {
          const isLast = idx === children.length - 1;
          const branch = isLast ? '└── ' : '├── ';
          lines.push(`${prefix}${branch}${child.name}${child.type === 'dir' ? '/' : ''}`);
          if (child.type === 'dir') {
            traverse(child, prefix + (isLast ? '    ' : '│   '));
          }
        });
      }
      traverse(root, '');
      return lines.join('\n');
    }
  },

  // 6. NEOFETCH
  neofetch: {
    name: 'neofetch',
    description: 'Displays system information with stylized ASCII monogram.',
    execute: async () => {
      return `
  ███████╗██╗██╗   ██╗ █████╗     siva@neural-os
  ██╔════╝██║██║   ██║██╔══██╗    ---------------
  ███████╗██║██║   ██║███████║    OS: NeuralOS 1.2 x86_64 (Edge Bengaluru)
  ╚════██║██║╚██╗ ██╔╝██╔══██║    Host: Siva Panyam Portfolio Node
  ███████║██║ ╚████╔╝ ██║  ██║    Kernel: 6.8.0-neural-rt-edge
  ╚══════╝╚═╝  ╚═══╝  ╚═╝  ╚═╝    Uptime: 99.98% SLA (Active)
                                  Shell: neural-sh (vfs v1.2)
  ██████╗  █████╗ ███╗   ██╗      Resolution: 1920x1080 @ 60fps WebGL
  ██╔══██╗██╔══██╗████╗  ██║      DE: Cyberpunk Glass HUD
  ██████╔╝███████║██╔██╗ ██║      Theme: Dark Terminal Neon (#39ff14)
  ██╔═══╝ ██╔══██║██║╚██╗██║      CPU: WebAssembly Raft Virtual Core @ 3.4GHz
  ██║     ██║  ██║██║ ╚████║      Memory: 412MB / 1024MB (Low footprint)
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝      Stack: React 19, TypeScript 6, Three.js, Vite
                                  AI Core: Heuristic Intent Router (0-API latency)
`;
    }
  },

  // 7. PING
  ping: {
    name: 'ping',
    description: 'Simulates network latency round-trip to edge endpoints.',
    usage: 'ping [host]',
    execute: async (args) => {
      const host = args[0] || 'bengaluru.edge.sivapanyam.dev';
      return `
PING ${host} (127.0.0.1): 56 data bytes
64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=18.421 ms
64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=19.104 ms
64 bytes from 127.0.0.1: icmp_seq=2 ttl=64 time=17.892 ms

--- ${host} ping statistics ---
3 packets transmitted, 3 packets received, 0.0% packet loss
round-trip min/avg/max = 17.892/18.472/19.104 ms
Status: Edge pipeline nominal [Latency < 20ms].
`;
    }
  },

  // 8. ABOUT
  about: {
    name: 'about',
    description: 'Queries background credentials and diagnostic profile of Siva Panyam.',
    execute: async () => {
      return `
PROFILE TELEMETRY: SIVA PANYAM
===================================================
ROLE: AI Engineer & Full Stack Architect
LOCATION: Bangalore, India // Edge Node
FOCUS: generative_ai // system_concurrency // robust_frontends

"I bridge the gap between heavy deep learning backends and highly interactive, performant web applications. My work focuses on offloading expensive telemetry processes to distributed nodes, standardizing robust vector-RAG infrastructures, and crafting sleek developer-focused user workspaces."

Core philosophy: "Build simple code structures to solve extremely complex data-flow problems."
`;
    }
  },

  // 9. RESUME
  resume: {
    name: 'resume',
    description: 'Fetches the structured CV profile including education and milestones.',
    execute: async () => {
      return `
CURRICULUM VITAE // SIVA PANYAM // AI Engineer & Full Stack Architect
===================================================
Based in Bangalore, India | contact@sivapanyam.dev

EDUCATION:
* Bachelor of Technology (B.Tech) in Computer Science (2020 - 2024)
  - Cumulative Grade / CGPA: 9.24 / 10.0
  - Coursework: Distributed Systems, Machine Learning, Database WAL Tuning

Download official verified resume payload:
  URL: https://sivapanyam.dev/assets/cv_payload.pdf
`;
    }
  },

  // 10. PROJECTS
  projects: {
    name: 'projects',
    description: 'Lists all chronicled featured architectures and active lab sandboxes.',
    execute: async () => {
      const featured = portfolioProjects
        .filter(p => p.category === 'featured')
        .map(p => `  * ${p.title.padEnd(16)} [${p.status.toUpperCase()}] - ${p.tagline}`)
        .join('\n');

      const lab = portfolioProjects
        .filter(p => p.category === 'lab')
        .map(p => `  * ${p.title.padEnd(16)} [${p.status.toUpperCase()}] - ${p.tagline}`)
        .join('\n');

      return `
CHRONICLED PRODUCTS & SYSTEMS
===================================================
FEATURED ARCHITECTURES:
${featured}

EXPERIMENTAL LAB:
${lab}

[TIP] Type "cat projects/neuralos.md" or "inspect tuneaura" to query deep telemetry!
`;
    }
  },

  // 11. INSPECT
  inspect: {
    name: 'inspect',
    description: 'Queries deep architectural and telemetry specs of any chronicled build.',
    usage: 'inspect <project_id>',
    execute: async (args) => {
      if (args.length === 0) {
        return `usage: inspect <project_id> (e.g. "inspect tuneaura" or "inspect fanversi")`;
      }
      const id = args[0].toLowerCase();
      const project = portfolioProjects.find(p => p.id.toLowerCase() === id || p.title.toLowerCase().includes(id));
      if (!project) {
        return `[ERROR] Project '${args[0]}' not identified in portfolio database. Run "projects" to view valid identifiers.`;
      }

      const stackNames = project.techStack.map(t => t.name).join(', ');
      const optimizationLines = project.optimizations.map(o => `  • ${o.metric}: ${o.value} (${o.description})`).join('\n');

      return `
PROJECT TELEMETRY: ${project.title.toUpperCase()}
===================================================
Tagline: ${project.tagline}
Category: ${project.category.toUpperCase()} | Status: ${project.status.toUpperCase()}
Stack: ${stackNames}

PROBLEM STATEMENT:
${project.problemStatement}

SOLUTION ARCHITECTURE:
${project.solutionArchitecture}

OPTIMIZATIONS & BENCHMARKS:
${optimizationLines}
`;
    }
  },

  // 12. SKILLS
  skills: {
    name: 'skills',
    description: 'Prints technical skills hierarchy and proficiency ratings.',
    execute: async () => {
      const sections = skillCategories.map(cat => {
        const skillsList = cat.skills.map(s => {
          const filled = Math.round(s.depth / 10);
          const bar = '■'.repeat(filled) + ' '.repeat(10 - filled);
          return `  * ${s.name.padEnd(30)} [${bar}] ${s.depth}%`;
        }).join('\n');

        return `\n${cat.title.toUpperCase()}\n---------------------------------------------------\n${skillsList}`;
      }).join('\n');

      return `TECHNICAL CAPABILITY INVENTORY\n===================================================${sections}\n`;
    }
  },

  // 13. EXPERIENCE
  experience: {
    name: 'experience',
    description: 'Traces employment timeline and engineering milestones.',
    execute: async () => {
      const timeline = experienceTimeline.map(exp => {
        const highlights = exp.highlights.map(h => `  * ${h}`).join('\n');
        return `
ROLE: ${exp.role.toUpperCase()}
COMPANY: ${exp.company} (${exp.location}) | ${exp.period}
HIGHLIGHTS:
${highlights}
STACK: ${exp.technicalExposure.join(', ')}
---------------------------------------------------`;
      }).join('\n');

      return `CAREER EXPERIENCE TIMELINE\n===================================================${timeline}\n`;
    }
  },

  // 14. CONTACT
  contact: {
    name: 'contact',
    description: 'Reveals direct email and social transmission relays.',
    execute: async () => {
      return `
SECURE TRANSMISSION RELAYS // SIVA PANYAM
===================================================
Email: contact@sivapanyam.dev
GitHub: https://github.com/SivaPanyam
LinkedIn: https://linkedin.com/in/sivapanyam
Location: Bangalore, Karnataka, India (UTC+5:30)

Available for Full-Stack, Frontend Architect, and AI Systems roles.
Direct inquiries receive responses within 24 hours.
`;
    }
  },

  // 15. CLEAR
  clear: {
    name: 'clear',
    description: 'Clears the terminal output screen.',
    execute: async () => ''
  },

  // 16. EASTER EGG: SUDO HIRE SIVA
  sudo: {
    name: 'sudo',
    description: 'Execute command with elevated administrative privilege.',
    usage: 'sudo <command>',
    execute: async (args) => {
      const sub = args.join(' ').toLowerCase().trim();
      if (sub === 'hire siva' || sub === 'hire' || sub === 'hire-siva') {
        return `
[AUTHENTICATING ROOT CREDENTIALS...]
Password: ****************
ACCESS GRANTED: ROOT OVERRIDE GRANTED TO RECRUITER / TECH LEAD.

  ======================================================
  🎉 CONGRATULATIONS! YOU HAVE INITIATED SIVA'S RECRUITMENT PIPELINE!
  ======================================================
  Candidate: Siva Panyam (B.Tech CS, CGPA: 9.24)
  Target Roles: Full Stack Engineer / AI Systems Engineer
  Notice Period: Immediate / Flexible
  Location: Bangalore or Remote Worldwide

  ACTION ITEMS:
  1. Dispatch offer / invitation to: contact@sivapanyam.dev
  2. Connect on LinkedIn: https://linkedin.com/in/sivapanyam
  3. Review verified GitHub commits: https://github.com/SivaPanyam

  Clearance code: #SIVA-ROOT-2026-HIRED
  ======================================================
`;
      }
      return `[sudo] password for guest: \nSorry, user guest is not allowed to execute '${args.join(' ')}' on neural-os. Try: "sudo hire siva"`;
    }
  },

  // 17. EASTER EGG: RM -RF /
  rm: {
    name: 'rm',
    description: 'Remove files or directories.',
    usage: 'rm [-rf] <target>',
    execute: async (args) => {
      const full = args.join(' ');
      if (full.includes('-rf /') || full.includes('-rf ~') || full.includes('-r /')) {
        return `
[KERNEL PANIC PREVENTION]
rm: it is dangerous to operate recursively on '/'
rm: cannot remove root directory: Nice try! 😉
Siva's portfolio is protected by Raft WAL quorum replication and immutable distributed state.
All assets survived unharmed.
`;
      }
      return `rm: missing operand or permission denied in read-only sandbox.`;
    }
  }
};

/**
 * Autocomplete suggestion engine supporting commands, directories, and files!
 */
export const getAutocompleteSuggestion = (input: string, currentPath: string[] = ['~']): string => {
  if (!input.trim()) return '';
  const parts = input.split(/\s+/);

  // If typing the command name
  if (parts.length === 1) {
    const prefix = parts[0].toLowerCase();
    const cmdNames = Object.keys(commandRegistry);
    const match = cmdNames.find(name => name.startsWith(prefix) && name !== prefix);
    return match ? match.slice(prefix.length) : '';
  }

  // If typing arguments for cd / cat / ls
  const cmd = parts[0].toLowerCase();
  if (['cd', 'cat', 'ls'].includes(cmd)) {
    const lastArg = parts[parts.length - 1];
    const resolved = resolvePath(currentPath, '.');
    if (resolved.node && resolved.node.type === 'dir' && resolved.node.children) {
      const names = Object.keys(resolved.node.children);
      const match = names.find(n => n.toLowerCase().startsWith(lastArg.toLowerCase()) && n.toLowerCase() !== lastArg.toLowerCase());
      if (match) {
        return match.slice(lastArg.length);
      }
    }
  }

  return '';
};
