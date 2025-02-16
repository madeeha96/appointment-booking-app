import React, { ReactElement, ReactNode } from "react";
import Image from "next/image";
import NavigationBar from "@/components/navigationBar/navigationBarComponent";

/**
 * The properties for the basic layout component.
 */
interface IBasicLayoutProps {
  /** The children to render. */
  children: ReactNode;
}

export type { IBasicLayoutProps };

/**
 * Basic layout to wrap children.
 *
 * @param {IBasicLayoutProps} props The component properties.
 * @returns {ReactElement} The basic layout component.
 */
const BasicLayout = (props: IBasicLayoutProps): ReactElement => {
  return (
    <div className="flex max-h-screen flex-1 flex-col antialiased">
      <div className="h-16 p-2 flex items-center min-h-max border-b border-base-200 bg-base-100 shadow-sm">
        <div className="flex items-center gap-3">
          <Image src="/favicon.ico" alt="App Logo" width={32} height={32} />
          <h1 className="text-lg font-semibold">Booking Management App</h1>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <NavigationBar />
        {props.children}
      </div>
    </div>
  );
};

export default BasicLayout;
