import { PrevewMobileContext } from "@/app/_context/PreviewContextMobile";
import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { db } from "@/utils";
import { project } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";

export default function AddProject({
  CompleteAdd,
}: {
  CompleteAdd?: () => void;
}) {
  const { user } = useUser();
  const { userDatiles, setUserDatiles } = useContext(UserDetailsContext);
  const { updatePrevewMobile, setUpdatePrevewMobile } =
    useContext(PrevewMobileContext);

  const [openUrlInput, setOpenUrlInput] = useState(false);

  /**
   * Handles the submission of a new project URL.
   */
  const handelSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dataForm = new FormData(event.target as HTMLFormElement);
    console.log(dataForm.get("url"));

    const reslut = await db.insert(project).values({
      url: dataForm?.get("url") as string,
      email: user?.primaryEmailAddress?.emailAddress,
      userRef: userDatiles && userDatiles?.id,
    });
    if (reslut) {
      toast.success("Project added successfully", {
        position: "top-left",
      });
      setUpdatePrevewMobile(updatePrevewMobile + 1);

      CompleteAdd && CompleteAdd();
    } else {
      toast.error("Failed to add project", {
        position: "top-left",
      });
    }
  };

  return (
    <div>
      {openUrlInput ? (
        <form
          onSubmit={handelSubmit}
          className="mt-3 space-y-3 bg-gray-800 rounded-lg p-2"
        >
          <input
            type="url"
            name="url"
            required
            defaultValue={"https://"}
            placeholder="Project Url"
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-secondary w-full">
            + Add Project
          </button>
        </form>
      ) : (
        <button
          onClick={() => setOpenUrlInput(true)}
          className="btn btn-secondary w-full"
        >
          + Add Project
        </button>
      )}
    </div>
  );
}
