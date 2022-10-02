import { useLife, useLifeSettings, useMouseState } from '../../hooks';

const useMarchedIdx = (x, y) => {
  const { getValue } = useLife();

  let s = 0;

  if (getValue(x, y)) {
    s += 8;
  }

  if (getValue(x + 1, y)) {
    s += 4;
  }

  if (getValue(x + 1, y + 1)) {
    s += 2;
  }

  if (getValue(x, y + 1)) {
    s += 1;
  }

  return s;
};

const MarchedSquare = ({ x, y }) => {
  const idx = useMarchedIdx(x, y);
  const { isMouseDown } = useMouseState();
  const { toggleCell } = useLife();
  const { settings: { size } } = useLifeSettings();

  const handleClick = () => toggleCell(x, y);

  const handleMouseOver = () => {
    if (isMouseDown) {
      handleClick();
    }
  };

  return (
    <div
      className={`relative group square-${(x === size - 1 || y === size - 1) ? '' : idx}`}
      style={{
        width: (x === size - 1) ? 0 : `calc(var(--size) * 4)`,
        height: (y === size - 1) ? 0 : `calc(var(--size) * 4)`
      }}
    >
      <div
        className="absolute aspect-square bg-sky-300 z-50 opacity-0 hover:opacity-50 -translate-x-[50%] -translate-y-[50%]"
        onMouseOver={handleMouseOver}
        onClick={handleClick}
        style={{ width: `calc(var(--size) * 4)` }}
      />
    </div>
  );
};

export default MarchedSquare;
