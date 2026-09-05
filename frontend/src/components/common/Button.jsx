import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | danger | ghost
  size = 'md', // sm | md | lg
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  className = '',
  icon: Icon = null,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2 min-h-[44px]', // 44px touch target for mobile
    lg: 'px-6 py-3.5 text-base gap-2.5 min-h-[52px]', // Farmer friendly large touch target
  };

  const variantStyles = {
    primary: 'bg-agri-600 text-white hover:bg-agri-700 shadow-sm focus:ring-agri-500 border border-transparent',
    secondary: 'bg-emerald-100 text-agri-900 hover:bg-emerald-200 focus:ring-emerald-400 border border-emerald-200',
    outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400',
    danger: 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500 border border-transparent shadow-sm',
    ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-300',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      ) : Icon ? (
        <Icon className="w-4 h-4 flex-shrink-0" />
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
