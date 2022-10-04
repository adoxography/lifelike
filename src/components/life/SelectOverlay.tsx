import type { MouseEvent, TouchEvent } from 'react';
import { Fragment, useRef } from 'react';
import { useLife, useLifeSettings } from '@/hooks';
import { createRange } from '@/utils';

type CellTrack = [number, number][];

const SelectOverlay = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>();
  const isMouseDown = useRef<boolean>(false);
  const { toggleCell } = useLife();
  const { settings: { size } } = useLifeSettings();
  const cellTrack = useRef<CellTrack>([]);

  const percent = 100 / (size - 1);
  const halfPercent = percent / 2;

  const style = {
    gridTemplateColumns: `repeat(${size}, ${percent}%)`,
    gridTemplateRows: `repeat(${size}, ${percent}%)`,
    transform: `translate(-${halfPercent}%, -${halfPercent}%)`,
    touchAction: 'none'
  };

  const getCell = (x: number, y: number): [number, number] => {
    const rect = ref.current.getBoundingClientRect();
    const percentX = (x - rect.left) / rect.width;
    const percentY = (y - rect.top) / rect.height;

    const cellX = Math.floor(percentX * size);
    const cellY = Math.floor(percentY * size);

    if (cellX >= 0 && cellX < size && cellY >= 0 && cellY < size) {
      return [cellX, cellY];
    }

    return null;
  };

  const handleMouseStart = ({ pageX, pageY }: MouseEvent) => {
    isMouseDown.current = true;
    handleStart(pageX, pageY);
  };

  const handleTouchStart = ({ changedTouches }: TouchEvent) => {
    const { pageX, pageY } = changedTouches.item(0);
    handleStart(pageX, pageY);
  };

  const handleStart = (pageX: number, pageY: number) => {
    const cell = getCell(pageX, pageY);

    if (cell) {
      toggleCell(...cell);
      cellTrack.current = [cell];
    }
  };

  const handleMouseMove = ({ pageX, pageY }: MouseEvent) => {
    if (isMouseDown.current) {
      handleMove(pageX, pageY);
    }
  };

  const handleTouchMove = ({ changedTouches }: TouchEvent) => {
    const { pageX, pageY } = changedTouches.item(0);
    handleMove(pageX, pageY);
  };

  const handleMove = (pageX: number, pageY: number) => {
    const lastCell = cellTrack.current[cellTrack.current.length - 1];
    const cell = getCell(pageX, pageY);

    if (!cell) {
      return;
    }

    const fillers: CellTrack = [];
    const deltaX = cell[0] - lastCell[0];
    const deltaY = cell[1] - lastCell[1];
    const dist = Math.max(Math.abs(deltaX), Math.abs(deltaY));
    let [currX, currY] = lastCell;

    for (let i = 0; i < dist; i++) {
      currX += deltaX / dist;
      currY += deltaY / dist;

      const currCell: [number, number] = [Math.floor(currX), Math.floor(currY)];

      fillers.push(currCell);
    }
    
    if (fillers.length === 0 || fillers[fillers.length - 1][0] !== cell[0] || fillers[fillers.length - 1][1] !== cell[1]) {
      fillers.push(cell);
    }

    fillers.forEach(cell => {
      const isNew = !cellTrack.current.some(item => item[0] === cell[0] && item[1] === cell[1]);

      if (isNew) {
        toggleCell(...cell);
      }

      cellTrack.current.push(cell);
    });
  };

  const handleMouseEnd = () => {
    isMouseDown.current = false;
    cellTrack.current = [];
  };

  const handleTouchEnd = () => {
    cellTrack.current = [];
  };

  return (
    <div
      className={`grid ${className}`}
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseEnd}
      onMouseLeave={handleMouseEnd}
      ref={ref}
    >
      {createRange(size).map(y => (
        <Fragment key={y}>
          {createRange(size).map(x => (
            <button
              key={x}
              className="bg-blue-300 opacity-0 hover:opacity-50"
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default SelectOverlay;
