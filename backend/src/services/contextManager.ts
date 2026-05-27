// backend/src/services/contextManager.ts
import { portfolioKnowledge } from '../knowledge/portfolioKnowledge.js';

export type Intent = 'projects' | 'skills' | 'experience' | 'architecture' | 'contact' | 'general';

export interface QueryClassification {
  intent: Intent;
  targetProject: string | undefined;
  targetCompany: string | undefined;
}

/**
 * Classifies a user query into specific intents and target nodes (e.g. specific projects).
 */
export function classifyQuery(message: string): QueryClassification {
  const query = message.toLowerCase().trim();

  // 1. Detect target projects
  let targetProject: string | undefined;
  if (query.includes('neuralos') || query.includes('desktop') || query.includes('shell') || query.includes('console')) {
    targetProject = 'neuralos';
  } else if (query.includes('sync') || query.includes('mesh') || query.includes('websocket') || query.includes('redis')) {
    targetProject = 'meshsync';
  } else if (query.includes('brand') || query.includes('showcase') || query.includes('manual') || query.includes('guideline') || query.includes('design')) {
    targetProject = 'brandshowcase';
  }

  // 2. Detect target companies / telemetry nodes
  let targetCompany: string | undefined;
  if (query.includes('synthesis') || query.includes('lead')) {
    targetCompany = 'AI Synthesis Labs';
  } else if (query.includes('datasync') || query.includes('corp')) {
    targetCompany = 'DataSync Corp';
  } else if (query.includes('sandbox') || query.includes('research')) {
    targetCompany = 'Bangalore Engineering Sandbox';
  }

  // 3. Classify primary intent
  let intent: Intent = 'general';

  if (targetProject || query.includes('project') || query.includes('work') || query.includes('build') || query.includes('lab') || query.includes('product')) {
    intent = 'projects';
  } else if (query.includes('skill') || query.includes('stack') || query.includes('tech') || query.includes('expert') || query.includes('language') || query.includes('tool') || query.includes('capability') || query.includes('proficien')) {
    intent = 'skills';
  } else if (targetCompany || query.includes('experience') || query.includes('job') || query.includes('career') || query.includes('telemetry') || query.includes('role') || query.includes('architect') || query.includes('history') || query.includes('employ')) {
    intent = 'experience';
  } else if (query.includes('architect') && (query.includes('decision') || query.includes('trade') || query.includes('reason') || query.includes('why') || query.includes('alternative') || query.includes('design'))) {
    intent = 'architecture';
  } else if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('touch') || query.includes('avail') || query.includes('hire') || query.includes('relocat') || query.includes('open')) {
    intent = 'contact';
  }

  return { intent, targetProject, targetCompany };
}

/**
 * Dynamically retrieves the relevant text context based on intent and target classification.
 */
export function getContextForQuery(message: string): string {
  const classification = classifyQuery(message);
  const info = portfolioKnowledge.personalInfo;

  let context = ``;

  // Always inject basic metadata header for context pinning
  context += `CONTEXT TELEMETRY PIN:\n`;
  context += `Developer: ${info.name} | Role: ${info.title} | Location: ${info.location}\n`;
  context += `Email Gateway: ${info.email} | GitHub: ${info.github} | LinkedIn: ${info.linkedin}\n`;
  context += `===================================================\n\n`;

  switch (classification.intent) {
    case 'projects':
      if (classification.targetProject) {
        const proj = portfolioKnowledge.projects.find(p => p.id === classification.targetProject);
        if (proj) {
          context += `TARGET PROJECT INVESTIGATION: Detailed System Telemetry for [${proj.title}]\n`;
          context += `---------------------------------------------------\n`;
          context += `Tagline: ${proj.tagline}\n`;
          context += `Category: ${proj.category} | Status: ${proj.status}\n`;
          context += `Problem: ${proj.problemStatement}\n`;
          context += `Solution: ${proj.solutionDescription}\n`;
          context += `Architectural Specs: ${proj.architectureDetails}\n`;
          
          context += `Tech Stack: ${proj.techStack.map(t => `${t.name} (${t.category} - ${t.proficiency})`).join(', ')}\n`;
          context += `Key Features:\n${proj.keyFeatures.map(f => `  * ${f}`).join('\n')}\n`;
          
          context += `Deep Engineering Challenges Resolved:\n`;
          proj.engineeringChallenges.forEach((ec, idx) => {
            context += `  Challenge #${idx + 1}:\n`;
            context += `    - Challenge: ${ec.challenge}\n`;
            context += `    - Solution Applied: ${ec.solution}\n`;
            context += `    - Technical Outcome: ${ec.technicalOutcome}\n`;
          });
          break;
        }
      }
      
      // Fallback: list overall project summaries
      context += `PROJECTS DIRECTORY INDEX:\n`;
      context += `---------------------------------------------------\n`;
      portfolioKnowledge.projects.forEach(p => {
        context += `* **${p.title}** (${p.tagline})\n`;
        context += `  - Status: ${p.status} | Tech: ${p.techStack.slice(0, 3).map(t => t.name).join(', ')}\n`;
        context += `  - Core Solution: ${p.solutionDescription.slice(0, 140)}...\n`;
      });
      break;

    case 'skills':
      context += `TECHNICAL CAPABILITY INTELLIGENCE GRID:\n`;
      context += `---------------------------------------------------\n`;
      portfolioKnowledge.skills.forEach(group => {
        context += `### Category: ${group.category}\n`;
        group.skills.forEach(s => {
          context += `  - **${s.name}** (Proficiency Level: ${s.level}%) - ${s.description}\n`;
        });
      });
      break;

    case 'experience':
      if (classification.targetCompany) {
        const exp = portfolioKnowledge.experience.find(e => e.company === classification.targetCompany);
        if (exp) {
          context += `TARGET JOB HISTORICAL RECORD: [${exp.role} @ ${exp.company}]\n`;
          context += `---------------------------------------------------\n`;
          context += `Timeline: ${exp.timeline}\n`;
          context += `Summary: ${exp.description}\n`;
          context += `Metric-Backed Engineering Achievements:\n${exp.achievements.map(a => `  - ${a}`).join('\n')}\n`;
          context += `Stack Used: ${exp.technologies.join(', ')}\n`;
          break;
        }
      }

      // Fallback: list whole timeline
      context += `EMPLOYMENT TELEMETRY TIMELINE:\n`;
      context += `---------------------------------------------------\n`;
      portfolioKnowledge.experience.forEach(exp => {
        context += `### ${exp.role} @ ${exp.company} (${exp.timeline})\n`;
        context += `  - Description: ${exp.description}\n`;
        context += `  - Achievements:\n${exp.achievements.map(a => `    * ${a}`).join('\n')}\n`;
        context += `  - Technologies: ${exp.technologies.join(', ')}\n\n`;
      });
      break;

    case 'architecture':
      context += `CORE ARCHITECTURE DECISION LOGS (ADRs) & TRADE-OFFS:\n`;
      context += `---------------------------------------------------\n`;
      portfolioKnowledge.architectureDecisions.forEach(decision => {
        context += `### Topic: ${decision.topic}\n`;
        context += `  - Decision: ${decision.decision}\n`;
        context += `  - Alternatives Considered: ${decision.alternativesConsidered.join(', ')}\n`;
        context += `  - Trade-offs: ${decision.tradeOffs}\n`;
        context += `  - Rationale: ${decision.reasoning}\n\n`;
      });
      
      context += `WORKFLOW & COMPILING GUIDELINES:\n`;
      context += `---------------------------------------------------\n`;
      portfolioKnowledge.workflowGuidelines.forEach(guide => {
        context += `* **${guide.name}:** ${guide.description}\n`;
        context += `  - Implication: ${guide.technicalImplication}\n`;
      });
      break;

    case 'contact':
      context += `SECURE SYNAPSE CHANNELS & AVAILABILITY STATUS:\n`;
      context += `---------------------------------------------------\n`;
      context += `* **Availability:** Siva is currently open to full-time remote opportunities worldwide or hybrid roles in Bangalore, India.\n`;
      context += `* **Relocation:** Open to relocation for selective high-impact developer roles.\n`;
      context += `* **Email Gateway:** ${info.email} (Response within 12 hours)\n`;
      context += `* **LinkedIn Portal:** ${info.linkedin}\n`;
      context += `* **GitHub Repositories:** ${info.github}\n`;
      context += `* **CV Payload Document URL:** ${info.cvUrl}\n`;
      context += `* **Recruiter Pitch Summary:** ${info.recruiterPitch}\n`;
      break;

    case 'general':
    default:
      context += `OVERALL PROFILE telemetry:\n`;
      context += `---------------------------------------------------\n`;
      context += `Summary: ${info.summary}\n\n`;
      context += `Value Proposition for Recruiters:\n${info.recruiterPitch}\n\n`;
      context += `Engineering Philosophy: "${info.philosophy}"\n\n`;
      
      context += `PROJECT INDEX QUICK-LOOK:\n`;
      portfolioKnowledge.projects.forEach(p => {
        context += `  * ${p.title} (${p.category}) - ${p.tagline}\n`;
      });
      break;
  }

  return context;
}
