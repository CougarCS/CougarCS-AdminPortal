import { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

import { TextInput } from "../components/textInput";
import { PasswordInput } from "../components/pwInput";

const Login: NextPage = () =>
{
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username as string,
      password: password as string,
    });

    setLoading(false);

    if (error)
    {
      toast.error(`Failed to login: ${error.message}`);
      return;
    }

    if (data)
    {
      await router.push("/dashboard");
    }
  };

  if (session)
  {
    router.push("/dashboard");
  }

  return (
    <Layout title="Officer Login" sidebarHidden>
      <div className="my-32 max-w-md w-full mx-auto">
        <h1 className="font-bold text-white text-center">
          <Image
            src="/images/CougarCS-logo.png"
            alt="CougarCS Logo"
            width={150}
            height={150}
          />
          <br />
          CougarCS Login
        </h1>

        <p className="mt-1 text-center text-sm text-gray-500">
          Don&#39;t have an account? Contact the{" "}
          <a className="text-red-500">Webmaster</a>.
        </p>

        <div className="mt-8 rounded-md border border-zinc-700 px-8 pt-5 pb-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div id="username-input">
              <TextInput name="username" label="Username" placeholder="Username" required />
            </div>

            <div id="password-input">
              <PasswordInput name="password" label="Password" placeholder="Password" required />
            </div>

            <button type="submit" className="w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700">Sign in</button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
