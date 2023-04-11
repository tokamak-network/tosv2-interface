function convertWithDigits(value: string | number) {
  return Number(
    Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
    })
  );
}

export { convertWithDigits };
