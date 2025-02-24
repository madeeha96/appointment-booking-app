import React from "react";
import { FunctionComponent, ReactElement, useState } from "react";
import { ISlot } from "@/types/ISlot";

import BasicModal from "@/components/modals/BasicModal";
import CTAButton from "../CTAButton";

/**
 * Properties for the slot confirmation modal component.
 */
interface ISlotConfirmationModalProps {
  /** The slot. */
  slot: ISlot;
  /** The action to update whether the modal is open or not. */
  updateIsOpen: (value: boolean) => void;
  /** The action to perform when clicking on confirm button. */
  onConfirm: (customerName: string) => void;
}

/**
 * Modal to confirm or cancel slot booking process.
 *
 * @param {IBookingModalProps} props The component properties.
 * @returns {ReactElement} The booking modal component.
 */
const SlotConfirmationModal: FunctionComponent<ISlotConfirmationModalProps> = (
  props
): ReactElement => {
  /** The costumer's first name. */
  const [firstName, setFirstName] = useState<string>("");
  /** The costumer's last name. */
  const [lastName, setLastName] = useState<string>("");

  /** Confirm button disabled if name is empty or undefined **/
  const confirmDisabled =
    firstName === "" ||
    firstName === undefined ||
    lastName === "" ||
    lastName === undefined;

  /** Method to cancel the booking process. **/
  const onCancel = () => {
    setFirstName("");
    setLastName("");
    props.updateIsOpen(false);
  };

  /** Method to confirm the booking process. **/
  const handleConfirm = () => {
    const fullName = `${firstName.trim()} ${lastName.trim()}`;
    props.onConfirm(fullName);
  };

  return (
    <BasicModal title="Confirm your slot">
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          <div className="flex flex-col gap-2">
            <label>First name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Last name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="my-1 font-semibold">Selected Slot:</p>
          <p>Date: {new Date(props.slot.startDate).toLocaleDateString()}</p>
          <p className="my-1">
            Time:{" "}
            {new Date(props.slot.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="my-1">Duration: 30 min.</p>
        </div>
        <div className="flex justify-end gap-3 pt-6">
          <CTAButton
            text="Cancel"
            onClick={onCancel}
            backgroundColor="bg-gray-100"
            textColor="text-primary"
          />
          <CTAButton
            text="Confirm"
            onClick={handleConfirm}
            disabled={confirmDisabled}
          />
        </div>
      </div>
    </BasicModal>
  );
};

export default SlotConfirmationModal;
