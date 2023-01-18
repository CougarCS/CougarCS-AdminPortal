import {
  Button,
  Container,
  Paper,
  PasswordInput,
  TextInput,
  Title,
  Text,
} from "@mantine/core";
import { NextPage } from "next";
import React, { useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Error from "../components/error";

const Login: NextPage = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username")?.toString();
    const password = formData.get("password")?.toString();

    setError(false);
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: username as string,
      password: password as string,
    });

    setLoading(false);

    if (error) {
      setError(true);
      setErrorMessage(error.message);
      return;
    }

    if (data) {
      await router.push("/dashboard");
    }
  };

  if (session) {
    router.push("/dashboard");
  }

  return (
    <Layout title="Officer Login">
      <Container className="my-10 max-w-md">
        <Title className="font-bold text-white" align="center" p="sm">
          <Image
            src="/images/CougarCS-logo.png"
            alt="CougarCS Logo"
            width={150}
            height={150}
          />
          <br />
          CougarCS Login
        </Title>
        <Text className="mt-1 text-center text-sm text-gray-500">
          Don&#39;t have an account? Contact the{" "}
          <a className="text-red-500">Webmaster</a>.
        </Text>

        <Paper className="mt-8 rounded-md border border-zinc-700 p-8 shadow-md">
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
            <Button
              className="bg-red-600 hover:bg-red-700"
              type="submit"
              fullWidth
              mt={"xl"}
              loading={loading}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
      {error && <Error>{errorMessage}</Error>}
    </Layout>
  );
};

export default Login;
