import { project } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import ImageComponent from "./ImageComponent";
import { db } from "@/utils";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { toast } from "react-toastify";
import {
  Layers3,
  MapPin,
  Trash2,
  Image as ImageIcon,
  GripVertical,
  GripHorizontal,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

export default function ProjectList({
  projectList,
  refreshData,
}: {
  projectList: [];
  refreshData: () => void;
}) {
  const { user } = useUser();
  const [SelectOption, setSelectOption] = useState<any>();
  const [ProjectListData, setProjectListData] = useState([]);

  useEffect(() => {
    projectList && setProjectListData(projectList);
  }, [projectList]);

  //   update proect icone
  const ImageUploaded = async (imageName: string, field: string, id: any) => {
    console.log(`Uploading ${imageName}`);
    const result = await db
      .update(project)
      .set({
        [field]: imageName,
      })
      .where(eq(project.id, id));
    if (result) {
      refreshData();
      toast("Project logo updated successfully", {
        position: "top-left",
      });
    } else {
      toast("Failed to update project logo", {
        position: "top-left",
      });
    }
  };
  let timeOut: any;
  const onInputChanged = async (value: any, field: string, id: number) => {
    clearTimeout(timeOut);
    timeOut = setTimeout(async () => {
      const result = await db
        .update(project)
        .set({
          [field]: value,
        })
        .where(eq(project.id, id));

      if (result) {
        toast.success("Project details updated successfully", {
          position: "top-left",
        });
      } else {
        toast.error("Failed to update project details", {
          position: "top-left",
        });
      }
    }, 1000);
  };

  const onDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure to Delete This?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await db.delete(project).where(eq(project.id, id));
        if (result) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refreshData();
        } else {
          Swal.fire({
            title: "Failed!",
            text: "Failed to delete project.",
            icon: "error",
            showCancelButton: true,
            cancelButtonColor: "#d33",
          });
        }
      }
    });
  };

  const EndDrag = async (reslut: DropResult) => {
    if (!reslut) return;
    console.log(reslut.source.index);
    console.log(reslut.destination?.index);

    let newList = Array.from(ProjectListData);
    newList = newList.toSpliced(reslut.source.index, 1);
    newList = newList.toSpliced(
      reslut.destination?.index!,
      0,
      ProjectListData[reslut.source.index]
    );
    console.log(newList);
    setProjectListData(newList);

    const resutl1 = await db
      .update(project)
      .set({
        order: reslut.destination?.index,
      })
      .where(
        and(
          eq(project.order, reslut.source.index),
          eq(project.id, +reslut.draggableId)
        )
      );
  };
  return (
    <div>
      <DragDropContext onDragEnd={EndDrag}>
        <Droppable droppableId="projectList">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {ProjectListData.map((item: any, index) => {
                return (
                  <Draggable
                    key={item.id}
                    index={index}
                    draggableId={item.id.toString()}
                  >
                    {(provided) => (
                      <div
                        key={item.id}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mt-5 bg-gray-800 rounded-lg p-5"
                      >
                        <div className="flex gap-4">
                          <div {...provided.dragHandleProps}>
                            <GripHorizontal strokeWidth={1} />
                          </div>
                          <div className="w-full">
                            <div className="flex gap-4">
                              <ImageComponent
                                key={index.toString()}
                                ImagUpload={(value) =>
                                  ImageUploaded(value, "logo", item.id)
                                }
                                Src_Image={item.logo}
                              />
                              <input
                                onChange={(event) =>
                                  onInputChanged(
                                    event.target.value,
                                    "name",
                                    item.id
                                  )
                                }
                                defaultValue={item.name}
                                type="text"
                                placeholder="Projext Name"
                                className="input input-bordered w-full"
                              />
                            </div>
                            <div className="mt-3">
                              <textarea
                                onChange={(event) =>
                                  onInputChanged(
                                    event.target.value,
                                    "desc",
                                    item.id
                                  )
                                }
                                rows={5}
                                className="textarea textarea-bordered w-full"
                                placeholder="tell my about your project"
                              ></textarea>
                            </div>

                            {/* Button select */}
                            <div className="mt-3 flex gap-2 justify-between items-center">
                              <div className="flex">
                                <MapPin
                                  onClick={() => {
                                    setSelectOption("link" + index);
                                  }}
                                  strokeWidth={1}
                                  size={35}
                                  className={`hover:bg-gray-700 transition-all cursor-pointer rounded-lg p-1 text-blue-500 ${
                                    SelectOption == "Map" && "bg-gray-700 "
                                  }`}
                                />
                                <Layers3
                                  onClick={() => {
                                    setSelectOption("category" + index);
                                  }}
                                  strokeWidth={1}
                                  size={35}
                                  className={`hover:bg-gray-700 transition-all cursor-pointer rounded-lg p-1 text-yellow-500 ${
                                    SelectOption == "link" && "bg-gray-700 "
                                  }`}
                                />
                                <ImageIcon
                                  onClick={() => {
                                    setSelectOption("benner" + index);
                                  }}
                                  strokeWidth={1}
                                  size={35}
                                  className={`hover:bg-gray-700 transition-all cursor-pointer rounded-lg p-1 text-yellow-500 ${
                                    SelectOption == "link" && "bg-gray-700 "
                                  }`}
                                />
                              </div>
                              <div className="flex gap-3 items-center">
                                <button
                                  onClick={() => onDelete(item.id)}
                                  className="btn btn-error btn-sm"
                                >
                                  <Trash2 />
                                </button>
                                <input
                                  defaultChecked={item.active}
                                  onChange={(event) =>
                                    onInputChanged(
                                      event.target.checked,
                                      "active",
                                      item.id
                                    )
                                  }
                                  type="checkbox"
                                  className="toggle toggle-success"
                                />
                              </div>
                            </div>
                            {/*  */}
                            <div className="mt-3">
                              {SelectOption == "link" + index ? (
                                <label className="input input-bordered flex items-center gap-2">
                                  <MapPin
                                    strokeWidth={1}
                                    className=" text-blue-500"
                                  />
                                  <input
                                    defaultValue={item.url}
                                    onChange={(event) => {
                                      onInputChanged(
                                        event.target.value,
                                        "url",
                                        item.id
                                      );
                                    }}
                                    key={0}
                                    type="text"
                                    className="grow"
                                    placeholder="Your Location"
                                  />
                                </label>
                              ) : SelectOption == "category" + index ? (
                                <label className="input input-bordered flex items-center gap-2">
                                  <Layers3
                                    strokeWidth={1}
                                    className=" text-yellow-500"
                                  />
                                  <input
                                    defaultValue={item.category}
                                    key={1}
                                    onChange={(event) => {
                                      onInputChanged(
                                        event.target.value,
                                        "category",
                                        item.id
                                      );
                                    }}
                                    type="text"
                                    className="grow"
                                    placeholder="Category Name"
                                  />
                                </label>
                              ) : SelectOption == "benner" + index ? (
                                <div>
                                  <ImageComponent
                                    className="object-cover w-full h-36 overflow-hidden bg-gray-700 p-1"
                                    Src_Image={item.banner}
                                    ImagUpload={(value) =>
                                      ImageUploaded(value, "banner", item.id)
                                    }
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
