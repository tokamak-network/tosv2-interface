export function getDiscountRate(_weeks: number) {
  let rate = 0;

  if (_weeks < 26) rate = 0;
  else if (_weeks < 52) rate = 1200;
  else if (_weeks < 78) rate = 2400;
  else if (_weeks < 104) rate = 3600;
  else if (_weeks < 130) rate = 4800;
  else rate = 6000;

  return rate;
}
