import type {
  DragEvent,
  KeyboardEvent,
  TouchEvent as ReactTouchEvent,
  MouseEvent as ReactMouseEvent,
  HTMLAttributes
} from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { emptyFunction } from '@/utils';

type SliderProps = {
  min?: number;
  max?: number;
  value: number;
  onChange?: (value: number) => void;
  thumbProps?: HTMLAttributes<HTMLDivElement>
};

const Slider = ({ min = 0, max = 100, value, onChange, thumbProps = {} }: SliderProps) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  const changeValue = (newValue: number) => {
    onChange(Math.max(min, Math.min(max, newValue)));
  };

  const handleChange = (e: MouseEvent | ReactMouseEvent<HTMLDivElement> | DragEvent<HTMLDivElement>) => {
    doChange(e.clientX);
  };

  const doChange = (clientX: number) => {
    if (!containerRef.current || clientX === 0) {
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = offsetX / containerRef.current.offsetWidth;
    const newValue = min + (max - min) * percentage;

    thumbRef.current?.focus();
    changeValue(newValue);
  };
  
  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement> | ReactTouchEvent<HTMLDivElement>) => {
    if (e.type === 'mousedown') {
      e.preventDefault();
    }

    setIsMouseDown(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMouseDown) {
      handleChange(e);
    }
  }, [isMouseDown]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (isMouseDown) {
      const touch = e.touches.item(0);
      doChange(touch.clientX);
    }
  }, [isMouseDown]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const increment = (max - min) * 0.05;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      changeValue(value - increment);
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      changeValue(value + increment);
    }
  };

  const pos = useMemo<number>(() => {
    if (!containerRef.current) {
      return 0;
    }

    return (value - min) / max * containerRef.current.offsetWidth;
  }, [value, min, max, containerRef.current]);

  useEffect(() => {
    const handleMouseUp = () => {
      setIsMouseDown(false);
    };

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-10 mt-3 items-center"
    >
      <div
        role="button"
        tabIndex={-1}
        className="flex items-center w-full h-4 cursor-pointer"
        onClick={handleChange}
        onKeyDown={emptyFunction}
      >
        <div className="relative h-px bg-slate-900 w-full">
          <div
            className="absolute left-0 bg-sky-500/60 h-full duration-300"
            style={{ width: `calc(${pos}px - 0.5rem)`, transitionProperty: isMouseDown ? 'none' : 'all' }}
          />
        </div>
      </div>
      <div
        role="slider"
        ref={thumbRef}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        tabIndex={0}
        className="
          absolute w-4 h-4 rounded-sm cursor-pointer -translate-x-[50%] drop-shadow-sm
          bg-gradient-to-b from-sky-800/60 to-sky-400/60
          before:absolute before:left-px before:top-px before:right-px before:h-[45%] before:rounded-t-sm
          before:backdrop-blur before:shadow-sm before:opacity-20 before:mix-blend-soft-light before:bg-sky-50 before:shadow-sky-50/30
          after:absolute after:left-[2px] after:right-[2px] after:bottom-[2px] after:h-[10%] after:rounded-b-sm
          after:blur-[1px] after:mix-blend-soft-light after:opacity-20 after:bg-sky-50/60
          hover:bg-sky-500 hover:shadow-sky-300/50 duration-300 hover:shadow-[0_0_8px_var(--tw-shadow-color)]
          focus-visible:outline-none focus-visible:ring-1 ring-sky-300/50
        "
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onDrag={handleChange}
        onKeyDown={handleKeyDown}
        style={{ left: `${pos}px`, transitionProperty: isMouseDown ? 'box-shadow, background-color' : 'all' }}
        {...thumbProps}
      />
    </div>
  );
};

export default Slider;
