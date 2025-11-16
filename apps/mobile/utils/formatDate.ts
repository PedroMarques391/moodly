function formatDate(date: Date): string {
  const formatedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatedDate;
}

function formatTime(date: Date): string {
  const formatedDate = new Date(date).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatedDate;
}

export { formatDate, formatTime };
