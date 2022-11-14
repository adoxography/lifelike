import type { PropsWithChildren, LabelHTMLAttributes } from 'react';
import { WithTooltip } from '.';

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  tooltip: string;
  className?: string;
};

const Label = ({ tooltip, className = '', children, ...props } : PropsWithChildren<LabelProps>) => {
  return (
    <WithTooltip tooltip={tooltip}>
      <label className={`uppercase group text-slate-300 ${className}`} {...props}>
        {children}
      </label>
    </WithTooltip>
  );
};

export default Label;
