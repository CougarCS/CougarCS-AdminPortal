import { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";

import { TextInput } from "../components/textInput";
import { PasswordInput } from "../components/pwInput";
import { LoadSpinner } from "../components/loadingSpinner";

const Login: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    if (error) {
      toast.error(`Failed to login: ${error.message}`);
      return;
    }

    if (data) {
      await router.push("/");
    }
  };
  if (session) {
    router.push("/");
  }

  if (loading) {
    return (
      <Layout title="Officer Login" sidebarHidden>
        <div className="my-32 mx-auto w-full max-w-md">
          <h1 className="text-center font-bold text-white">
            <Image
              src="/images/CougarCS-logo.png"
              alt="CougarCS Logo"
              width={150}
              height={150}
            />
            <br />
            CougarCS Login
          </h1>

          <LoadSpinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Officer Login" sidebarHidden>
      <div className="my-32 mx-auto w-full max-w-md items-center">
        <div className="mx-auto block w-fit">
          <Image
            src="/images/CougarCS-logo.png"
            alt="CougarCS Logo"
            width={150}
            height={150}
          />
        </div>
        <h1 className="mt-4 text-center text-4xl font-bold text-white">
          CougarCS Login
        </h1>

        <p className="mt-2 text-center text-lg text-gray-500">
          Don&#39;t have an account? Contact the{" "}
          <a className="text-red-500">Webmaster</a>.
        </p>

        <div className="mt-8 rounded-md border border-zinc-700 px-8 pt-5 pb-8 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div id="username-input">
              <TextInput
                name="username"
                label="Username"
                placeholder="Username"
                required
              />
            </div>

            <div id="password-input">
              <PasswordInput
                name="password"
                label="Password"
                placeholder="Password"
                required
              />
            </div>

            <button
              type="submit"
              className="h-9 w-full rounded-sm bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
