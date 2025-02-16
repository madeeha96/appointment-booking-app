import React from "react";
import { FunctionComponent, ReactElement } from "react";

/**
 * Properties for the styled button component
 */
interface IStyledButtonProps {
  /** The text to display. */
  text?: string;
  /** The icon to display. */
  icon?: ReactElement;
  /** The action to execute on click. */
  onClick?: () => void;
  /** The background color of the button. */
  backgroundColor?: string;
  /** The text color of the button. */
  textColor?: string;
  /** Indicated whether the button is disabled. */
  disabled?: boolean;
}

export type { IStyledButtonProps };

/**
 * The styled button.
 *
 * @param {IStyledButtonProps} props The component properties.
 * @returns {ReactElement} The styled button component.
 */
const StyledButton: FunctionComponent<IStyledButtonProps> = (
  props
): ReactElement => {
  return (
    <button
      className={`flex items-center font-semibold justify-center p-3 rounded-md min-w-24 ${
        props.disabled ? "bg-disabled" : props.backgroundColor ?? "bg-primary"
      } ${props.textColor ?? " text-neutral-content"}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <span className="flex justify-center items-center gap-2">
        {props.icon} {props.text}
      </span>
    </button>
  );
};

export default StyledButton;
