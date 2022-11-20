export const createRange = (start: number, end?: number): number[] => {
  if (end === undefined) {
    return createRange(0, start);
  }

  const size = end - start;
  return Array(size).fill(0).map((_, i) => start + i);
};

export function createArray<T>(size: number, fillValue: T): T[] {
  const arr = Array(size).fill(fillValue) as T[];
  return arr;
}

export function setsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  return [...a].every(x => b.has(x));
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const emptyFunction = () => {};
