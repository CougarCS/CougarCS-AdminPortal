import type { NextPage } from "next";
import Image from "next/image";
import Layout from "../components/layout";
import {
  AiOutlineDashboard,
  AiOutlineUnorderedList,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Home: NextPage = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();

  return (
    <Layout title="Home">
      <div className="my-10 mx-auto max-w-md space-y-8">
        <div className="mx-auto block w-fit">
          <Image
            src="/images/CougarCS-logo.png"
            alt="CougarCS Logo"
            height={270}
            width={350}
            priority={true}
          />
        </div>
        <h1 className="mt-4 text-center text-4xl font-bold text-white">
          <span className="text-red-500">CougarCS</span> Admin Portal
        </h1>

        <button
          onClick={() => router.push("/dashboard")}
          className="flex h-9 w-full justify-center space-x-2 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
        >
          <AiOutlineDashboard className=" my-auto" />
          <span className="my-auto">Dashboard</span>
        </button>

        <button
          onClick={() => router.push("/dashboard/members")}
          className="flex h-9 w-full justify-center space-x-2 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
        >
          <AiOutlineUnorderedList className="my-auto" />
          <span className="my-auto">Contacts</span>
        </button>

        <button
          onClick={() => router.push("/dashboard/signup")}
          className="flex h-9 w-full justify-center space-x-2 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
        >
          <AiOutlineUserAdd className="my-auto" />
          <span className="my-auto">Sign Up</span>
        </button>

        <button
          onClick={async () => {
            const { error } = await supabase.auth.signOut();
            router.push("/login");
          }}
          className="flex h-9 w-full justify-center space-x-2 rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
        >
          <AiOutlineLogout className="my-auto" />
          <span className="my-auto">Logout</span>
        </button>
      </div>
    </Layout>
  );
};

export default Home;
