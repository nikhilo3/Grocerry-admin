/**
 * Reusable Button component
 */
import React from "react";
import { twMerge } from "tailwind-merge";

const classes = {
  default: "rounded-xl px-4 py-3 font-medium",
  variants: {
    primary: "bg-primary-500 text-white",
    "primary-outline":
      "border border-primary-200 bg-primary-100 text-primary-500",
    green: "border border-secondary-100 bg-secondary-50 text-secondary-600",
    error: "text-error-300 bg-error-100 border border-error-50",

    "error-outline": "text-error-300  border border-error-300 bg-white",

    "primary/100": "bg-primary-100 border border-primary-200 text-primary-500",
    "primary-ghost": "text-primary-500 bg-transparent",
  },
} as const;

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof classes.variants;
};

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", ...props }) => {
    return (
      <button
        className={twMerge(
          classes.default,
          classes.variants[variant],
          className
        )}
        {...props}
      >
        {props.children}
      </button>
    );
  }
);

export default Button;
