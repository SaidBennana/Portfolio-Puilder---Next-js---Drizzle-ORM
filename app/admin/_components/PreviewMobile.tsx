"user client";
import { PrevewMobileContext } from "@/app/_context/PreviewContextMobile";
import React, { useContext } from "react";

export default function PreviewMobile() {
  const { updatePrevewMobile, setUpdatePrevewMobile } =
    useContext(PrevewMobileContext);
  return (
    <div className="flex justify-center items-center h-screen fixed min-w-[400px]">
      <div className="h-[90%] w-full border-black border-[15px] rounded-3xl shadow shadow-purple-600">
        <iframe
          key={updatePrevewMobile}
          width="100%"
          height="100%"
          title="Protfolio"
          src={process.env.NEXT_PUBLIC_BASE_URL + "said"}
        />
      </div>
    </div>
  );
}
