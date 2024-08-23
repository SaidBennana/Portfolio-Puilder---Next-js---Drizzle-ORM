"use client";
import { chackUser } from "@/lib/actions";
import { db } from "@/utils";
import { userInfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Page() {
  const { user } = useUser();
  const [user_name, setUser_name] = useState("");
  const [loading, setLoading] = useState(true);
  const route = useRouter();

  useEffect(() => {
    user &&
      chackUser(user.primaryEmailAddress?.emailAddress!, "/admin", "find").then(
        () => {
          setLoading(false);
        }
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function onCreateBtnClick() {
    setLoading(true);
    if (user_name.length > 10) {
      console.log(user_name);
      toast.error("No More than 10 char required to create", {
        position: "top-left",
      });
      return;
    }

    const result = await db.insert(userInfo).values({
      email: user?.primaryEmailAddress?.emailAddress!,
      name: user_name,
      usename: user_name.replace(" ", "").toLocaleLowerCase(),
    });
    if (result.rowCount > 0) {
      toast.success("Username created successfully", {
        position: "top-left",
      });
      route.replace("/admin");
    }
    setLoading(false);
  }
  return (
    <div className="flex h-screen items-center justify-center text-center">
      <div className="flex flex-col gap-4 items-center border border-gray-500 px-6 rounded-xl py-9">
        <h2 className="text-3xl">Create Portfolio Username</h2>
        <label htmlFor="">Add Username for your porfolio</label>
        <input
          onChange={(e) => {
            setUser_name(e.target.value);
          }}
          type="text"
          placeholder="username"
          className="input input-bordered w-full"
        />
        <button
          onClick={onCreateBtnClick}
          disabled={user_name?.length <= 4 || loading}
          className="btn btn-primary mt-4 w-full"
        >
          {loading && <span className="loading loading-spinner"></span>}
          Create
        </button>
      </div>
    </div>
  );
}
