export interface Itask {
  task_id?: number;
  title: string;
  description: string;
  priority: "Baixa" | "Média" | "Alta";
  duedata: string;
  is_favorita?: boolean;
  is_complete?: boolean;
}
