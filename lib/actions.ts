"use server";
import { db } from "@/utils";
import { userInfo } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const chackUser = async (
  emailUser: string,
  pathRedirect: string,
  mode: "find" | "not Found" = "not Found"
) => {
  const result = await db
    .select()
    .from(userInfo)
    .where(eq(userInfo.email, emailUser));

  if (mode == "not Found") {
    if (result?.length == 0) {
      redirect(pathRedirect);
    }
  }
  if (mode == "find") {
    if (result?.length > 0) {
      redirect(pathRedirect);
    }
  }
};

export { chackUser };
