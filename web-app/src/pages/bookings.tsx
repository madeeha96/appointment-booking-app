import { Inter } from "next/font/google";
import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

/**
 * The page component to render at "/bookings".
 *
 * @returns {NextPage} The bookings page component.
 */
const Bookings: NextPage = () => {
  return <>Manage Bookings</>;
};

export default Bookings;
