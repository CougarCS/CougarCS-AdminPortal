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
import Image from "next/image";
import Layout from "../components/layout";
import styles from "../styles/Login.module.css";

const Login: NextPage = () => {
  return (
    <Layout title="Officer Login">
      <Container size={450} my={40}>
        <Title className={styles.title} align="center" p="sm">
          <Image src="/images/CougarCS-logo.png" width={150} height={150} />
          <br />
          CougarCS Officer Login
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Don't have an account? Contact the Webmaster.
        </Text>
        <Paper withBorder shadow="md" radius="md" p={30} mt={30}>
          <TextInput label="Username" placeholder="Web developer" required />
          <PasswordInput
            label="Password"
            placeholder="Password"
            required
            mt={"md"}
          />
          <Button fullWidth mt={"xl"} color="red">
            Sign in
          </Button>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;
