import { ISlot } from "@/types/ISlot";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { apiUrl } from "@/utils/constants";

/**
 * Fetches slots from the API based on query parameters.
 *
 * @param {string} date The date to fetch slots for.
 * @param {boolean} isBooked Whether to filter for booked slots.
 * @param {string} bookedCustomerName The name of the customer for booked slots.
 * @returns {Promise} A UseQueryResult containing the fetched slots.
 */

const fetchSlots = async (
  date?: string,
  isBooked?: boolean,
  bookedCustomerName?: string
): Promise<ISlot[]> => {
  // Build the query string with the parameters
  const queryParams = new URLSearchParams();
  if (date) queryParams.append("date", date);
  if (isBooked !== undefined)
    queryParams.append("isBooked", isBooked.toString());
  if (bookedCustomerName)
    queryParams.append("bookedCustomerName", bookedCustomerName);
  const response = await fetch(`${apiUrl}/slots?${queryParams.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch slots");
  }
  const result = await response.json();
  if (result.success) {
    return result.data as ISlot[];
  } else {
    throw new Error("Failed to fetch slots");
  }
};

const useFetchSlots = (
  date?: string,
  isBooked?: boolean,
  bookedCustomerName?: string
): UseQueryResult<ISlot[], Error> => {
  return useQuery<ISlot[], Error>({
    queryKey: ["slots", date, isBooked, bookedCustomerName],
    queryFn: () => fetchSlots(date, isBooked, bookedCustomerName),
  });
};

export default useFetchSlots;
