export default class DatabaseService {
  pool;
  constructor(pool) {
    this.pool = pool;
  }
  async addLog(actionLog) {
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
