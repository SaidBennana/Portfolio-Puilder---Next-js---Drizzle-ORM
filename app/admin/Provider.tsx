"use client";
import { db } from "@/utils";
import { userInfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { ReactNode, useEffect, useState } from "react";
import { UserDetailsContext } from "../_context/UserDetailsContext";

export default function Provider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [userDatiles, setUserDatiles] = useState<any>();
  useEffect(() => {
    user && GetUserDetalies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetUserDetalies = async () => {
    //API call to get user details
    const result = await db
      .select()
      .from(userInfo)
      .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress!));
    setUserDatiles([]);
    if (result) setUserDatiles(result);
  };
  return (
    <UserDetailsContext.Provider value={{ userDatiles, setUserDatiles }}>
      <div>{children}</div>;
    </UserDetailsContext.Provider>
  );
}
