import { useMouseState } from '../hooks';

const Tooltip = ({ message, open }) => {
  const { mouseX, mouseY } = useMouseState();

  return (
    <div
      className={`absolute pointer-events-none bg-slate-300 text-slate-900 py-2 px-4 rounded-sm shadow-lg opacity-90 max-w-sm ${open ? 'block' : 'hidden'}`}
      style={{ top: `calc(${mouseY} + 1rem)`, left: mouseX }}
    >
      <p>
        {message}
      </p>
    </div>
  );
};

export default Tooltip;
