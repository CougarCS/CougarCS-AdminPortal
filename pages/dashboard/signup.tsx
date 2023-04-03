import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@mantine/core";
import Layout from "../../components/layout";

import { TextInput } from "../../components/textInput";
import { PasswordInput } from "../../components/pwInput";
import { toast } from "sonner";

const Signup: NextPage = () =>
{
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
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

    if (error) toast.success(`Signup Error: ${error.message}`);

    if (data) toast.success("Account invite sent!");
  };

  if (loading)
  {
    return (
      <Layout title="Officer Signup">
        <div className="w-5/12 mx-auto place-content-center">
          <h1>Loading</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Officer Signup">
      <div className="w-5/12 mx-auto place-content-center">
        <h1 className="text-white font-bold text-4xl">
          Officer Signup
        </h1>
        <form onSubmit={handleSubmit}>
          <TextInput className="mt-4" name="username" label="Username" placeholder="Web Developer" required />
          <PasswordInput
            className="mt-4"
            name="password"
            label="Password"
            placeholder="Password"
            required
          />
          <button type="submit" className="mt-6 w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700">Sign up</button>
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
