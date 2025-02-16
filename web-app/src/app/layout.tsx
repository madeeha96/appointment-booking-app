import Sidebar from "../components/Sidebar";
import Header from "../components/Header/Header";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">
        {/* Sidebar */}

        {/* Content Section */}
        <div className="flex flex-col flex-1">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <Sidebar />
          <main className="p-6 pt-20 flex-1 bg-white">{children}</main>
        </div>
      </body>
    </html>
  );
}
