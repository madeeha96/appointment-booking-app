import React, { FunctionComponent, ReactElement } from "react";
import { ISlot } from "@/types/ISlot";
import StyledButton from "./CTAButton";

/**
 * Properties for customer booking component.
 */
interface IConfirmBookingProps {
  /** The booked slot to display. */
  slot: ISlot;
  /** The action to cancel a booking. */
  onCancelBooking: () => void;
}

export type { IConfirmBookingProps };

/**
 * Component to display a booking for a customer.
 *
 * @param {IConfirmBookingProps} props The component properties.
 * @returns {ReactElement} The customer booking.
 */
const ConfirmBooking: FunctionComponent<IConfirmBookingProps> = (
  props
): ReactElement => {
  return (
    <div className="flex justify-center">
      <div>
        <h2 className="font-semibold">Booking Confirmation</h2>
        <h3 className="mb-4">{`Hello ${props.slot.bookedCustomerName}!`}</h3>
        <div className="flex flex-col gap-2">
          <p className="font-semibold">Your booked slot:</p>
          <p>{`Date: ${new Date(
            props.slot.startDate
          ).toLocaleDateString()}`}</p>
          <p>{`Time: ${new Date(props.slot.startDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`}</p>
          <p>Duration: 30 min.</p>
        </div>
        <div className="flex gap-4 my-10">
          <StyledButton
            text="Cancel Booking"
            onClick={props.onCancelBooking}
            backgroundColor="bg-gray-100"
            textColor="text-primary"
          />
          <StyledButton text="Join Your Call" />
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
