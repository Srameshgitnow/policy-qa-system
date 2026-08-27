import { query } from '../../db/connection.js';
import { logger } from '../../utils/logger.js';
import { generateEmbeddings } from '../retriever/embeddings.js';
export async function ingestPolicy(title, content, category, source, url) {
    try {
        // Insert policy
        const policyResult = await query(`INSERT INTO policies (title, category, source, url, content, source_date)
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
       RETURNING id`, [title, category, source, url, content]);
        const policyId = policyResult.rows[0].id;
        logger.info(`Inserted policy ${policyId}: ${title}`);
        // Split content into chunks (approximately 384 tokens)
        const chunkSize = 1500; // characters (rough estimate)
        const chunks = [];
        for (let i = 0; i < content.length; i += chunkSize) {
            chunks.push(content.substring(i, i + chunkSize));
        }
        // Generate embeddings for chunks
        const embeddings = await generateEmbeddings(chunks);
        // Insert chunks with embeddings
        for (let i = 0; i < chunks.length; i++) {
            await query(`INSERT INTO policy_chunks (policy_id, chunk_index, content, embedding, tokens)
         VALUES ($1, $2, $3, $4::vector, $5)`, [policyId, i, chunks[i], JSON.stringify(embeddings[i]), Math.ceil(chunks[i].length / 4)]);
        }
        logger.info(`Ingested ${chunks.length} chunks for policy ${policyId}`);
        return policyId;
    }
    catch (error) {
        logger.error('Error ingesting policy:', error);
        throw error;
    }
}
export async function ingestDocumentFromUrl(url, category, source) {
    try {
        // Fetch and parse document (simplified)
        logger.info(`Fetching document from ${url}`);
        // In production, this would fetch from GOV.UK or other sources
        // For now, we'll just return a placeholder
        logger.warn('Document ingestion from URL not fully implemented');
        return -1;
    }
    catch (error) {
        logger.error('Error ingesting document from URL:', error);
        throw error;
    }
}
//# sourceMappingURL=ingest.js.map