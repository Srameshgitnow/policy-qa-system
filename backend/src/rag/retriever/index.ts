import { query } from '../../db/connection.js';
import { logger } from '../../utils/logger.js';

export interface RetrievedChunk {
  id: number;
  policyId: number;
  content: string;
  source: string;
  title: string;
  url: string;
  similarity: number;
}

export async function retrieveRelevantChunks(
  embedding: number[],
  limit: number = 5
): Promise<RetrievedChunk[]> {
  try {
    const result = await query(
      `SELECT 
        pc.id,
        pc.policy_id as "policyId",
        pc.content,
        p.source,
        p.title,
        p.url,
        1 - (pc.embedding <=> $1::vector) as similarity
      FROM policy_chunks pc
      JOIN policies p ON pc.policy_id = p.id
      WHERE pc.embedding IS NOT NULL
      ORDER BY pc.embedding <=> $1::vector
      LIMIT $2`,
      [JSON.stringify(embedding), limit]
    );

    return result.rows as RetrievedChunk[];
  } catch (error) {
    logger.error('Error retrieving chunks:', error);
    throw error;
  }
}

export async function searchPoliciesByKeyword(keyword: string): Promise<any[]> {
  try {
    const result = await query(
      `SELECT id, title, category, source, url, 
              ts_rank(to_tsvector('english', content), plainto_tsquery('english', $1)) as rank
       FROM policies
       WHERE to_tsvector('english', content) @@ plainto_tsquery('english', $1)
       ORDER BY rank DESC
       LIMIT 10`,
      [keyword]
    );

    return result.rows;
  } catch (error) {
    logger.error('Error searching policies:', error);
    return [];
  }
}
