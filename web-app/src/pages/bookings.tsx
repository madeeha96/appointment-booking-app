import { NextPage } from "next";
import Head from "next/head";
import { useState, useMemo } from "react";

import useCancelBooking from "@/hooks/useCancelBooking";
import useFetchSlots from "@/hooks/useFetchSlots";

import BusySpinnerOverlay from "@/components/SpinnerOverLay";
import CTAButton from "@/components/CTAButton";
import Card from "@/components/Card";
import CancelSlotModal from "@/components/modals/CancelSlotModal";
import NotificationBar from "@/components/NotificationBar";

import { ISlot } from "@/types/ISlot";
import { IMessageState } from "@/types/IMessageState";

import { XCircleIcon } from "@heroicons/react/20/solid";

const Bookings: NextPage = () => {
  const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [messageState, setMessageState] = useState<IMessageState>({
    text: null,
    type: null,
  });

  const bookedSlots = useFetchSlots(undefined, true);
  const cancelBooking = useCancelBooking();

  const cancelSlot = async (slotId: string) => {
    try {
      await cancelBooking.mutateAsync(slotId);
      setIsCancelModalOpen(false);
      setMessageState({
        text: "Booking canceled successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Error canceling booking:", error);
      setMessageState({ text: "Error canceling booking.", type: "error" });
    }
  };

  const handleCloseMessage = () => setMessageState({ text: null, type: null });

  const isLoading = bookedSlots.isLoading || cancelBooking.isPending;

  // Todo: Move it into a separate component
  const slotList = useMemo(
    () =>
      bookedSlots.data?.map((slot) => (
        <div key={slot.id} className="grid grid-cols-4 gap-4 items-center">
          <p>{new Date(slot.startDate).toLocaleDateString()}</p>
          <p>
            {new Date(slot.startDate).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>{slot.bookedCustomerName}</p>
          <div className="justify-self-end">
            <CTAButton
              text="Cancel"
              icon={<XCircleIcon className="h-5 w-5 text-neutral-content" />}
              onClick={() => {
                setSelectedSlot(slot);
                setIsCancelModalOpen(true);
              }}
            />
          </div>
        </div>
      )),
    [bookedSlots.data]
  );

  return (
    <>
      <Head>
        <title>Manage Bookings</title>
        <meta
          name="description"
          content="View and manage your bookings here."
        />
      </Head>
      <div className="relative flex flex-1 justify-center items-center flex-col overflow-auto py-8 bg-neutral">
        <div className="w-full max-w-6xl">
          {isLoading && <BusySpinnerOverlay />}
          <Card>
            {bookedSlots.data?.length ? (
              <div className="p-10">
                <div className="grid grid-cols-4 gap-4 font-bold mb-4">
                  <p>Date</p>
                  <p>Time</p>
                  <p>Customer Name</p>
                  <p className="justify-self-end">Cancel Appointment</p>
                </div>
                <div className="grid gap-3">{slotList}</div>
              </div>
            ) : (
              <p>No booked slots available.</p>
            )}
          </Card>
          {isCancelModalOpen && selectedSlot && (
            <CancelSlotModal
              slot={selectedSlot}
              updateIsOpen={setIsCancelModalOpen}
              onConfirm={cancelSlot}
            />
          )}
        </div>
        <NotificationBar
          messageState={messageState}
          onClose={handleCloseMessage}
        />
      </div>
    </>
  );
};

export default Bookings;
