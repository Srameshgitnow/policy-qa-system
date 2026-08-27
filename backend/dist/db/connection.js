import { Pool } from 'pg';
import dotenv from 'dotenv';
import { logger } from '../utils/logger.js';
dotenv.config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432'),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
});
export async function initializeDatabase() {
    try {
        const client = await pool.connect();
        logger.info('Database connection successful');
        // Enable pgvector extension
        await client.query('CREATE EXTENSION IF NOT EXISTS vector');
        client.release();
    }
    catch (error) {
        logger.error('Database connection failed:', error);
        throw error;
    }
}
export function getPool() {
    return pool;
}
export async function query(text, params) {
    const start = Date.now();
    try {
        const result = await pool.query(text, params);
        const duration = Date.now() - start;
        logger.debug(`Executed query in ${duration}ms`);
        return result;
    }
    catch (error) {
        logger.error('Query error:', error);
        throw error;
    }
}
//# sourceMappingURL=connection.js.map