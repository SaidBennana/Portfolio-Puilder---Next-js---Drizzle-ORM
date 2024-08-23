import { UserDetailsContext } from "@/app/_context/UserDetailsContext";
import { db } from "@/utils";
import { storage } from "@/utils/firebaseConfig";
import { userInfo } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ref, uploadBytes } from "firebase/storage";
import { Camera, Link2, MapPin } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL_IMAGE =
  "https://firebasestorage.googleapis.com/v0/b/portfolio-developer-cb97c.appspot.com/o/";
export default function BasicDetilas() {
  const { user } = useUser();
  const { userDatiles, setUserDatiles } = useContext(UserDetailsContext);
  const [SelectOption, setSelectOption] = useState<"Map" | "link">();
  const [ProfileImage, setProfileImage] = useState<string>();

  useEffect(() => {
    userDatiles && setProfileImage(userDatiles[0].profileImageUrl);
  }, [userDatiles]);
  // onChange is called to update the user dataset
  let TimeOut: any | undefined;
  const onInputChanged = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    TimeOut && clearTimeout(TimeOut!);
    TimeOut = setTimeout(async () => {
      console.log(event.target.value);

      const result = await db
        .update(userInfo)
        .set({
          [field]: event.target.value,
        })
        .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress!));
      if (result) {
        toast.success("Saved!");
      } else {
        toast.error("Failed to update");
      }
    }, 1000);
  };

  // upload image to database firebase server storage
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      const file = event?.target?.files[0];

      const fileName = Date.now().toString() + "." + file.type.split("/")[1];
      const storageRef = ref(storage, fileName);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file).then(async (snapshot: any) => {
        console.log("Uploaded a blob or file!");
        console.log(snapshot);
        const result = await db
          .update(userInfo)
          .set({
            profileImageUrl: fileName + "?alt=media",
          })
          .where(eq(userInfo.email, user?.primaryEmailAddress?.emailAddress!));

        // toast message from the server about the change and update
        if (result) {
          toast.success("Profile Image saved!");
          setProfileImage(fileName + "?alt=media");
        } else {
          toast.error("Failed to update profile image");
        }
      });
    } else {
      toast.error("Please select an image");
      return;
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-5 my-7">
      <div className="flex gap-5 items-center">
        <label htmlFor="file_select_Input" className="cursor-pointer">
          {ProfileImage ? (
            <Image
              src={BASE_URL_IMAGE + ProfileImage}
              width={40}
              height={40}
              alt="pacture"
            />
          ) : (
            <Camera size={50} className="bg-gray-600 rounded-full p-2" />
          )}
        </label>
        <input
          onChange={handleFileUpload}
          accept="image/png, image/jpg, image/JPEG"
          className="hidden"
          type="file"
          id="file_select_Input"
        />

        <input
          defaultValue={userDatiles && userDatiles[0]?.usename}
          onChange={(event) => {
            onInputChanged(event, "name");
          }}
          type="text"
          placeholder="User name"
          className="input input-bordered w-full"
        />
      </div>
      <textarea
        defaultValue={userDatiles && userDatiles[0]?.bio}
        onChange={(event) => {
          onInputChanged(event, "bio");
        }}
        rows={3}
        className="textarea textarea-bordered w-full mt-3"
        placeholder="Write same thing about yourself"
      ></textarea>
      <div className="mt-3 flex gap-2">
        <MapPin
          onClick={() => {
            setSelectOption("Map");
          }}
          strokeWidth={1}
          size={35}
          className={`hover:bg-gray-700 transition-all cursor-pointer rounded-lg p-1 text-blue-500 ${
            SelectOption == "Map" && "bg-gray-700 "
          }`}
        />
        <Link2
          onClick={() => {
            setSelectOption("link");
          }}
          strokeWidth={1}
          size={35}
          className={`hover:bg-gray-700 transition-all cursor-pointer rounded-lg p-1 text-yellow-500 ${
            SelectOption == "link" && "bg-gray-700 "
          }`}
        />
      </div>
      <div className="mt-3">
        {SelectOption == "Map" ? (
          <label className="input input-bordered flex items-center gap-2">
            <MapPin strokeWidth={1} className=" text-blue-500" />
            <input
              defaultValue={userDatiles && userDatiles[0]?.location}
              onChange={(event) => {
                onInputChanged(event, "location");
              }}
              key={0}
              type="text"
              className="grow"
              placeholder="Your Location"
            />
          </label>
        ) : SelectOption == "link" ? (
          <label className="input input-bordered flex items-center gap-2">
            <Link2 strokeWidth={1} className=" text-yellow-500" />
            <input
              defaultValue={userDatiles && userDatiles[0]?.Url}
              key={1}
              onChange={(event) => {
                onInputChanged(event, "Url");
              }}
              type="text"
              className="grow"
              placeholder="Url"
            />
          </label>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
