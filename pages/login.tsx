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
import { useState } from "react";
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Login.module.css";
import { useRouter } from "next/router";

/*
TODO
1. Call real database for user info.
2. Remove setTimeout()
*/

const exampleDatabase = [
  {
    username: "admin",
    password: "notsafe",
  },
  {
    username: "webmaster",
    password: "bryant",
  },
];

interface loginData {
  username: { value: string };
  password: { value: string };
}

const errorMessage = "Your username or password is invalid!";

const Login: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLElement>): void => {
    e.preventDefault();

    setLoading(true);
    setError(false);

    const { username, password } = e.target as typeof e.target & loginData;

    setTimeout(() => {
      setLoading(false);
      const user = exampleDatabase.find(
        (user) => user.username === username.value
      );

      console.log(user);

      if (user) {
        if (user.password !== password.value) {
          setError(true);
        } else {
          router.push("/");
        }
      } else {
        setError(true);
      }
    }, 2000);
  };

  return (
    <Layout title="Officer Login">
      <Container size={450} my={40}>
        <Title className={styles.title} align="center" p="sm">
          <Image src="/images/CougarCS-logo.png" width={150} height={150} />
          <br />
          CougarCS Login
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don't have an account? Contact the{" "}
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
            {error ? <a className={styles.error}>{errorMessage}</a> : <></>}
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
