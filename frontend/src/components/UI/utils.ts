export const dateFormatter = (date: string): string => {
  const parsedDate = new Date(date);
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateMonth = MONTHS[parsedDate.getMonth()] || "";
  const dateDay = parsedDate.getDate();
  return `${dateDay} ${dateMonth}`;
};
