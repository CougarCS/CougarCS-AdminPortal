import { Group, Button, Box, Title } from "@mantine/core";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import MemberModal from "../components/memberModal/MemberModal";
import { MembersTable } from "../components/membersTable/MembersTable";
import { ErrorObject, MembersError } from "../components/membersPageError/MembersError";
import { MemberData } from "../types/types";
import { fetchMember } from "../utils/api";
import { ScrollToTopButton } from "../components/scrollToTop/ScrollToTopButton";

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
  const [error, setError] = useState<ErrorObject | undefined>();
  const [selectedMember, setSelectedMember] = useState<MemberData>(dummyMember);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() =>
  {
    setLoading(true);

    (async () =>
    {
      const memberData = await fetchMember();
      if (memberData)
      {
        setData(memberData);
        console.log(memberData);
        setLoading(false);
      }
      else
      {
        // error state
        const fetchError: ErrorObject = {
          errorTitle: "Contacts Page Error",
          errorMessage: "Failed to fetch member data."
        };
        setError(fetchError);
        console.log(fetchError);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Layout shell>{loading ? <a>loading...</a> :
      <Box className="h-full">
        {error ? <MembersError errorTitle={error.errorTitle} errorMessage={error.errorMessage} /> :
          <div>
            <Title className="mt-4 mb-6 text-gray-100 ">
              Contacts
            </Title>

            <div className="mb-4 flex flex-row gap-6">
              <Button variant="outline" color="red" radius="xs" size="md">
                Add
              </Button>
              <Button variant="outline" color="red" radius="xs" size="md">
                Edit
              </Button>
            </div>

            <MembersTable data={data} setSelectedMember={setSelectedMember} setModalOpen={setModalOpen} />
            <ScrollToTopButton />
            <MemberModal member={selectedMember} open={isModalOpen} setClose={() => { setModalOpen(false); }} />
          </div>
        }
      </Box>}
    </Layout>
  );
};

export default Members;
