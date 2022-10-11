export const randomIntFromInterval = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export function getDifference(a, b) {
  return Math.abs(a - b);
}
