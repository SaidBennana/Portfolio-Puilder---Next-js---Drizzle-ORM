import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="w-24 fixed">
        <Sidebar />
      </div>
      <div className="ms-24">{children}</div>
    </div>
  );
}
