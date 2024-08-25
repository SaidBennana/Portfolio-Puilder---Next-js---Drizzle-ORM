"use client";
import React, { useContext } from "react";
import ProjectList from "./_components/ProjectList";
import UserDetalis from "./_components/UserDetalis";
import { UserDetailsContext } from "../_context/UserDetailsContext";

export default function UserPage() {
  const { userDatiles } = useContext(UserDetailsContext);
  return (
    <div  className="md:h-screen grid gap-4 grid-cols-1 md:grid-cols-3 p-2">
      <div>
        <UserDetalis userDatiles={userDatiles} />
      </div>
      <div className="col-span-2">
        <ProjectList projectList={userDatiles?.project}/>
      </div>
    </div>
  );
}
