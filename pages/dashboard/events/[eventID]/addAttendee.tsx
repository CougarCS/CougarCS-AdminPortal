import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../../../components/layout";
import router, { useRouter } from "next/router";

import { Title } from "../../../../components/title";
import { memberType } from "../../../../types/types";

import { TextInput } from "../../../../components/textInput";
import { toast } from "sonner";
import fetcher from "../../../../utils/fetcher";
import poster from "../../../../utils/poster";

import useSWR, { mutate } from "swr";

import { AiOutlineArrowLeft } from "react-icons/ai";

const AddAttendee: NextPage = () =>
{
  const router = useRouter();

  const [swag, setSwag] = useState(false);
  const { eventID } = router.query;

  const { data, error, isLoading } = useSWR("/api/members", fetcher);
  const supabase = useSupabaseClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const fdID = formData.get("uhid");
    if (!fdID)
    {
      toast.error(`Attendee Add Error: Adding requires a UH ID.`);
      return;
    }

    const id = parseInt(fdID.toString());
    const memberDat = data as memberType[];

    const toBeAdded = memberDat.find((member) => member.uh_id === id);

    if (!toBeAdded)
    {
      toast.error(`Attendee Add Error: We couldn't find that contact.`);
      return;
    }

    await poster(`/api/events/${eventID}`, { member: toBeAdded, swag: swag });

    toast.success("Successfully added attendee!");
  };

  return (
    <Layout title="Add Attendee">
      <Title title="Add Attendee" subtitle="Look who the coog dragged in! 🤗">
        <button onClick={() => router.push(`/dashboard/events/${eventID}`)} className="flex items-center gap-x-2 text-white font-medium text-sm h-9 pr-3 py-2">
          <AiOutlineArrowLeft className="text-lg" />
          <span>Back to Event</span>
        </button>
      </Title>

      <form className="w-5/12 mx-auto mt-4" onSubmit={handleSubmit}>
        <div>
          <div className="bg-red-900 bg-opacity-10 px-4 py-2 my-4 rounded-sm border border-red-500">
            <span className="block font-semibold mx-2">
              Notes
            </span>
            <ul className="list-disc mx-2">
              <li className="mt-0.5">
                The attendee must already exist as a contact. (ask if they've been to a CougarCS event before)
              </li>
              <li className="mt-0.5">
                If they don't already exist, use the Create Attendee option back on the page for this event.
              </li>
              <li className="mt-0.5">
                If the attendee's already in the event, you can use this page to update
                their swag status.
              </li>
            </ul>
          </div>
          <TextInput label="UH ID" name="uhid" placeholder="UH ID" required />

          <label>
            <span className="mr-2 text-md">Did they receive swag?:</span>
            <input type="checkbox" className="mt-4 accent-red-500 scale-125" checked={swag} onChange={e => setSwag(e.target.checked)} />
          </label>
          <button type="submit" className="mt-6 w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700">Add Attendee</button>
        </div>
      </form>
    </Layout>
  );
};

export default AddAttendee;
