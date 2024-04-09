export interface ActionLog {
  action_type: "CREATED" | "EDITED" | "DELETED";
  event_id: string;
}
