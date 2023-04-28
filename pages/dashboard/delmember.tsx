import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/layout";

import { Title } from "../../components/title";
import { SelectInput } from "../../components/selectInput";
import { memberType } from "../../types/types";

import poster from "../../utils/poster";
import { TextInput } from "../../components/textInput";
import { toast } from "sonner";
import fetcher from "../../utils/fetcher";

import useSWR, { mutate } from "swr";
import { DeleteMemberModal } from "../../components/membersModal/deleteMemberModal";

const DelMember: NextPage = () =>
{
  const { data, error, isLoading } = useSWR("/api/members", fetcher);

  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<memberType | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fdID = formData.get("uhid");
    if (!fdID)
    {
      toast.error(`Contact Deletion Error: Deletion requires a UH ID.`);
      return;
    }

    const id = parseInt(fdID.toString());
    const memberDat = data as memberType[];

    const toBeKilled = memberDat.find((member) => member.uh_id === id);

    if (!toBeKilled)
    {
      toast.error(`Contact Deletion Error: We couldn't find that contact.`);
      return;
    }

    setModalData(toBeKilled);
    setModalOpen(true);
  };

  return (
    <Layout title="Contact Deletion">
      <Title
        title="Contact Deletion"
        subtitle="Here's where you break eye contact 👁️">
      </Title>

      {(modalOpen && modalData) ? <DeleteMemberModal isOpen={modalOpen} setModalOpen={setModalOpen} member={modalData} /> : <></>}

      <form className="w-5/12 mx-auto mt-4" onSubmit={handleSubmit}>
        <div>
          <TextInput label="UH ID" name="uhid" placeholder="UH ID" required />
          <button type="submit" className="mt-6 w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700">Delete Contact</button>
        </div>
      </form>
    </Layout>
  );
};

export default DelMember;
