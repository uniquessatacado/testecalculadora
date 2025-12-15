import React from 'react';
import { ButtonVariant } from '../types';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: ButtonVariant;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = ButtonVariant.NUMBER, className = '' }) => {
  const getBaseStyles = () => {
    return "h-16 w-full rounded-lg text-2xl font-semibold transition-all duration-200 active:scale-95 shadow-sm flex items-center justify-center outline-none focus:ring-2 focus:ring-opacity-50";
  };

  const getVariantStyles = () => {
    switch (variant) {
      case ButtonVariant.OPERATOR:
        return "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400";
      case ButtonVariant.ACTION:
        return "bg-gray-400 hover:bg-gray-500 text-gray-900 dark:bg-gray-600 dark:text-white focus:ring-gray-400";
      case ButtonVariant.EQUALS:
        return "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500";
      case ButtonVariant.NUMBER:
      default:
        return "bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white focus:ring-gray-400";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${getBaseStyles()} ${getVariantStyles()} ${className}`}
      type="button"
      aria-label={label}
    >
      {label}
    </button>
  );
};

export default Button;