/**
 * Represents a single slot.
 */
interface ISlot {
  /** The unique identifier of the slot. */
  id: string;
  /** The start date of the slot. */
  startDate: Date | string;
  /** Whether the slot is booked. */
  isBooked: boolean;
  /** The name of the customer who booked the slot. */
  bookedCustomerName?: string;
}

export type { ISlot };
