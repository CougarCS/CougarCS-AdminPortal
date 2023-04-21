import React from 'react';
import { FaHome, FaUsers, FaUserPlus, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavElement } from './sidebarNavElement';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

// moving logout function here for the sake of keeping layout file cleaner,
// and because it's not really reused so it can sit here anyway

const menuOptions = [
  { title: "Overview", icon: <FaHome className='h-7 w-7' />, path: "/" },
  { title: "Members", icon: <FaUsers className='h-7 w-7' />, path: "/dashboard/members" },
  { title: "Add Officer", icon: <FaUserPlus className='h-7 w-7' />, path: "/dashboard/signup" }
];
const Sidebar = () =>
{
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <div id="sidebar" className="min-h-full w-56 bg-sidebarBG flex justify-between flex-col">
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
        {menuOptions.map((item) =>
        {
          return (
            <NavElement onClick={() => router.push(item.path)} active={router.pathname === item.path}>
              {item.icon}
              {item.title}
            </NavElement>
          );
        })}
      </div>
      <div className="flex flex-col justify-end mt-auto mb-4">
        <button onClick={async () => { await supabase.auth.signOut(); router.push("/login"); }} className="text-red-500 px-4 py-2 text-lg"><FaSignOutAlt className="inline-block mr-2 h-7 w-7" />Log Out</button>
      </div>
    </div >
  );
};

export default Sidebar;
