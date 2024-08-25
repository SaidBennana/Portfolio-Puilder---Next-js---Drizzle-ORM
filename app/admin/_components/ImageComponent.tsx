import { storage } from "@/utils/firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
import { Camera, ImagePlus } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

const BASE_URL_IMAGE = process.env.NEXT_PUBLIC_IMAGE_URL;
export default function ImageComponent({
  Src_Image,
  ImagUpload,
  className = "w-16 h-14 object-cover",
}: {
  Src_Image: any;
  ImagUpload: (event: string) => void;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);
  const Id_Input = Math.random();
  // upload image to database firebase server storage
  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files) {
      setLoading(true);
      // Get the file from the event object
      const file = event?.target?.files[0];

      const fileName = Date.now().toString() + "." + file.type.split("/")[1];
      const storageRef = ref(storage, fileName);
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file)
        .then(async (snapshot: any) => {
          ImagUpload(fileName + "?alt=media");
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      toast.error("Please select an image");
      return;
    }
  };
  return (
    <div>
      <label
        htmlFor={"file_select_Input" + Id_Input}
        className={" cursor-pointer"}
      >
        {loading ? (
          <div className="bg-gray-600 rounded-full px-2 py-2 flex items-end">
            <span className="loading loading-infinity loading-md" />
          </div>
        ) : Src_Image ? (
          <Image
            src={BASE_URL_IMAGE + Src_Image}
            width={550}
            height={550}
            alt="pacture"
            className={className}
          />
        ) : (
          <ImagePlus
            size={40}
            className="w-10 h-10 rounded-full text-3xl p-1"
          />
        )}
      </label>
      <input
        onChange={(event) => handleFileUpload(event)}
        accept="image/png, image/jpg, image/JPEG"
        className="hidden"
        type="file"
        id={"file_select_Input" + Id_Input}
      />
    </div>
  );
}
