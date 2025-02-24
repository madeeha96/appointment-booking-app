import React, { FunctionComponent, ReactElement } from "react";

import { ISlot } from "@/types/ISlot";
import CTAButton from "./CTAButton";

/**
 * Properties for the slot button section component.
 */
interface ISlotCTAButtonProps {
  /** The slots to display. */
  slots: ISlot[];
  /** The action to perform when clicking on a slot. */
  onSlotClick: (slot: ISlot) => void;
}

/**
 * The slot button section.
 *
 * @param {ISlotButtonSectionProps} props The component properties.
 * @returns {ReactElement} The slot button section component.
 */
const SlotCTAButton: FunctionComponent<ISlotCTAButtonProps> = (
  props
): ReactElement => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="font-semibold">Pick a slot</h3>
      <div className="flex gap-3 flex-wrap">
        {props.slots.length > 0 ? (
          props.slots.map((slot) => (
            <CTAButton
              key={slot.id}
              text={new Date(slot.startDate).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              onClick={() => props.onSlotClick(slot)}
            />
          ))
        ) : (
          <p className="text-gray-500">No slots available for this date</p>
        )}
      </div>
    </div>
  );
};

export default SlotCTAButton;
