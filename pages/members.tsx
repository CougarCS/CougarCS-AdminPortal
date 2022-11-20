import { Group, Button } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { MembersTable } from "../components/membersTable/MembersTable";
import { MemberData } from "../types/types";
import { fetchMember } from "../utils/api";

const Members: NextPage = () =>
{
  const [data, setData] = useState<MemberData[]>([]);
  const [loading, setLoading] = useState(false);

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
        <MembersTable data={data} />
      </div>}
    </Layout>
  );
};

export default Members;
