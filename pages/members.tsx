import { Group, Button } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import MemberModal from "../components/memberModal/MemberModal";
import { MembersTable } from "../components/membersTable/MembersTable";
import { MemberData } from "../types/types";
import { fetchMember } from "../utils/api";

// for scroll to top button
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Transition } from '@mantine/core';

const dummyMember: MemberData = {
  contact_id: "b9446715-34c0-4068-9c73-44f90e32bb79",
  email: "mdeane2s@prweb.com",
  first_name: "Mara",
  last_name: "Deane",
  phone_number: "7419791795",
  shirt_size_id: "S",
  timestamp: "2022-01-20T08:57:58Z",
  uh_id: 1234567
};

const Members: NextPage = () =>
{
  const [data, setData] = useState<MemberData[]>([]);
  const [selectedMember, setSelectedMember] = useState<MemberData>(dummyMember);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() =>
  {
    setLoading(true);

    (async () =>
    {
      const memberData = await fetchMember();
      setData(memberData);

      console.log(memberData);

      setLoading(false);
    })();
  }, []);

  return (
    <Layout shell>{loading ? <a>loading...</a> :
      <div>
        <h1>
          Contacts
        </h1>
        <Group spacing={"xl"}>
          <Button variant="outline" color="red" radius="xs" size="md">
            Add
          </Button>
          <Button variant="outline" color="red" radius="xs" size="md">
            Edit
          </Button>
        </Group>
        <MembersTable data={data} setSelectedMember={setSelectedMember} setModalOpen={setModalOpen} />
        <MemberModal member={selectedMember} open={isModalOpen} setClose={() => { setModalOpen(false); }} />
        <ScrollToTopButton />
      </div>}
    </Layout>
  );
};

export default Members;


// saw this in mantine docs and liked it
// lots of rows = lots of scrolling (not lots of fun)
// optimizes access to add+edit buttons
const ScrollToTopButton = () =>
{
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <Transition transition="slide-up" mounted={scroll.y > 0}>
        {(transitionStyles) => (
          <Button
            style={transitionStyles}
            onClick={() => scrollTo({ y: 0 })}
            color="red"
            size="md"
            radius="xs"
            compact
          >
            Scroll to top
          </Button>
        )}
      </Transition>
    </Affix>
  );
};
