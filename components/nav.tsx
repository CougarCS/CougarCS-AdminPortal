import { Navbar } from "@mantine/core";

const Nav = () => {
  return (
    <>
      <Navbar
        fixed={false}
        height="100vh"
        p="xs"
        width={{
          sm: 150,
          lg: 200,
          base: 50,
        }}
      >
        <Navbar.Section>{"Logo"}</Navbar.Section>
        <Navbar.Section grow mt="md">
          {"Nav Item 1"}
        </Navbar.Section>
        <Navbar.Section>{"User info"}</Navbar.Section>
      </Navbar>
    </>
  );
};

export default Nav;
