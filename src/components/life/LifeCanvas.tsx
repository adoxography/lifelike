import { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { useLife, useLifeSettings, useTailwind } from '@/hooks';

const createPoint = (x: number, y: number): [number, number] => [
  Math.round(x),
  Math.round(y)
];

const LifeCanvas = () => {
  const canvas = useRef<HTMLCanvasElement>();
  const [context, setContext] = useState<CanvasRenderingContext2D>(null);
  const { settings: { size, trail } } = useLifeSettings();
  const { state, isSimulating, getValue } = useLife();
  const tailwind = useTailwind();

  const getPath = (x: number, y: number, size: number, idx: number): [number, number][] => {
    switch (idx) {
      case 1:
        return [
          createPoint(x, y + size / 2),
          createPoint(x + size / 2, y + size),
          createPoint(x, y + size)
        ];
      case 2:
        return [
          createPoint(x + size, y + size / 2),
          createPoint(x + size, y + size),
          createPoint(x + size / 2, y + size)
        ];
      case 3:
        return [
          createPoint(x,        y + size / 2),
          createPoint(x + size, y + size / 2),
          createPoint(x + size, y + size),
          createPoint(x,        y + size)
        ];
      case 4:
        return [
          createPoint(x + size / 2, y),
          createPoint(x + size, y),
          createPoint(x + size, y + size / 2)
        ];
      case 5:
        return [
          createPoint(x + size / 2, y),
          createPoint(x + size,     y),
          createPoint(x + size,     y + size / 2),
          createPoint(x + size / 2, y + size),
          createPoint(x,            y + size),
          createPoint(x,            y + size / 2)
        ];
      case 6:
        return [
          createPoint(x + size / 2, y),
          createPoint(x + size,     y),
          createPoint(x + size,     y + size),
          createPoint(x + size / 2, y + size),
        ];
      case 7:
        return [
          createPoint(x + size / 2, y),
          createPoint(x + size,     y),
          createPoint(x + size,     y + size),
          createPoint(x,            y + size),
          createPoint(x,            y + size / 2)
        ];
      case 8:
        return [
          createPoint(x, y),
          createPoint(x + size / 2, y),
          createPoint(x, y + size / 2)
        ];
      case 9:
        return [
          createPoint(x,            y),
          createPoint(x + size / 2, y),
          createPoint(x + size / 2, y + size),
          createPoint(x,            y + size)
        ];
      case 10:
        return [
          createPoint(x,            y),
          createPoint(x + size / 2, y),
          createPoint(x + size,     y + size / 2),
          createPoint(x + size,     y + size),
          createPoint(x + size / 2, y + size),
          createPoint(x,            y + size / 2)
        ];
      case 11:
        return [
          createPoint(x,            y),
          createPoint(x + size / 2, y),
          createPoint(x + size,     y + size / 2),
          createPoint(x + size,     y + size),
          createPoint(x,            y + size)
        ];
      case 12:
        return [
          createPoint(x,        y),
          createPoint(x + size, y),
          createPoint(x + size, y + size / 2),
          createPoint(x,        y + size / 2)
        ];
      case 13:
        return [
          createPoint(x,            y),
          createPoint(x + size,     y),
          createPoint(x + size,     y + size / 2),
          createPoint(x + size / 2, y + size),
          createPoint(x,            y + size)
        ];
      case 14:
        return [
          createPoint(x,            y),
          createPoint(x + size,     y),
          createPoint(x + size,     y + size),
          createPoint(x + size / 2, y + size),
          createPoint(x,            y + size / 2)
        ];
      case 15:
        return [
          createPoint(x       , y       ),
          createPoint(x       , y + size),
          createPoint(x + size, y + size),
          createPoint(x + size, y       )
        ];
      default:
        return [];
    }
  };

  const getMarchedIdx = useCallback((x: number, y: number) => {
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
  }, [getValue]);

  const bgColor = useMemo(() => {
    const colors = tailwind.theme.colors;

    let bgColor = '#000000';
    let trailHex = 'ff';

    if (isSimulating) {
      trailHex = Math.floor(255 * (1 - trail)).toString(16).padStart(2, '0');
    }

    if (typeof colors === 'object') {
      bgColor = `${colors.slate?.[700]}${trailHex}`;
    }

    return bgColor;
  }, [tailwind, isSimulating, trail]);

  const fgColor = useMemo(() => {
    const colors = tailwind.theme.colors;
    let fgColor = '#ffffff';

    if (typeof colors === 'object') {
      fgColor = colors.slate?.[300];
    }

    return fgColor;
  }, [tailwind]);

  useEffect(() => {
    const context = canvas.current?.getContext('2d');
    context.translate(0.5, 0.5);
    setContext(context);
    canvas.current?.setAttribute('height', canvas.current?.width + "");
  }, []);

  const update = useCallback(() => {
    if (!context) {
      return;
    }

    // Clear canvas
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.current.width, canvas.current.height);

    context.fillStyle = fgColor;
    const cellSize = canvas.current.width / Math.max(size - 1, 1);

    for (let x = 0; x < size - 1; x++) {
      for (let y = 0; y < size - 1; y++) {
        const marchedIdx = getMarchedIdx(x, y);
        const path = getPath(x * cellSize, y * cellSize, cellSize, marchedIdx);

        if (path.length > 0) {
          const [firstPoint, ...nextPoints] = path;

          context.beginPath();
          context.moveTo(...firstPoint);
          nextPoints.forEach(point => {
            context.lineTo(...point);
          });
          context.closePath();
          context.fill();
        }
      }
    }
  }, [context, getMarchedIdx]);

  useEffect(update, [update]);

  return (
    <canvas className="w-full h-full" ref={canvas} />
  );
};

export default LifeCanvas;
