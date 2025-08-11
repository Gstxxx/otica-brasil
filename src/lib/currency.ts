export function toBRL(value: number | string): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(num)) return "0,00";
  return num.toFixed(2).replace(".", ",");
}


