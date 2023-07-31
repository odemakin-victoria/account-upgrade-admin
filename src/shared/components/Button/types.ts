import { ReactNode } from "react";

export interface IButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: "primary" | "secondary" | "outline",
  leftIcon?: JSX.Element,
  isLoading?: boolean,

}