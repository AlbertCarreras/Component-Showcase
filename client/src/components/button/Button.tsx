import { forwardRef } from "react";
import "./Button.css";

export type ButtonProps = {
  /** Text to render inside the button. */
  text: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { text, disabled = false, type = "button", onClick },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className="button"
      onClick={onClick}
    >
      <span className="button__text">{text}</span>
    </button>
  );
});

Button.displayName = "Button";

export default Button;
