import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/layout";

import { TextInput } from "../../components/textInput";
import { PasswordInput } from "../../components/pwInput";
import { toast } from "sonner";
import { LoadSpinner } from "../../components/loadingSpinner";
import { Title } from "../../components/title";

const Signup: NextPage = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: username as string,
      password: password as string,
    });

    setLoading(false);

    if (error) toast.error(`Signup Error: ${error.message}`);
    else if (data) toast.success("Account invite sent!");
  };

  if (loading) {
    return (
      <Layout title="Officer Signup">
        <div className="mx-auto w-5/12 place-content-center">
          <h1>Loading</h1>
          <LoadSpinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Officer Signup">
      <Title
        title="Officer Signup"
        subtitle="Add new coogs to the pack! 😸"
      ></Title>
      <div className="mx-auto w-5/12 place-content-center">
        <form onSubmit={handleSubmit}>
          <TextInput
            className="mt-4"
            name="username"
            label="Username"
            placeholder="Web Developer"
            required
          />
          <PasswordInput
            className="mt-4"
            name="password"
            label="Password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="mt-6 h-9 w-full rounded-sm bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
          >
            Sign up
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
