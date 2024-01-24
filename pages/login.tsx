import { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "sonner";
import { TextInput } from "../components/textInput";
import { PasswordInput } from "../components/formInput/pwInput";
import { LoadSpinner } from "../components/loadingSpinner";

const Login: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: username as string,
      password: password as string,
    });

    if (error) {
      setIsLoading(false);
      toast.error(`Failed to login: ${error.message}`);
      return;
    }

    setIsLoading(false);
  };

  if (session) {
    router.push("/");
  }

  if (isLoading) {
    return (
      <Layout title="Officer Login" sidebarHidden>
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto max-w-md">
            <h1 className="mb-6 text-center font-bold text-white">
              <Image
                src="/images/CougarCS-logo.png"
                alt="CougarCS Logo"
                height={300}
                width={380}
                priority={true}
                className="animate-pulse"
              />
            </h1>
            <LoadSpinner />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Officer Login" sidebarHidden>
      <div className="flex h-full w-full items-center justify-center">
        <div className="w-full max-w-md">
          <div className="mx-auto block w-fit">
            <Image
              src="/images/CougarCS-icon.png"
              alt="CougarCS Logo"
              height={200}
              width={200}
              priority={true}
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
            <form onSubmit={handleSubmit}>
              <div id="username-input" className="mb-3">
                <TextInput
                  name="username"
                  label="Username"
                  placeholder="Username"
                  required
                />
              </div>

              <div id="password-input" className="mb-5">
                <PasswordInput
                  name="password"
                  label="Password"
                  placeholder="Password"
                  required
                />
              </div>

              <button
                type="submit"
                className="h-9 w-full rounded-md bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
