import React from "react";
import { BarChart, Brush, Layout, Settings } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
export default function Sidebar() {
  const menuList = [
    {
      id: 0,
      name: "pages",
      icon: Layout,
    },
    {
      id: 1,
      name: "styles",
      icon: Brush,
    },
    {
      id: 2,
      name: "stats",
      icon: BarChart,
    },
    {
      id: 3,
      name: "Settings",
      icon: Settings,
    },
  ];
  return (
    <div className="py-4 px-3 h-screen bg-gray-800 space-y-4">
      {menuList.map((menu) => {
        return (
          <div
            className="bg-purple-600 tooltip tooltip-primary tooltip-right cursor-pointer hover:scale-105 transition-all py-4 text-center flex items-center justify-center text-white px-4 rounded-md"
            key={menu.id}
            data-tip={menu.name}
          >
            <menu.icon />
          </div>
        );
      })}
      <div className="fixed bottom-5 px-5">
        <UserButton/>
      </div>
    </div>
  );
}
