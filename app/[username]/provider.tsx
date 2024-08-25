"use client";
import { db } from "@/utils";
import { userInfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import React, { ReactNode, useContext, useEffect } from "react";
import { UserDetailsContext } from "../_context/UserDetailsContext";

export default function Provider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const { userDatiles, setUserDatiles } = useContext(UserDetailsContext);
  useEffect(() => {
    user && GetUserDetalis();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetUserDetalis = async () => {
    const result = await db.query.userInfo.findMany({
      with: {
        project: true,
      },
      where: eq(userInfo.email, user?.primaryEmailAddress?.emailAddress!),
    });
    setUserDatiles(result[0]);
    console.log(userDatiles);
  };
  return <div data-theme={userDatiles?.theme}>
    {children}</div>;
}
