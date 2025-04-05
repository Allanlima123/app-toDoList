export const usePriorityClass = (priority: "Baixa" | "Média" | "Alta") => {
  return {
    "bg-green-200 text-green-800": priority === "Baixa",
    "bg-yellow-200 text-yellow-800": priority === "Média",
    "bg-red-200 text-red-800": priority === "Alta",
  };
};
