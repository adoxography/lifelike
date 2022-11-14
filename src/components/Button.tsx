import type { MouseEvent, PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { useState, useRef } from 'react';

const getColorClasses = (variant: string) => {
  switch (variant) {
  case 'success':
    return `
      from-emerald-800/60 to-emerald-400/60
      hover:bg-emerald-500 hover:shadow-emerald-300/50
      before:bg-emerald-50 before:shadow-emerald-50/30
      after:bg-emerald-50/60
    `;
  case 'danger':
    return `
      from-rose-800/60 to-rose-400/60
      hover:bg-rose-300 hover:shadow-rose-400
      before:bg-rose-50 before:shadow-rose-50/30
      after:bg-rose-50/60
    `;
  default:
    return `
      from-slate-800/60 to-slate-400/60
      hover:bg-slate-500 hover:shadow-slate-50/25
      before:bg-slate-50 before:shadow-slate-50/30
      after:bg-slate-50/20
    `;
  }
};

const getGlowClasses = (variant: string) => {
  switch (variant) {
  case 'success':
    return 'bg-emerald-100';
  case 'danger':
    return 'bg-rose-100';
  default:
    return 'bg-slate-100';
  }
};

type ButtonVariant = 'default' | 'success' | 'danger';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string,
  variant?: ButtonVariant
};

const Button = ({ children, className = '', variant = 'default', ...props }: PropsWithChildren<ButtonProps>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [mouseX, setMouseX] = useState<number>(-1);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    const width = ref.current.offsetWidth;
    setMouseX((e.nativeEvent.offsetX - width / 2) * 0.25);
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseOver={() => setIsMouseOver(true)}
      onMouseOut={() => setIsMouseOver(false)}
      className={`
        relative py-2 px-6 transition-all duration-1000 rounded-sm uppercase drop-shadow-sm tracking-wide hover:shadow-[0_0_10px_var(--tw-shadow-color)]
        focus-visible:outline-none focus-visible:ring-1 ring-sky-300/50 bg-opacity-80 overflow-hidden bg-gradient-to-b
        before:absolute before:left-px before:top-px before:right-px before:h-[45%] before:rounded-t-sm before:backdrop-blur before:shadow-sm before:opacity-20 before:mix-blend-soft-light before:-z-10
        after:absolute after:left-[4px] after:right-[4px] after:bottom-[4px] after:h-[10%] after:rounded-b-sm after:blur-[2px] after:mix-blend-soft-light after:opacity-20
        ${getColorClasses(variant)} ${className}
        group
      `}
      {...props}
    >
      <div
        className={`rounded-full absolute left-[50%] -bottom-[50%] w-24 h-8 blur-lg -z-100 opacity-30 ${getGlowClasses(variant)} group-hover:w-32 group-hover:h-12 group-hover:opacity-40 group-active:w-40 group-active:h-16 group-active:opacity-50 transition-all duration-300`}
        style={{ transform: `translateX(calc(-50% + ${isMouseOver ? mouseX : 0}px))` }}
      />
      <div className="absolute left-0 top-0 w-full h-full shadow-highlight-strong" />
      {children}
    </button>
  );
};

export default Button;
