import React, { FunctionComponent, ReactElement } from "react";

/**
 * Properties for the card component.
 */
interface ICardProps {
  /** The children to render. */
  children: React.ReactNode;
  /** The class name to apply on the card. */
  className?: string;
  /** The minimum height of the card. */
  minHeight?: string;
}

/**
 * The card component.
 *
 * @param {ICardProps} props The component properties.
 * @returns {ReactElement} The card component.
 */
const Card: FunctionComponent<ICardProps> = (props): ReactElement => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg p-20 ${props.className} ${
        props.minHeight ?? "min-h-[650px]"
      }`}
    >
      {props.children}
    </div>
  );
};

export default Card;
