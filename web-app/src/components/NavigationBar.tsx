import React from "react";
import { IRoute } from "@/types/IRoute";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, ReactElement } from "react";
import { CalendarDaysIcon, UserCircleIcon } from "@heroicons/react/20/solid";

/**
 * Navigation bar placed on the side of the screen.
 *
 * @returns {ReactElement} The navigation bar component.
 */
const NavigationBar: FunctionComponent = (): ReactElement => {
  /** Access to the router. */
  const router = useRouter();

  /** The accessible routes for this application. */
  const routes: IRoute[] = [
    {
      path: "/",
      label: "Book Appointment",
      icon: <CalendarDaysIcon className="h-4 w-4 text-neutral-content" />,
    },
    {
      path: "/bookings",
      label: "Bookings",
      icon: <UserCircleIcon className="h-4 w-4 text-neutral-content" />,
    },
  ];

  return (
    <div className="flex flex-col border-r border-base-200 bg-primary">
      <div className="flex flex-col py-10">
        {routes.map((r) => (
          <Link key={r.path} href={r.path} tabIndex={-1}>
            <button className="p-4 relative flex w-full items-center justify-start gap-4 text-sm text-neutral-content hover:bg-primary-hover">
              {router.asPath === r.path && (
                <div className="absolute left-1 top-1/2 h-3/5 -translate-y-1/2 border-r border-secondary" />
              )}
              {r.icon}
              {r.label}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default NavigationBar;
