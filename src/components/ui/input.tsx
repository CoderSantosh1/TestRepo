import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Additional classes to apply to the input */
  className?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={`
          appearance-none
          w-full
          px-3
          py-2
          border
          border-gray-300
          dark:border-gray-700
          rounded-md
          text-gray-900
          dark:text-white
          placeholder-gray-500
          bg-white
          dark:bg-gray-800
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-blue-500
          disabled:cursor-not-allowed
          disabled:opacity-50
          transition-colors
          duration-200
          ${className}
        `}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };