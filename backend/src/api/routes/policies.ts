import { Router, Request, Response } from 'express';
import { query } from '../../db/connection.js';
import { logger } from '../../utils/logger.js';

export const policiesRouter = Router();

// GET /api/policies - List all policies
policiesRouter.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;

    let queryText = 'SELECT id, title, category, source, url, source_date FROM policies';
    const params: any[] = [];

    if (category) {
      queryText += ' WHERE category = $1';
      params.push(category);
      queryText += ` ORDER BY source_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
    } else {
      queryText += ` ORDER BY source_date DESC LIMIT $1 OFFSET $2`;
      params.push(limit, offset);
    }

    const result = await query(queryText, params);

    const countText = category 
      ? 'SELECT COUNT(*) FROM policies WHERE category = $1'
      : 'SELECT COUNT(*) FROM policies';
    const countParams = category ? [category] : [];
    const countResult = await query(countText, countParams);

    return res.json({
      total: parseInt(countResult.rows[0].count),
      limit,
      offset,
      policies: result.rows
    });
  } catch (error) {
    logger.error('Error listing policies:', error);
    return res.status(500).json({ error: 'Failed to list policies' });
  }
});

// GET /api/policies/:id - Get a specific policy
policiesRouter.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;

    const result = await query(
      `SELECT * FROM policies WHERE id = $1`,
      [parseInt(id)]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Policy not found' });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    logger.error('Error fetching policy:', error);
    return res.status(500).json({ error: 'Failed to fetch policy' });
  }
});

// GET /api/policies/categories - List unique categories
policiesRouter.get('/categories/list', async (req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT DISTINCT category, COUNT(*) as count FROM policies 
       GROUP BY category ORDER BY count DESC`
    );

    return res.json(result.rows);
  } catch (error) {
    logger.error('Error listing categories:', error);
    return res.status(500).json({ error: 'Failed to list categories' });
  }
});
