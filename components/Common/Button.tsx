import { combineStrings } from "../../utils/helpers/string";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  colorTheme?: "blue" | "red";
  type?: "submit" | "reset" | "button";
  variant?: ButtonVariant;
  disabled?: boolean;
  customClassName?: string;
  size?: "sm" | "md" | "lg";
}

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
}

const COMMON =
  "px-4 py-1.5 text-sm font-medium rounded-3xl transition duration-200 flex items-center justify-center gap-3";
const DISABLED_STATE = "grayscale cursor-not-allowed";
const VARIANTS = {
  [ButtonVariant.PRIMARY]: {
    blue: "bg-theme-blue text-white hover:brightness-110",
    red: "bg-theme-red text-white hover:brightness-110",
  },
  [ButtonVariant.SECONDARY]: {
    blue: "border border-theme-blue text-theme-blue hover:bg-theme-blue-50",
    red: "border border-theme-red text-theme-red hover:bg-theme-red-50",
  },
  [ButtonVariant.DANGER]: {
    blue: "bg-theme-blue text-white hover:bg-theme-red-light",
    red: "bg-theme-red text-white hover:bg-theme-red-light",
  },
};

const SIZES = {
  sm: "text-xs py-1",
  md: "text-sm py-1.5",
  lg: "text-base font-bold w-full",
};

export default function Button({
  children,
  onClick,
  customClassName,
  colorTheme = "blue",
  type = "button",
  variant = ButtonVariant.PRIMARY,
  disabled = false,
  size = "md",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={combineStrings(
        COMMON,
        VARIANTS[variant][colorTheme],
        SIZES[size],
        disabled && DISABLED_STATE,
        customClassName
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
