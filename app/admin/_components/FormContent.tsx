import React, { useEffect, useState } from "react";
import BasicDetilas from "./BasicDetilas";
import AddProject from "./AddProject";
import { db } from "@/utils";
import { project } from "@/utils/schema";
import { asc, desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import ProjectList from "./ProjectList";

export default function FormContent() {
  const { user } = useUser();
  const [ProjectsList, setProjectsList] = useState<any>([]);

  // Get user projects when user is logged in. This will be used to pre-fill the form with user's projects.
  useEffect(() => {
    user && GetProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const GetProjects = async () => {
    const result = await db
      .select()
      .from(project)
      .where(eq(project.email, user?.primaryEmailAddress?.emailAddress!))
      .orderBy(asc(project.order));
    if (result) {
      setProjectsList(result);
    }
  };
  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold">Start Desiging your portfolio page</h2>
      <BasicDetilas />
      <span className="divider" />
      <AddProject CompleteAdd={GetProjects} />
      <ProjectList refreshData={GetProjects} projectList={ProjectsList} />
    </div>
  );
}
