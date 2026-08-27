import { Pool } from 'pg';
export declare function initializeDatabase(): Promise<void>;
export declare function getPool(): Pool;
export declare function query(text: string, params?: any[]): Promise<import("pg").QueryResult<any>>;
//# sourceMappingURL=connection.d.ts.map