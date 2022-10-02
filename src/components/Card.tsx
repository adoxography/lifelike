const Card = ({ children, className = '', ...props }) => (
  <div className={`bg-gradient-to-br from-slate-700 to-slate-800 p-4 rounded drop-shadow-lg shadow-highlight h-fit ${className}`} {...props}>
    {children}
  </div>
);

export default Card;
