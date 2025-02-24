import React from "react";
import { FunctionComponent, ReactElement } from "react";
import BasicModal from "@/components/modals/BasicModal";
import CTAButton from "../CTAButton";

import { ISlot } from "@/types/ISlot";

/**
 * Properties for the slot cancelation modal component.
 */
interface ICancelSlotModalProps {
  /** The slot. */
  slot: ISlot;
  /** The action to update whether the modal is open or not. */
  updateIsOpen: (value: boolean) => void;
  /** The action to perform when clicking on confirm button. */
  onConfirm: (slotId: string) => void;
}

/**
 * Modal to cancel the booked slot.
 *
 * @param {ICancelSlotModalProps} props The component properties.
 * @returns {ReactElement} The cancel slot modal component.
 */
const CancelSlotModal: FunctionComponent<ICancelSlotModalProps> = (
  props
): ReactElement => {
  return (
    <BasicModal title="Cancel the booked slot">
      <p className="my-4 font-semibold">
        Are you sure you want to cancel the booked slot?
      </p>
      <div className="flex flex-col gap-1">
        <p>Name: {props.slot.bookedCustomerName}</p>
        <p>Date: {new Date(props.slot.startDate).toLocaleDateString()}</p>
        <p>
          Time:{" "}
          {new Date(props.slot.startDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>Duration: 30 min.</p>
      </div>
      <div className="flex justify-end gap-3 pt-6">
        <CTAButton
          text="Go back"
          onClick={() => props.updateIsOpen(false)}
          backgroundColor="bg-gray-100"
          textColor="text-primary"
        />
        <CTAButton
          text="Cancel slot"
          onClick={() => props.onConfirm(props.slot.id)}
        />
      </div>
    </BasicModal>
  );
};

export default CancelSlotModal;
