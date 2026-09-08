import { query } from '../../db/connection.js';
import { logger } from '../../utils/logger.js';
export async function retrieveRelevantChunks(embedding, limit = 5) {
    try {
        const result = await query(`SELECT 
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
      LIMIT $2`, [JSON.stringify(embedding), limit]);
        return result.rows;
    }
    catch (error) {
        logger.error('Error retrieving chunks:', error);
        throw error;
    }
}
export async function searchPoliciesByKeyword(keyword) {
    try {
        // Build tokens from keyword to create a broader tsquery and ILIKE fallbacks
        const tokens = (keyword || '').toLowerCase().match(/\w+/g) || [];
        const terms = tokens.filter(t => t.length > 2);
        // Try full-text search including title + content
        if (terms.length > 0) {
            const tsQuery = terms.join(' | ');
            const result = await query(`SELECT id, title, category, source, url, 
                ts_rank(to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,'')), to_tsquery('english', $1)) as rank
         FROM policies
         WHERE to_tsvector('english', coalesce(title,'') || ' ' || coalesce(content,'')) @@ to_tsquery('english', $1)
         ORDER BY rank DESC
         LIMIT 10`, [tsQuery]);
            if (result.rows.length > 0)
                return result.rows;
            // ILIKE fallback across individual terms
            const ilikeClauses = terms.map((_, i) => `title ILIKE '%' || $${i + 1} || '%' OR content ILIKE '%' || $${i + 1} || '%' OR category ILIKE '%' || $${i + 1} || '%'`).join(' OR ');
            const ilikeParams = terms;
            const fallback = await query(`SELECT id, title, category, source, url
         FROM policies
         WHERE ${ilikeClauses}
         ORDER BY source_date DESC
         LIMIT 10`, ilikeParams);
            return fallback.rows;
        }
        // If no useful tokens, do a simple ILIKE on the full keyword
        const simple = await query(`SELECT id, title, category, source, url
       FROM policies
       WHERE title ILIKE '%' || $1 || '%' OR content ILIKE '%' || $1 || '%' OR category ILIKE '%' || $1 || '%'
       ORDER BY source_date DESC
       LIMIT 10`, [keyword]);
        return simple.rows;
    }
    catch (error) {
        logger.error('Error searching policies:', error);
        return [];
    }
}
//# sourceMappingURL=index.js.map