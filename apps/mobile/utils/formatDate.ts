function formatDate(date: Date): string {
  const formatedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return formatedDate;
}

export default formatDate;
