import { useEffect, useRef, useState } from 'react';
import { useLifeSettings } from '@/hooks';
import { Card } from '..';
import LifeCanvas from './LifeCanvas';
import SelectOverlay from './SelectOverlay';

const LifeBoard = ({ className = '', ...props }) => {
  const { settings: { size } } = useLifeSettings();
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    const handleResize = () => setWidth(ref.current?.scrollWidth);

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const style = {
    '--size': `${width / (size - 1) / 4 }px`,
    gridTemplateColumns: `repeat(${size}, max-content)`
  };

  return (
    <Card className={`select-none ${className}`} {...props}>
      <div
        className="md:w-[248px] lg:w-[496px] aspect-square shadow-inner relative"
        style={style}
        ref={ref}
      >
        <SelectOverlay className="absolute top-0 left-0 w-full h-full z-10" />
        <LifeCanvas />
      </div>
    </Card>
  );
};

export default LifeBoard;
