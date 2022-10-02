import type { CSSProperties } from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLifeSettings } from '../../hooks';
import { Card } from '..';
import MarchedSquare from './MarchedSquare';
import { createRange } from '../../utils';

const LifeBoard = ({ className = '', ...props }) => {
  const { settings: { size } } = useLifeSettings();
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>();

  const range = useMemo<number[]>(() => createRange(size), [size]);

  useEffect(() => {
    const handleResize = () => setWidth(ref.current?.scrollWidth);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const style = {
    '--size': `${width / (size - 1) / 4 }px`,
    gridTemplateColumns: `repeat(${size}, max-content)`
  } as CSSProperties;

  return (
    <Card className={`select-none ${className}`} {...props}>
      <div
        className="md:w-[248px] lg:w-[496px] aspect-square shadow-inner"
        style={style}
        ref={ref}
      >
        {range.map(y => (
          <div key={y} className="flex">
            {range.map(x => (
              <MarchedSquare
                key={x}
                x={x}
                y={y}
              />
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default LifeBoard;
