"use client";
import { chackUser } from "@/lib/actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import FormContent from "./_components/FormContent";
import PreviewMobile from "./_components/PreviewMobile";
export default function Page() {
  const { user } = useUser();
  const route = useRouter();

  useEffect(() => {
    user && chackUser(user.primaryEmailAddress?.emailAddress!, "/create");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 p-5">
      <div className="col-span-2">
        <FormContent />
      </div>
      <div>
        <PreviewMobile />
      </div>
    </div>
  );
}
