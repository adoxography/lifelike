import { useTooltip } from '../hooks';

const WithTooltip = ({ children, tooltip, ...props }) => {
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
