import { createArray } from './utils';

const getNeighbourIndices = (x: number, y: number) => ([
  [x - 1, y - 1],
  [x, y - 1],
  [x + 1, y - 1],
  [x - 1, y],
  [x + 1, y],
  [x - 1, y + 1],
  [x, y + 1],
  [x + 1, y + 1]
]);

class State {
  size: number;
  values: Array<number>;
  isEmpty: boolean;

  constructor(size: number, values?: Array<number>) {
    this.size = size;

    if (values === undefined) {
      this.values = createArray(size * size, 0);
      this.isEmpty = true;
    } else {
      this.values = values;
      this.isEmpty = false;
    }
  }

  static randomize(size: number) {
    const values = createArray(size * size, 0)
      .map(() => (Math.random() > 0.5 ? 1 : 0));

    return new State(size, values);
  }

  clone() {
    return new State(this.size, [...this.values]);
  }

  get(x: number, y: number) {
    return this.values[this.size * y + x];
  }

  set(x: number, y: number, value: number) {
    this.values[this.size * y + x] = value;
  }

  countNeighbours(x: number, y: number) {
    let count = 0;

    getNeighbourIndices(x, y).forEach(([nx, ny]) => {
      if (nx >= 0 && nx < this.size && ny >= 0 && ny < this.size) {
        if (this.get(nx, ny)) {
          count++;
        }
      }
    });

    return count;
  }

  next({ birth, survival }: { birth: Set<number>, survival: Set<number> }) {
    const newValues: number[] = [];

    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const curr = this.get(x, y);
        const neighbours = this.countNeighbours(x, y);

        if (curr === 0) {
          if (birth.has(neighbours)) {
            newValues.push(1);
          } else {
            newValues.push(0);
          }
        } else if (survival.has(neighbours)) {
          newValues.push(curr + 1);
        } else {
          newValues.push(0);
        }
      }
    }

    return new State(this.size, newValues);
  }

  resize(newSize: number) {
    if (this.size === newSize) {
      return this.clone();
    }

    if (newSize > this.size) {
      return this.grow(newSize);
    }

    return this.shrink(newSize);
  }

  grow(newSize: number) {
    const diff = newSize - this.size;
    const left = Math.floor(diff / 2);
    const right = Math.ceil(diff / 2);
    const newValues = createArray(newSize * left, 0);

    for (let i = 0; i < this.size; i++) {
      newValues.push(...createArray(left, 0));
      newValues.push(...this.values.slice(i * this.size, i * this.size + this.size));
      newValues.push(...createArray(right, 0));
    }

    newValues.push(...createArray(newSize * right, 0));

    return new State(newSize, newValues);
  }

  shrink(newSize: number) {
    const diff = this.size - newSize;
    const start = Math.floor(diff / 2);
    const newValues: number[] = [];

    for (let i = start; i < start + newSize; i++) {
      const row = this.values.slice(
        i * this.size + start,
        i * this.size + start + newSize
      );

      newValues.push(...row);
    }

    return new State(newSize, newValues);
  }

  toggleCell(x: number, y: number) {
    const newState = this.clone();

    newState.set(x, y, this.get(x, y) ? 0 : 1);

    return newState;
  }
}

export default State;
