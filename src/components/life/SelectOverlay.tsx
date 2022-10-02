import { Fragment } from 'react';
import { useLife, useLifeSettings, useMouseState } from '@/hooks';
import { createRange } from '@/utils';

const SelectOverlay = ({ className = '' }) => {
  const { isMouseDown } = useMouseState();
  const { toggleCell } = useLife();
  const { settings: { size } } = useLifeSettings();

  const percent = 100 / (size - 1)
  const halfPercent = percent / 2;

  const style = {
    gridTemplateColumns: `repeat(${size}, ${percent}%)`,
    gridTemplateRows: `repeat(${size}, ${percent}%)`,
    transform: `translate(-${halfPercent}%, -${halfPercent}%)`
  };

  return (
    <div
      className={`grid ${className}`}
      style={style}
    >
      {createRange(size).map(y => (
        <Fragment key={y}>
          {createRange(size).map(x => (
            <button
              key={x}
              className="bg-blue-300 opacity-0 hover:opacity-50"
              onClick={() => toggleCell(x, y)}
              onMouseOver={() => isMouseDown && toggleCell(x, y)}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default SelectOverlay;
