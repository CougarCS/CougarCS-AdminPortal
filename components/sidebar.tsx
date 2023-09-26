import React from "react";
import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaCog,
  FaSignOutAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { NavElement } from "./sidebarNavElement";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

// moving logout function here for the sake of keeping layout file cleaner,
// and because it's not really reused so it can sit here anyway

const menuOptions = [
  { title: "Overview", icon: <FaHome className="h-7 w-7" />, path: "/" },
  {
    title: "Contacts",
    icon: <FaUsers className="h-7 w-7" />,
    path: "/dashboard/members",
  },
  {
    title: "Add Officer",
    icon: <FaUserPlus className="h-7 w-7" />,
    path: "/dashboard/signup",
  },
  {
    title: "Events",
    icon: <FaCalendarAlt className="h-7 w-7" />,
    path: "/dashboard/events",
  },
];
const Sidebar = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <div
      id="sidebar"
      className="flex min-h-full w-32 min-w-[224px] flex-col justify-between bg-sidebarBG"
    >
      <div className="flex items-center justify-center  bg-sidebarBG p-8">
        <Image
          src="/images/CougarCS-logo.png"
          alt="CougarCS Logo"
          width={64}
          height={64}
        />
        <div>
          <p className="text-lg font-bold text-white">CougarCS</p>
          <p className="text-sm font-light text-white">Admin Portal</p>
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

      <div className="mt-auto mb-4 flex flex-col justify-end">
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/login");
          }}
          className="px-4 py-2 text-lg text-red-500"
        >
          <FaSignOutAlt className="mr-2 inline-block h-7 w-7" />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
