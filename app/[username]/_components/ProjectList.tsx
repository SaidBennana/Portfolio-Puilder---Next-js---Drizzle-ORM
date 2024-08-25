import { db } from "@/utils";
import { project, projectClick, userInfo } from "@/utils/schema";
import moment from "moment";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import ChartAnlatycs from "./ChartAnlatycs";
import { eq, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";

export default function ProjectList({ projectList }: { projectList: [] }) {
  const { user } = useUser();
  const [Analytics, setAnalytics] = useState<Array<any>>([]);
  // add click event to database to analyze project
  const onCLickProject = async (project: any) => {
    console.log("Project clicked");
    const result = await db.insert(projectClick).values({
      projectRef: project?.id,
      month: moment().format("MMM"),
    });
    window.open(project.url, "_block");
  };

  useEffect(() => {
    user && projectAnalatycs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  const projectAnalatycs = async () => {
    const result = await db
      .select({
        totalClicks: sql`count(${projectClick.id})`.mapWith(Number),
        month: projectClick.month,
        projectId: projectClick.projectRef,
      })
      .from(projectClick)
      .rightJoin(project, eq(projectClick.projectRef, project.id))
      .innerJoin(userInfo, eq(project.userRef, userInfo.id))
      .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress!))
      .groupBy(projectClick.projectRef, projectClick.month);

    console.log(result);
    setAnalytics(result);
  };

  const GetProjectWiseAnalytic = (id: any) => {
    const resp = Analytics.filter((pro) => pro.projectId == id);
    const result = [];
    result.push(resp[0]);
    return result;
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 md:p-10 gap-4">
      {projectList?.map((item: any, index) => {
        return (
          <div
            onClick={() => {
              onCLickProject(item);
            }}
            key={item?.id}
            className="cursor-pointer hover:scale-105 transition-all flex justify-center"
          >
            <div className="flex flex-col gap-2 border justify-center rounded-lg p-3">
              <div className="flex gap-2 justify-between items-center">
                <div className="flex items-center gap-2">
                  <Image
                    width={50}
                    height={50}
                    alt="project user"
                    src={process.env.NEXT_PUBLIC_IMAGE_URL + item?.logo}
                  />
                  <h1 className="md:text-xl font-medium md:mt-1">
                    {item?.name}
                  </h1>
                </div>
                <span className="badge badge-primary">{item?.category}</span>
              </div>
              <div>
                <p className="text-sm opacity-70 font-medium flex gap-1 items-center">
                  {item?.desc}
                </p>
              </div>
              <ChartAnlatycs data={GetProjectWiseAnalytic(item?.id)} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
