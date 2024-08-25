import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function UserDetalis({ userDatiles }: { userDatiles: any }) {
  return (
    <div className="flex md:items-center md:px-10 md:h-screen mt-7 md:mt-0">
      <div>
        <div className="flex items-start gap-2 justify-start md:flex-col">
          <div>
            <Image
              width={90}
              height={90}
              alt="image user"
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL + userDatiles?.profileImageUrl
              }
            />
          </div>
          <div>
            <h1 className="md:text-2xl font-semibold md:mt-1">{userDatiles?.name}</h1>
            <p className="text-sm opacity-70 font-medium flex gap-1 items-center">
              <MapPin />
              {userDatiles?.location}
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          <p className="font-medium opacity-75 text-center md:text-start w-full">{userDatiles?.bio}</p>
          <div className="flex gap-2 flex-col md:flex-row">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
            <button className="btn btn-secondary">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}
