import type { HTMLAttributes, PropsWithChildren } from 'react';
import { useTooltip } from '@/hooks';

type WithTooltipProps = HTMLAttributes<HTMLDivElement> & {
  tooltip: string;
};

const WithTooltip = ({ children, tooltip, ...props } : PropsWithChildren<WithTooltipProps>) => {
  const { show, hide } = useTooltip();

  const handleMouseOver = () => show(tooltip);
  const handleMouseOut = () => hide(tooltip);

  return (
    <div
      className="contents"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    >
      {children}
    </div>
  );
};

export default WithTooltip;
