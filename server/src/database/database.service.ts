import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';

export type DatabaseStatus = 'connected' | 'disconnected';

export interface DatabaseHealth {
  status: DatabaseStatus;
  latencyMs?: number;
  error?: string;
}

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private pool: Pool | null = null;

  constructor(private readonly config: ConfigService) {}

  private getPool(): Pool {
    if (!this.pool) {
      const db = this.config.get<{
        url?: string;
        host?: string;
        port?: number;
        username?: string;
        password?: string;
        database?: string;
        ssl?: boolean;
      }>('database');

      if (!db) {
        throw new Error('Database configuration is missing');
      }

      this.pool = db.url
        ? new Pool({
            connectionString: db.url,
            ssl: db.ssl ? { rejectUnauthorized: false } : undefined,
          })
        : new Pool({
            host: db.host,
            port: db.port,
            user: db.username,
            password: db.password,
            database: db.database,
            ssl: db.ssl ? { rejectUnauthorized: false } : undefined,
          });
    }

    return this.pool;
  }

  async ping(): Promise<DatabaseHealth> {
    const start = Date.now();
    let client: PoolClient | null = null;

    try {
      client = await this.getPool().connect();
      await client.query('SELECT 1');
      return {
        status: 'connected',
        latencyMs: Date.now() - start,
      };
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Database connection failed';
      return {
        status: 'disconnected',
        error: message,
      };
    } finally {
      client?.release();
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      this.pool = null;
    }
  }
}
