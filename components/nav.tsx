import { Navbar, createStyles, Group, Code } from "@mantine/core";
import { useState } from 'react';

const mockUser = {
  contact_id: "e0765790-fb13-477f-92ed-ef658effb7d8",
  uh_id: 1234567,
  email: "bfilson0@bandcamp.com",
  first_name: "Berry",
  last_name: "Filson",
};
const mockData = [
  { link: "#", label: "Overview" },
  { link: "#", label: "Contacts"},
  { link: "#", label: "Memberships"},
  { link: "#", label: "Ledger"},
  { link: "#", label: "Events"}
];

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
      }`,
    },
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    }
  },
    
    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor })
          .background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    }
  }
});


const Nav = () => {
  const { classes, cx} = useStyles();
  const [active, setActive] = useState('Overview');

  const links = mockData.map((item) => (
    <a
    className = {cx(classes.link, { [classes.linkActive]: item.label === active })}
    href={item.link}
    key={item.label}
    onClick={(event)=> {
      event.preventDefault();
      setActive(item.label);
    }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
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
        <Navbar.Section grow>
          <Group className={classes.header} position="apart">
            <Code sx={{ fontWeight: 700}}> CougarCS</Code>
          </Group>
          {links}
        </Navbar.Section>
        
        <Navbar.Section className={classes.footer}>
          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
            <span>Change account</span>
          </a>

          <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
        
            <span>Logout</span>
          </a>
      </Navbar.Section>
        <Navbar.Section>
            {mockUser.first_name} {mockUser.last_name}
          <div>
            {mockUser.email}
          </div>
        </Navbar.Section>
      </Navbar>
 
  );
};

export default Nav;
