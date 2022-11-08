import { Navbar } from "@mantine/core";

const mockUser = {
  contact_id: "e0765790-fb13-477f-92ed-ef658effb7d8",
  uh_id: 1234567,
  email: "bfilson0@bandcamp.com",
  first_name: "Berry",
  last_name: "Filson",
};

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
