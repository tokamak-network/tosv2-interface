function commafy(num: number | string, decilamPoint?: number) {
  if (num === undefined) {
    return num;
  }
  if (num === 0 || num === "0") {
    if (decilamPoint) {
      return `0.${"0".repeat(decilamPoint)}`;
    }
    return "0.00";
  }
  let str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 2) {
    str[1] = str[1].slice(0, decilamPoint || 2);
  }
  if (str[1] === undefined && decilamPoint) {
    str[1] = `${"0".repeat(decilamPoint)}`;
  }
  return str.join(".").replaceAll(" ", "");
}

export default commafy;
