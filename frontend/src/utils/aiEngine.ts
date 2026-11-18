// frontend/src/utils/aiEngine.ts
/**
 * Zero-API Deterministic Neural Intelligence Engine with Observability Telemetry
 * Powered by in-browser BM25 index & VFS knowledge graph traversal.
 */
import { queryKnowledgeIndex } from './neuralSearchEngine';

export interface TelemetryLog {
  query: string;
  detectedIntent: string;
  matchedKeywords: string[];
  contextChunks: string[];
  latencyMs: number;
  tokenCount: number;
  modelEngine: string;
}

export interface AIResponseWithTelemetry {
  text: string;
  telemetry: TelemetryLog;
}

export function generateAIResponseWithTelemetry(query: string): AIResponseWithTelemetry {
  const clean = query.trim();
  const searchResult = queryKnowledgeIndex(clean);

  return {
    text: searchResult.doc.directAnswer,
    telemetry: {
      query: clean,
      detectedIntent: searchResult.intent,
      matchedKeywords: searchResult.matchedTerms,
      contextChunks: [
        searchResult.vfsReference,
        `IndexNode::${searchResult.doc.id}`,
        `Confidence::${Math.min(Math.round(searchResult.score * 100), 100)}%`
      ],
      latencyMs: searchResult.latencyMs,
      tokenCount: searchResult.doc.directAnswer.split(/\s+/).length,
      modelEngine: 'NeuralOS In-Browser BM25 v2.0 (Zero-API)'
    }
  };
}

export function getPseudoAIResponse(query: string): string {
  return generateAIResponseWithTelemetry(query).text;
}
