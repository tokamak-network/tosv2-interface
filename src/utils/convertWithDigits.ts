function convertWithDigits(value: string) {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: 2,
  });
}

export { convertWithDigits };
