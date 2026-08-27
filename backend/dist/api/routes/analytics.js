import { Router } from 'express';
import { query } from '../../db/connection.js';
import { logger } from '../../utils/logger.js';
export const analyticsRouter = Router();
// GET /api/analytics/questions - Question analytics
analyticsRouter.get('/questions', async (req, res) => {
    try {
        const period = req.query.period || '7d'; // 7d, 30d, 90d
        let dateFilter = 'CURRENT_DATE - INTERVAL \'7 days\'';
        if (period === '30d')
            dateFilter = 'CURRENT_DATE - INTERVAL \'30 days\'';
        if (period === '90d')
            dateFilter = 'CURRENT_DATE - INTERVAL \'90 days\'';
        const result = await query(`SELECT 
        COUNT(*) as total_questions,
        AVG(confidence) as avg_confidence,
        MAX(confidence) as max_confidence,
        MIN(confidence) as min_confidence
       FROM questions 
       WHERE created_at >= ${dateFilter}`);
        return res.json({
            period,
            stats: result.rows[0]
        });
    }
    catch (error) {
        logger.error('Error fetching question analytics:', error);
        return res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});
// GET /api/analytics/popular-questions - Most asked questions
analyticsRouter.get('/popular-questions', async (req, res) => {
    try {
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const result = await query(`SELECT 
        query,
        COUNT(*) as ask_count,
        AVG(confidence) as avg_confidence
       FROM questions 
       GROUP BY query
       ORDER BY ask_count DESC
       LIMIT $1`, [limit]);
        return res.json(result.rows);
    }
    catch (error) {
        logger.error('Error fetching popular questions:', error);
        return res.status(500).json({ error: 'Failed to fetch popular questions' });
    }
});
// GET /api/analytics/policy-coverage - Policy usage statistics
analyticsRouter.get('/policy-coverage', async (req, res) => {
    try {
        const result = await query(`SELECT 
        p.id,
        p.title,
        p.category,
        COUNT(q.id) as times_used,
        AVG(q.confidence) as avg_confidence
       FROM policies p
       LEFT JOIN questions q ON p.id = ANY(q.source_ids)
       GROUP BY p.id, p.title, p.category
       ORDER BY times_used DESC
       LIMIT 20`);
        return res.json(result.rows);
    }
    catch (error) {
        logger.error('Error fetching policy coverage:', error);
        return res.status(500).json({ error: 'Failed to fetch policy coverage' });
    }
});
// GET /api/analytics/categories - Category statistics
analyticsRouter.get('/categories', async (req, res) => {
    try {
        const result = await query(`SELECT 
        p.category,
        COUNT(DISTINCT p.id) as policy_count,
        COUNT(q.id) as question_count,
        AVG(q.confidence) as avg_confidence
       FROM policies p
       LEFT JOIN questions q ON p.id = ANY(q.source_ids)
       GROUP BY p.category
       ORDER BY question_count DESC`);
        return res.json(result.rows);
    }
    catch (error) {
        logger.error('Error fetching category analytics:', error);
        return res.status(500).json({ error: 'Failed to fetch category analytics' });
    }
});
//# sourceMappingURL=analytics.js.map