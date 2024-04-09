import { Pool } from "pg";
import { ActionLog } from "../types/databaseTypes.js";

export default class DatabaseService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async addLog(actionLog: ActionLog) {
    try {
      await this.pool.query(
        "INSERT INTO action_logs (action_type, event_id) VALUES ($1, $2)",
        [actionLog.action_type, actionLog.event_id]
      );
    } catch (error) {
      throw error;
    }
  }
}
