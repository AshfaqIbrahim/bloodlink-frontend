import React from "react";

const Button = ({
  children,
  variant = "primary",
  size = "default",
  className = "",
  ...props
}) => {
  const base =
    "rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2";

  const variants = {
    primary:
      "bg-[#7A2F2F] text-white hover:bg-[#631f1f] shadow-sm hover:shadow-md active:scale-[0.98]",
    secondary:
      "bg-white text-[#1C2321] border border-[#8C8579]/30 hover:border-[#8C8579]/60 hover:bg-[#F6F3EC]/50 active:scale-[0.98]",
    outline:
      "bg-transparent text-[#1C2321] border border-[#8C8579]/30 hover:border-[#8C8579]/60 hover:bg-[#F6F3EC]/30 active:scale-[0.98]",
    ghost:
      "bg-[#7A2F2F]/10 text-[#7A2F2F] hover:bg-[#7A2F2F]/20 active:scale-[0.98]",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    default: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
