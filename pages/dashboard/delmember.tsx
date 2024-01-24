import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../../components/layout";
import router from "next/router";
import { Title } from "../../components/title";
import { memberType } from "../../types/types";
import { TextInput } from "../../components/textInput";
import { toast } from "sonner";
import fetcher from "../../utils/fetcher";
import useSWR from "swr";
import { HiArrowLeft } from "react-icons/hi";
import { BaseModal } from "../../components/modal/baseModal";
import { DeleteContactView } from "../../components/modal/deleteContactView";

const DelMember: NextPage = () => {
  const { data, error, isLoading } = useSWR("/api/members", fetcher);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState<memberType>({
    contact_id: "",
    email: "",
    first_name: "",
    last_name: "",
    phone_number: 0,
    shirt_size_id: "",
    timestamp: "",
    uh_id: 0,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formRef = e.currentTarget;

    const fdID = formData.get("uhid");
    if (!fdID) {
      toast.error(`Contact Deletion Error: Deletion requires a UH ID.`);
      return;
    }

    const id = parseInt(fdID.toString());
    const memberData = data as memberType[];

    const toBeDeleted = memberData.find((member) => member.uh_id === id);

    if (!toBeDeleted) {
      toast.error(`Contact Deletion Error: We couldn't find that contact.`);
      return;
    }

    setModalData(toBeDeleted);
    setModalOpen(true);

    if (formRef) {
      formRef.reset();
    }
  };

  return (
    <Layout title="Contact Deletion">
      <Title
        title="Contact Deletion"
        subtitle="Here's where you break eye contact 👁️"
      >
        <button
          onClick={() => router.push("/dashboard/members")}
          className="group mt-1 flex h-9 items-center gap-x-2 pr-3 text-sm text-white"
        >
          <HiArrowLeft className="text-lg" />
          <span className="border-gray-200 group-hover:border-b">
            Back to Contacts
          </span>
        </button>
      </Title>

      {modalOpen && modalData && (
        <BaseModal open={modalOpen} setOpen={setModalOpen}>
          <DeleteContactView contact={modalData} setOpen={setModalOpen} />
        </BaseModal>
      )}

      <div className="mx-auto w-full place-content-center xl:w-[42%]">
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <TextInput label="UH ID" name="uhid" placeholder="UH ID" required />
            <button
              type="submit"
              className="mt-6 h-9 w-full rounded-md bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Delete Contact
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default DelMember;
