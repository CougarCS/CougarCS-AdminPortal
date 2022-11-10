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
        className="NavbarItems"
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
          {"Overview"}
          <div>
            {"Contacts"}
          </div>
        </Navbar.Section>
        <Navbar.Section>
            {mockUser.first_name} {mockUser.last_name}
          <div>
            {mockUser.email}
          </div>
        </Navbar.Section>
      </Navbar>
    </>
  );
};

export default Nav;
