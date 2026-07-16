import { OpenAIEmbeddings } from '@langchain/openai';
import dotenv from 'dotenv';
import { logger } from '../../utils/logger.js';

dotenv.config();

let embeddingsInstance: OpenAIEmbeddings | null = null;

export async function getEmbeddingsInstance(): Promise<OpenAIEmbeddings> {
  if (!embeddingsInstance) {
    embeddingsInstance = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: 'text-embedding-3-small'
    });
  }
  return embeddingsInstance;
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const embeddings = await getEmbeddingsInstance();
    const embedding = await embeddings.embedQuery(text);
    return embedding;
  } catch (error) {
    logger.error('Error generating embedding:', error);
    throw error;
  }
}

export async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  try {
    const embeddings = await getEmbeddingsInstance();
    const generatedEmbeddings = await embeddings.embedDocuments(texts);
    return generatedEmbeddings;
  } catch (error) {
    logger.error('Error generating embeddings:', error);
    throw error;
  }
}
