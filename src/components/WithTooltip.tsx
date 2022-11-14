import type { HTMLAttributes, PropsWithChildren } from 'react';
import { useTooltip } from '@/hooks';

type WithTooltipProps = HTMLAttributes<HTMLDivElement> & {
  tooltip: string;
};

const WithTooltip = ({ children, tooltip, ...props } : PropsWithChildren<WithTooltipProps>) => {
  const { show, hide } = useTooltip();

  const handleShow = () => show(tooltip);
  const handleHide = () => hide(tooltip);

  return (
    <div
      className="contents"
      onMouseOver={handleShow}
      onFocus={handleShow}
      onMouseOut={handleHide}
      onBlur={handleHide}
      {...props}
    >
      {children}
    </div>
  );
};

export default WithTooltip;
