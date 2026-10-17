export type NotificationPriority = "information" | "attention" | "important";

export type AppNotification = {
  id: string;
  type: string;
  priority: NotificationPriority;
  title: string;
  body: string;
  action_path: string | null;
  aggregation_count: number;
  read_at: string | null;
  created_at: string;
};

export const notificationPriorityLabel: Record<NotificationPriority, string> = {
  information: "Informação",
  attention: "Atenção",
  important: "Importante",
};

export function safeNotificationPath(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/notificacoes";
}
