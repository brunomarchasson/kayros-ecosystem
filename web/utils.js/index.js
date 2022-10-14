export const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

export function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1);
}
