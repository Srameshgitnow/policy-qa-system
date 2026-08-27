import { query } from '../connection.js';
import { logger } from '../../utils/logger.js';
const migrations = [
    {
        name: '001-create-policies-table',
        up: `
      CREATE TABLE IF NOT EXISTS policies (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        source VARCHAR(255),
        url TEXT,
        source_date DATE,
        content TEXT,
        ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_policies_category ON policies(category);
      CREATE INDEX IF NOT EXISTS idx_policies_source ON policies(source);
    `,
        down: 'DROP TABLE IF EXISTS policies CASCADE;'
    },
    {
        name: '002-create-policy-chunks-table',
        up: `
      CREATE TABLE IF NOT EXISTS policy_chunks (
        id SERIAL PRIMARY KEY,
        policy_id INTEGER NOT NULL REFERENCES policies(id) ON DELETE CASCADE,
        chunk_index INTEGER NOT NULL,
        content TEXT NOT NULL,
        embedding vector(1536),
        tokens INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_policy_chunks_policy_id ON policy_chunks(policy_id);
      CREATE INDEX IF NOT EXISTS idx_policy_chunks_embedding ON policy_chunks USING ivfflat (embedding vector_cosine_ops);
    `,
        down: 'DROP TABLE IF EXISTS policy_chunks CASCADE;'
    },
    {
        name: '003-create-questions-table',
        up: `
      CREATE TABLE IF NOT EXISTS questions (
        id SERIAL PRIMARY KEY,
        query TEXT NOT NULL,
        answer TEXT,
        confidence DECIMAL(5,2),
        source_ids INTEGER[],
        feedback_helpful BOOLEAN,
        feedback_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at);
    `,
        down: 'DROP TABLE IF EXISTS questions CASCADE;'
    }
];
export async function runMigrations() {
    logger.info('Running migrations...');
    for (const migration of migrations) {
        try {
            await query(migration.up);
            logger.info(`✓ Migration ${migration.name} completed`);
        }
        catch (error) {
            logger.error(`✗ Migration ${migration.name} failed:`, error);
            throw error;
        }
    }
    logger.info('All migrations completed');
}
// Run migrations
runMigrations().catch(error => {
    logger.error('Migration failed:', error);
    process.exit(1);
});
//# sourceMappingURL=run.js.map