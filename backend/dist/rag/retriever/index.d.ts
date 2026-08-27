export interface RetrievedChunk {
    id: number;
    policyId: number;
    content: string;
    source: string;
    title: string;
    url: string;
    similarity: number;
}
export declare function retrieveRelevantChunks(embedding: number[], limit?: number): Promise<RetrievedChunk[]>;
export declare function searchPoliciesByKeyword(keyword: string): Promise<any[]>;
//# sourceMappingURL=index.d.ts.map