import React, { Children, ReactNode } from "react";
import Provider from "./provider";

export default function Userlayout({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <div >{children}</div>
    </Provider>
  );
}
