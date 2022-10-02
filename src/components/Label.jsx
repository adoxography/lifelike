import { WithTooltip } from '.';

const Label = ({ children, tooltip, className = '', ...props }) => {
  return (
    <WithTooltip tooltip={tooltip}>
      <label className={`uppercase group text-slate-300 ${className}`} {...props}>
        {children}
      </label>
    </WithTooltip>
  );
};

export default Label;
