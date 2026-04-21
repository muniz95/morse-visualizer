export type MorseCodeElement =
  | "short_signal"
  | "long_signal"
  | "char_interval"
  | "short_interval"
  | "medium_interval"
  | "long_interval";

export const dictionary: { [index: string]: MorseCodeElement[] } = {
  a: ['short_signal', 'long_signal'],
  b: ['long_signal', 'short_signal', 'short_signal', 'short_signal'],
  c: ['long_signal', 'short_signal', 'long_signal', 'short_signal'],
  d: ['long_signal', 'short_signal', 'short_signal'],
  e: ['short_signal'],
  f: ['short_signal', 'short_signal', 'long_signal', 'short_signal'],
  g: ['long_signal', 'long_signal', 'short_signal'],
  h: ['short_signal', 'short_signal', 'short_signal', 'short_signal'],
  i: ['short_signal', 'short_signal'],
  j: ['short_signal', 'long_signal', 'long_signal', 'long_signal'],
  k: ['long_signal', 'short_signal', 'long_signal'],
  l: ['short_signal', 'long_signal', 'short_signal', 'short_signal'],
  m: ['long_signal', 'long_signal'],
  n: ['long_signal', 'short_signal'],
  o: ['long_signal', 'long_signal', 'long_signal'],
  p: ['short_signal', 'long_signal', 'long_signal', 'short_signal'],
  q: ['long_signal', 'long_signal', 'short_signal', 'long_signal'],
  r: ['short_signal', 'long_signal', 'short_signal'],
  s: ['short_signal', 'short_signal', 'short_signal'],
  t: ['long_signal'],
  u: ['short_signal', 'short_signal', 'long_signal'],
  v: ['short_signal', 'short_signal', 'short_signal', 'long_signal'],
  w: ['short_signal', 'long_signal', 'long_signal'],
  x: ['long_signal', 'short_signal', 'short_signal', 'long_signal'],
  y: ['long_signal', 'short_signal', 'long_signal', 'long_signal'],
  z: ['long_signal', 'long_signal', 'short_signal', 'short_signal'],
  // 0: ['long_signal', 'long_signal', 'long_signal', 'long_signal', 'long_signal'],
  // 1: ['short_signal', 'long_signal', 'long_signal', 'long_signal', 'long_signal'],
  // 2: ['short_signal', 'short_signal', 'long_signal', 'long_signal', 'long_signal'],
  // 3: ['short_signal', 'short_signal', 'short_signal', 'long_signal', 'long_signal'],
  // 4: ['short_signal', 'short_signal', 'short_signal', 'short_signal', 'long_signal'],
  // 5: ['short_signal', 'short_signal', 'short_signal', 'short_signal', 'short_signal'],
  // 6: ['long_signal', 'short_signal', 'short_signal', 'short_signal', 'short_signal'],
  // 7: ['long_signal', 'long_signal', 'short_signal', 'short_signal', 'short_signal'],
  // 8: ['long_signal', 'long_signal', 'long_signal', 'short_signal', 'short_signal'],
  // 9: ['long_signal', 'long_signal', 'long_signal', 'long_signal', 'short_signal'],
};
