import { NextPage } from "next";
import Head from "next/head";
import { useState, useMemo } from "react";

import BusySpinnerOverlay from "@/components/SpinnerOverLay";
import Card from "@/components/Card";
import ConfirmBooking from "@/components/ConfirmBooking";
import DatePicker from "@/components/DatePicker";
import NotificationBar from "@/components/NotificationBar";
import SlotConfirmationModal from "@/components/modals/SlotConfirmationModal";
import SlotButtonSection from "@/components/SlotCTA";
import useBookSlot from "@/hooks/useBookSlot";
import useCancelBooking from "@/hooks/useCancelBooking";
import useFetchSlots from "@/hooks/useFetchSlots";
import { IMessageState } from "@/types/IMessageState";
import { ISlot } from "@/types/ISlot";

const Home: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<ISlot | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [messageState, setMessageState] = useState<IMessageState>({
    text: null,
    type: null,
  });

  const formattedDate = useMemo(
    () => selectedDate.toISOString().split("T")[0],
    [selectedDate]
  );

  const slotsResult = useFetchSlots(formattedDate, false);
  const bookSlot = useBookSlot();
  const cancelBooking = useCancelBooking();

  const openBookingModal = (slot: ISlot) => {
    setSelectedSlot(slot);
    setIsBookingModalOpen(true);
  };

  const confirmBooking = async (fullName: string) => {
    if (!selectedSlot) return;

    const slotWithCustomerName = {
      ...selectedSlot,
      bookedCustomerName: fullName,
    };

    bookSlot.mutate(slotWithCustomerName, {
      onSuccess: () => {
        setBookingConfirmed(true);
        setSelectedSlot(slotWithCustomerName);
        setMessageState({
          text: "Booking confirmed successfully!",
          type: "success",
        });
        setTimeout(() => setIsBookingModalOpen(false), 2000);
      },
      onError: () => {
        setMessageState({ text: "Booking failed", type: "error" });
      },
    });
  };

  const onCancelBooking = async () => {
    if (!selectedSlot) return;

    await cancelBooking.mutateAsync(selectedSlot.id, {
      onSuccess: () => {
        setBookingConfirmed(false);
        setSelectedSlot(null);
        setMessageState({
          text: "Booking canceled successfully!",
          type: "success",
        });
      },
      onError: (error) => {
        console.error("Error canceling booking:", error);
        setMessageState({ text: "Error canceling booking", type: "error" });
      },
    });
  };

  const handleCloseMessage = () => setMessageState({ text: null, type: null });

  const isLoading =
    slotsResult.isLoading || bookSlot.isPending || cancelBooking.isPending;

  return (
    <>
      <Head>
        <title>Book Your Slot</title>
        <meta
          name="description"
          content="Book a slot for your appointment easily."
        />
      </Head>
      <div className="relative flex flex-1 flex-col justify-center items-center overflow-auto py-8 bg-neutral">
        <div className="w-full max-w-6xl">
          {isLoading && <BusySpinnerOverlay />}
          <Card>
            {bookingConfirmed && selectedSlot ? (
              <ConfirmBooking
                slot={selectedSlot}
                onCancelBooking={onCancelBooking}
              />
            ) : (
              <div className="flex flex-col gap-32 w-full">
                <DatePicker onChange={setSelectedDate} date={selectedDate} />
                <SlotButtonSection
                  slots={slotsResult.data || []}
                  onSlotClick={openBookingModal}
                />
                {isBookingModalOpen && selectedSlot && (
                  <SlotConfirmationModal
                    slot={selectedSlot}
                    updateIsOpen={setIsBookingModalOpen}
                    onConfirm={confirmBooking}
                  />
                )}
              </div>
            )}
          </Card>
        </div>
        <NotificationBar
          messageState={messageState}
          onClose={handleCloseMessage}
        />
      </div>
    </>
  );
};

export default Home;
