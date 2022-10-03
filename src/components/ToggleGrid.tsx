import type { FC, ReactNode } from 'react';
import { Fragment, useEffect, useState, useRef } from 'react';

type ToggleGridProps = {
  className: string;
  values: Set<number>[];
  labels: ReactNode[];
  onChange: (_: Set<number>[]) => void;
};

const ToggleGrid: FC<ToggleGridProps> = ({ className = '', values, labels, onChange, ...props }) => {
  const currentValues = useRef<Set<number>[]>();

  const [matrix, setMatrix] = useState<boolean[][]>(Array(2).fill(0).map(() =>
    Array(9).fill(false)));

  const handleClick = (rowIdx: number, colIdx: number) => {
    setMatrix(prevMatrix =>
      prevMatrix.map((row, i) =>
        row.map((cell, j) => (rowIdx === i && colIdx === j ? !cell : cell))
      )
    );
  };

  useEffect(() => {
    if (!values) {
      return;
    }

    currentValues.current = values;

    const matrix = values.map(row => Array(9).fill(0).map((_, idx) => row.has(idx)));
    setMatrix(matrix);
  }, [values]);

  useEffect(() => {
    if (!currentValues.current) {
      return;
    }

    const output = matrix.map(row => new Set(
      row.map((v, idx) => v ? idx : null)  // Replace trues with index
         .filter(v => v !== null)
    ));

    const outputMatches = output.every((row, idx) => {
      const other = currentValues.current[idx];

      if (other.size !== row.size) {
        return false;
      }

      return Array.from(row).every(value => other.has(value));
    });

    if (!outputMatches) {
      onChange?.(output);
    }
  }, [matrix]);

  return (
    <div className={`contents ${className}`} {...props}>
      {matrix.map((row, rowIdx) => (
        <Fragment key={rowIdx}>
          {labels[rowIdx]}
          <div className="flex w-full lg:w-72 h-8">
            {Array.from(row).map((value, idx) => {
              const key = `checkbox-${rowIdx}-${idx}`;
              const insetTop = rowIdx === 0 || !matrix[rowIdx - 1][idx];
              const insetLeft = idx === 0 || !row[idx - 1];
              const insetCorner = rowIdx > 0 && idx > 0 && !insetTop && !insetLeft && !matrix[rowIdx - 1][idx - 1];

              return (
                <Fragment key={key}>
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={() => handleClick(rowIdx, idx)}
                    className={`${insetTop ? 'button-inset-top' : ''} ${insetLeft ? 'button-inset-left' : ''} ${insetCorner ? 'button-inset-corner' : ''}`}
                  />
                  <label htmlFor={key} className="select-none">
                    <div>{idx}</div>
                  </label>
                </Fragment>
              );
            })}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default ToggleGrid;
