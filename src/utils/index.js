export const createRange = (start, end) => {
  if (end === undefined) {
    return createRange(0, start);
  }

  const size = end - start;
  return Array(size).fill(0).map((_, i) => start + i);
};
