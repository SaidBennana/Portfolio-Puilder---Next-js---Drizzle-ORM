"use client";
import React, { ReactNode, useState } from "react";
import { PrevewMobileContext } from "./_context/PreviewContextMobile";

export default function Provider({ children }: { children: ReactNode }) {
  const [updatePrevewMobile, setUpdatePrevewMobile] = useState(0);
  return (
    <PrevewMobileContext.Provider
      value={{ updatePrevewMobile, setUpdatePrevewMobile }}
    >
      <div>{children}</div>
    </PrevewMobileContext.Provider>
  );
}
