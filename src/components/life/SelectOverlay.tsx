import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLife, useLifeSettings } from '@/hooks';
import { createRange } from '@/utils';

type Position = [number, number];

const SelectOverlay = ({ className = '' } : { className?: string }) => {
  const gridRef = useRef<HTMLDivElement>();
  const buttonsRef = useRef<HTMLButtonElement[]>([]);
  const isMouseDown = useRef<boolean>(false);
  const { toggleCell } = useLife();
  const { settings: { size } } = useLifeSettings();
  const [recentlyPerformedTouch, setRecentlyPerformedTouch] = useState<boolean>(false);
  const [current, setCurrent] = useState<Position | null>(null);
  const cellTrack = useRef<Position[]>([]);

  const percent = 100 / (size - 1);
  const halfPercent = percent / 2;

  const style = {
    gridTemplateColumns: `repeat(${size}, ${percent}%)`,
    gridTemplateRows: `repeat(${size}, ${percent}%)`,
    transform: `translate(-${halfPercent}%, -${halfPercent}%)`,
    touchAction: 'none'
  };

  const getCell = (x: number, y: number): Position => {
    const rect = gridRef.current.getBoundingClientRect();
    const percentX = (x - rect.left) / rect.width;
    const percentY = (y - rect.top) / rect.height;

    const cellX = Math.floor(percentX * (size - 1));
    const cellY = Math.floor(percentY * (size - 1));

    if (cellX >= 0 && cellX < size && cellY >= 0 && cellY < size) {
      return [cellX, cellY];
    }

    return null;
  };

  const handleMouseStart = ({ clientX, clientY }: MouseEvent) => {
    if (recentlyPerformedTouch) {
      return;
    }

    isMouseDown.current = true;
    handleStart(clientX, clientY);
  };

  const handleTouchStart = ({ changedTouches }: TouchEvent) => {
    setRecentlyPerformedTouch(true);
    const { clientX, clientY } = changedTouches.item(0);
    handleStart(clientX, clientY);
  };

  const handleStart = (clientX: number, clientY: number) => {
    const cell = getCell(clientX, clientY);
    focusButton(cell);

    if (cell) {
      toggleCell(...cell);
      cellTrack.current = [cell];
    }
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (recentlyPerformedTouch) {
      return;
    }

    if (isMouseDown.current) {
      handleMove(clientX, clientY);
    }
  };

  const handleTouchMove = ({ changedTouches }: TouchEvent) => {
    const { clientX, clientY } = changedTouches.item(0);
    handleMove(clientX, clientY);
  };

  const handleMove = (clientX: number, clientY: number) => {
    const lastCell = cellTrack.current[cellTrack.current.length - 1];
    const cell = getCell(clientX, clientY);

    if (!cell) {
      return;
    }

    const fillers: Position[] = [];
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const { activeElement } = document;

    if ((e.key === 'Enter' || e.key === ' ') && activeElement.tagName === 'BUTTON') {
      const rect = activeElement.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      handleStart(x, y);
    }

    const moveCurrent = (shiftX: number, shiftY: number) => {
      const next: Position = [0, 0];

      if (current) {
        next[0] = (current[0] + shiftX + size) % size;
        next[1] = (current[1] + shiftY + size) % size;
      }

      focusButton(next);

      if (e.shiftKey) {
        toggleCell(...next);
      }
    };

    if (e.key === 'ArrowLeft') {
      moveCurrent(-1, 0);
    }

    if (e.key === 'ArrowRight') {
      moveCurrent(1, 0);
    }

    if (e.key === 'ArrowUp') {
      moveCurrent(0, -1);
    }

    if (e.key === 'ArrowDown') {
      moveCurrent(0, 1);
    }
  };

  useEffect(() => {
    if (!recentlyPerformedTouch) {
      return;
    }

    const timeout = setTimeout(() => {
      setRecentlyPerformedTouch(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [recentlyPerformedTouch]);

  useEffect(() => {
    buttonsRef.current = buttonsRef.current.slice(size * size);
  }, [size]);

  const focusButton = useCallback((pos: Position) => {
    const [x, y] = pos;
    buttonsRef.current[y * size + x].focus();
    setCurrent(pos);
  }, [size]);

  const handleMouseEnd = () => {
    const lastPosition = cellTrack.current[cellTrack.current.length - 1];
    if (lastPosition) {
      focusButton(lastPosition);
    }

    isMouseDown.current = false;
    cellTrack.current = [];
  };

  const handleTouchEnd = () => {
    cellTrack.current = [];
  };

  return (
    <div
      role="grid"
      aria-label="Grid toggles"
      tabIndex={0}
      className={`grid ${className}`}
      style={style}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseStart}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseEnd}
      onMouseLeave={handleMouseEnd}
      onKeyDown={handleKeyDown}
      ref={gridRef}
    >
      {createRange(size).map(y => (
        <div role="row" key={y} className="contents">
          {createRange(size).map(x => (
            <button
              key={x}
              ref={el => buttonsRef.current[y * size + x] = el}
              role="gridcell"
              aria-label={`(${x}, ${y})`}
              tabIndex={-1}
              className="bg-blue-300 opacity-0 hover:opacity-50 focus-visible:opacity-50 focus-visible:bg-blue-300"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SelectOverlay;
