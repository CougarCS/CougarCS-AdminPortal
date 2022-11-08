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
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { fetchLogin } from "../utils/api";

const Login: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    setError(false);
    setLoading(true);

    try {
      const res = await fetchLogin({ username, password });
      setLoading(false);

      if (res.status === 200) {
        await router.push("/");
        return;
      }

      if (res.status === 401) {
        setError(true);
        setErrorMessage("Your username or password is invalid!");
        return;
      }

      setError(true);
      setErrorMessage("Something went wrong!");
    } catch (err) {
      setError(true);
      setLoading(false);
      setErrorMessage("An unexpected error occurred");

      throw err;
    }
  };

  return (
    <Layout title="Officer Login">
      <Container size={450} my={40}>
        <Title className={styles.title} align="center" p="sm">
          <Image
            src="/images/CougarCS-logo.png"
            alt="CougarCS Logo"
            width={150}
            height={150}
          />
          <br />
          CougarCS Login
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don&#39;t have an account? Contact the{" "}
          <a className={styles.standOut}>Webmaster</a>.
        </Text>

        <Paper withBorder shadow="md" radius="md" p={30} mt={30}>
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
              name="password"
              label="Password"
              placeholder="Password"
              required
              mt={"md"}
              disabled={loading}
              error={error}
            />
            {error && <a className={styles.error}>{errorMessage}</a>}
            <Button
              type="submit"
              fullWidth
              mt={"xl"}
              color="red"
              loading={loading}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;
