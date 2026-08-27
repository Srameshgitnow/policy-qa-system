import { RetrievedChunk } from '../retriever/index.js';
interface GeneratedAnswer {
    answer: string;
    confidence: number;
    sources: Array<{
        title: string;
        url: string;
        excerpt: string;
    }>;
    relatedPolicies: string[];
}
export declare function generateAnswer(query: string, retrievedChunks: RetrievedChunk[]): Promise<GeneratedAnswer>;
export declare function generateSummary(text: string, maxLength?: number): Promise<string>;
export {};
//# sourceMappingURL=index.d.ts.map