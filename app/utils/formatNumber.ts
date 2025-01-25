export function formatNumberWithCommas(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const formatNumber = (num: number) => {
  if (num === 0) return "0,00";
  if (Math.abs(num) < 0.01) return num.toExponential(2);
  return num.toLocaleString("es-ES", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
