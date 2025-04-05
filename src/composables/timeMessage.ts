export const useTimeMessage = (duedata: string | Date): string => {
  const today = new Date();
  let taskDate: Date;

  if (typeof duedata === "string") {
    const parts = duedata.split("-");
    if (parts.length !== 3) return "Formato inválido";

    taskDate = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );
  } else {
    taskDate = duedata;
  }

  const differenceInMs = taskDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  const messages: Record<number, string> = {
    [0]: "Vence hoje",
    [1]: "Vence amanhã",
  };

  if (differenceInDays < 0) return "O prazo venceu";
  return messages[differenceInDays] || `Vence em ${differenceInDays} dias`;
};








