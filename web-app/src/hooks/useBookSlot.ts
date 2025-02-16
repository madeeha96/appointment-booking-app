import { ISlot } from '@/types/ISlot';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Method to book a slot by sending a POST request to the API.
 *
 * @param {ISlot} booking The booking information.
 * @returns {Promise} A Promise resolving to the API response.
 */
const bookSlot = async (slot: ISlot): Promise<void> => {
    const response = await fetch(`/api/slots/${slot.id}/book`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: slot.bookedCustomerName }),
    });

    if (!response.ok) {
        throw new Error('Failed to book the slot');
    }

    return response.json();
};

const useBookSlot = () => {
      // Get the query client from the context
    const queryClient = useQueryClient();

    return useMutation<void, Error, ISlot>({
        mutationFn: (slot: ISlot) => bookSlot(slot),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['slots'] });
        },
    });
};

export default useBookSlot;
