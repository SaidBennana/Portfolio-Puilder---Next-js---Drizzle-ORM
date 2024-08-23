import React, { ReactNode } from "react";
import Sidebar from "./_components/Sidebar";
import Provider from "./Provider";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div className="w-24 fixed">
        <Sidebar />
      </div>
      <div className="ms-24">
        <Provider>{children}</Provider>
      </div>
    </div>
  );
}
