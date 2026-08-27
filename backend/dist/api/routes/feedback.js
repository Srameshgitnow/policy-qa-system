import { Router } from 'express';
import { query } from '../../db/connection.js';
import { logger } from '../../utils/logger.js';
export const feedbackRouter = Router();
// POST /api/feedback - Submit feedback on a question/answer
feedbackRouter.post('/', async (req, res) => {
    try {
        const { questionId, helpful, feedback } = req.body;
        if (typeof questionId !== 'number' || typeof helpful !== 'boolean') {
            return res.status(400).json({ error: 'Invalid request parameters' });
        }
        // Update the question with feedback
        const result = await query(`UPDATE questions 
       SET feedback_helpful = $1, feedback_text = $2, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING id`, [helpful, feedback || null, questionId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Question not found' });
        }
        logger.info(`Feedback recorded for question ${questionId}: helpful=${helpful}`);
        return res.json({
            success: true,
            message: 'Feedback recorded successfully'
        });
    }
    catch (error) {
        logger.error('Error recording feedback:', error);
        return res.status(500).json({ error: 'Failed to record feedback' });
    }
});
// GET /api/feedback/stats - Get feedback statistics
feedbackRouter.get('/stats', async (req, res) => {
    try {
        const result = await query(`SELECT 
        COUNT(*) as total_feedback,
        SUM(CASE WHEN feedback_helpful = true THEN 1 ELSE 0 END) as helpful_count,
        SUM(CASE WHEN feedback_helpful = false THEN 1 ELSE 0 END) as not_helpful_count,
        ROUND(
          100.0 * SUM(CASE WHEN feedback_helpful = true THEN 1 ELSE 0 END) / 
          COUNT(*),
          2
        ) as helpful_percentage
       FROM questions 
       WHERE feedback_helpful IS NOT NULL`);
        return res.json(result.rows[0]);
    }
    catch (error) {
        logger.error('Error fetching feedback stats:', error);
        return res.status(500).json({ error: 'Failed to fetch feedback statistics' });
    }
});
//# sourceMappingURL=feedback.js.map