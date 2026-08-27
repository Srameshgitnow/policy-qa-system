import { Router } from 'express';
import { query } from '../../db/connection.js';
import { generateEmbedding } from '../../rag/retriever/embeddings.js';
import { retrieveRelevantChunks, searchPoliciesByKeyword } from '../../rag/retriever/index.js';
import { generateAnswer } from '../../rag/generator/index.js';
import { logger } from '../../utils/logger.js';
export const questionsRouter = Router();
// POST /api/questions - Ask a question
questionsRouter.post('/', async (req, res) => {
    try {
        const { query: userQuery } = req.body;
        if (!userQuery || userQuery.trim().length === 0) {
            return res.status(400).json({ error: 'Query cannot be empty' });
        }
        logger.info(`Processing question: ${userQuery}`);
        // Generate embedding for the user's question
        const embedding = await generateEmbedding(userQuery);
        // Retrieve relevant policy chunks
        const retrievedChunks = await retrieveRelevantChunks(embedding, 5);
        if (retrievedChunks.length === 0) {
            logger.warn(`No relevant chunks found for query: ${userQuery}`);
            // Fallback to keyword search
            const relatedPolicies = await searchPoliciesByKeyword(userQuery);
            return res.json({
                answer: 'I could not find a direct answer to your question in our policy database. Here are some related policies you might find helpful:',
                confidence: 0,
                sources: [],
                relatedPolicies: relatedPolicies.map((p) => p.title)
            });
        }
        // Generate answer from retrieved chunks
        const generatedAnswer = await generateAnswer(userQuery, retrievedChunks);
        // Store question and answer in database
        const sourceIds = retrievedChunks.map(chunk => chunk.policyId);
        const insertResult = await query(`INSERT INTO questions (query, answer, confidence, source_ids)
       VALUES ($1, $2, $3, $4)
       RETURNING id, created_at`, [userQuery, generatedAnswer.answer, generatedAnswer.confidence, sourceIds]);
        const questionId = insertResult.rows[0].id;
        logger.info(`Question ${questionId} processed successfully`);
        return res.json({
            id: questionId,
            query: userQuery,
            answer: generatedAnswer.answer,
            confidence: generatedAnswer.confidence,
            sources: generatedAnswer.sources,
            relatedPolicies: generatedAnswer.relatedPolicies,
            createdAt: insertResult.rows[0].created_at
        });
    }
    catch (error) {
        logger.error('Error processing question:', error);
        return res.status(500).json({
            error: 'Failed to process question',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
});
// GET /api/questions/:id - Get a specific question and answer
questionsRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query(`SELECT * FROM questions WHERE id = $1`, [parseInt(id)]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        return res.json(result.rows[0]);
    }
    catch (error) {
        logger.error('Error fetching question:', error);
        return res.status(500).json({ error: 'Failed to fetch question' });
    }
});
// GET /api/questions - List all questions (with pagination)
questionsRouter.get('/', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 10, 100);
        const offset = parseInt(req.query.offset) || 0;
        const result = await query(`SELECT id, query, confidence, created_at FROM questions 
       ORDER BY created_at DESC 
       LIMIT $1 OFFSET $2`, [limit, offset]);
        const countResult = await query('SELECT COUNT(*) FROM questions');
        return res.json({
            total: parseInt(countResult.rows[0].count),
            limit,
            offset,
            questions: result.rows
        });
    }
    catch (error) {
        logger.error('Error listing questions:', error);
        return res.status(500).json({ error: 'Failed to list questions' });
    }
});
//# sourceMappingURL=questions.js.map