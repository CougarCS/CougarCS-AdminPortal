import React from "react";
import {
  BsGrid,
  BsPeopleFill,
  BsPersonFillAdd,
  BsCalendar4Event,
} from "react-icons/bs";
import { MdLogin } from "react-icons/md";
import { NavElement } from "./sidebarNavElement";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// moving logout function here for the sake of keeping layout file cleaner,
// and because it's not really reused so it can sit here anyway

const menuOptions = [
  {
    title: "Overview",
    icon: <BsGrid className="h-[22px] w-[22px]" />,
    path: "/",
  },
  {
    title: "Contacts",
    icon: <BsPeopleFill className="h-[22px] w-[22px]" />,
    path: "/dashboard/members",
  },
  {
    title: "Add Officer",
    icon: <BsPersonFillAdd className="h-[22px] w-[22px]" />,
    path: "/dashboard/signup",
  },
  {
    title: "Events",
    icon: <BsCalendar4Event className="h-[22px] w-[22px]" />,
    path: "/dashboard/events",
  },
];
const Sidebar = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <div
      id="sidebar"
      className="fixed top-0 left-0 flex min-h-full w-60 min-w-[15rem] flex-col justify-between bg-sidebarBG"
    >
      <div className="ml-7 flex items-center bg-sidebarBG py-12">
        <Image
          src="/images/CougarCS-logo.png"
          alt="CougarCS Logo"
          width={56}
          height={56}
        />
        <div className="ml-2">
          <p className="text-xl font-semibold text-white">CougarCS</p>
          <p className="text-sm font-medium text-gray-400">Admin Portal</p>
        </div>
      </div>

      <div id="sidebar-content" className="sticky top-0 items-center">
        {menuOptions.map((item) => (
          <NavElement
            key={item.title}
            onClick={() => router.push(item.path)}
            active={router.pathname === item.path}
          >
            {item.icon}
            {item.title}
          </NavElement>
        ))}
      </div>

      <div className="mt-auto mb-6 flex flex-col justify-end">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="mx-auto flex w-[75%] items-center justify-center gap-4 rounded-md p-2 text-gray-400 hover:bg-hoverBG hover:text-white"
        >
          <p className="font-medium">Logout</p>
          <MdLogin className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
