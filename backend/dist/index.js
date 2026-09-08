import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { questionsRouter } from './api/routes/questions.js';
import { policiesRouter } from './api/routes/policies.js';
import { feedbackRouter } from './api/routes/feedback.js';
import { analyticsRouter } from './api/routes/analytics.js';
import { initializeDatabase } from './db/connection.js';
import { logger } from './utils/logger.js';
const envCandidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), 'backend/.env'),
    path.resolve(process.cwd(), '../backend/.env'),
    path.resolve(process.cwd(), '../../backend/.env')
];
const envFile = envCandidates.find((candidate) => fs.existsSync(candidate));
if (envFile) {
    dotenv.config({ path: envFile });
}
else {
    dotenv.config();
}
const app = express();
const PORT = process.env.PORT || 3000;
// Middleware
app.use(cors());
app.use(express.json());
// Request logging
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
});
// Routes
app.use('/api/questions', questionsRouter);
app.use('/api/policies', policiesRouter);
app.use('/api/feedback', feedbackRouter);
app.use('/api/analytics', analyticsRouter);
// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Initialize database and start server
async function start() {
    try {
        await initializeDatabase();
        logger.info('Database initialized');
        app.listen(PORT, () => {
            logger.info(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=index.js.map