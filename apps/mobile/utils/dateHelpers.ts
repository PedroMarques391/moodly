export function getDayOfMonth(date: Date | string): number {
  return new Date(date).getDate();
}

export function getMonth(date: Date | string): number {
  return new Date(date).getMonth();
}

export function getYear(date: Date | string): number {
  return new Date(date).getFullYear();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function isSameMonth(
  date1: Date | string,
  date2: Date | string,
): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
  );
}

export function getCurrentMonthYear(): { month: number; year: number } {
  const now = new Date();
  return {
    month: now.getMonth(),
    year: now.getFullYear(),
  };
}

export function getDayAndMonth(date: Date | string): {
  day: string;
  month: string;
} {
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, "0");
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  return { day, month };
}
