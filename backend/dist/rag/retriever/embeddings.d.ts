import { OpenAIEmbeddings } from '@langchain/openai';
export declare function getEmbeddingsInstance(): Promise<OpenAIEmbeddings>;
export declare function generateEmbedding(text: string): Promise<number[]>;
export declare function generateEmbeddings(texts: string[]): Promise<number[][]>;
//# sourceMappingURL=embeddings.d.ts.map