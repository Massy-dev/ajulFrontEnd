import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { type ReactNode } from "react";

type Props = {
  role: string;
  username: string;
  children: ReactNode;
};

export default function DashboardLayout({
  role,
  username,
  children,
}: Props) {
  return (
    <div className="flex">
      <Sidebar role={role} />

      <div className="flex-1 flex flex-col">
        <Header role={role} username={username} />

        <main className="p-6 bg-gray-100 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
