const getColorClasses = variant => {
  switch (variant) {
    case 'success':
      return 'bg-emerald-400 hover:bg-emerald-300 text-slate-900';
    case 'danger':
      return 'bg-rose-400 hover:bg-rose-300 text-slate-900';
    default:
      return 'bg-slate-600 hover:bg-slate-500';
  }
};

const Button = ({ children, className = '', variant, ...props }) => (
  <button className={`
      relative py-2 px-6 transition-colors rounded-sm uppercase box-shadow-sm shadow-highlight tracking-wide
      after:absolute after:top-0 after:left-0 after:w-full after:h-full
      after:bg-gradient-to-br after:from-transparent after:to-slate-900/40
      ${getColorClasses(variant)} ${className}
    `} {...props}>
    {children}
  </button>
);

export default Button;
