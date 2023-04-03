import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Layout from "../../components/layout";

const Signup: NextPage = () =>
{
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    setError(false);
    setSuccess(false);
    setErrorMessage("");
    setSuccessMessage("");

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email: username as string,
      password: password as string,
    });

    setLoading(false);

    if (error)
    {
      setError(true);
      setErrorMessage(error.message);
      return;
    }

    if (data)
    {
      setSuccess(true);
      setSuccessMessage("Account invite sent!");
      return;
    }
  };

  return (
    <Layout title="Officer Signup">
      <form onSubmit={handleSubmit}>
        <TextInput
          name="username"
          label="Username"
          placeholder="Web developer"
          required
          disabled={loading}
          error={error}
        />
        <PasswordInput
          className="mt-4"
          name="password"
          label="Password"
          placeholder="Password"
          required
          disabled={loading}
          error={error}
        />
        {error && <a className="text-red-500">{errorMessage}</a>}
        {success && <a className="text-green-500">{successMessage}</a>}
        <Button
          className="bg-red-600 hover:bg-red-700"
          type="submit"
          fullWidth
          mt={"xl"}
          loading={loading}
        >
          Sign up
        </Button>
      </form>
    </Layout>
  );
};

export default Signup;
