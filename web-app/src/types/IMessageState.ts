/**
 * Interface for the message state.
 */
interface IMessageState {
  /** The message text. */
  text: string | null;

  /** The type of the message. */
  type: "success" | "error" | null;
}

export type { IMessageState };
