import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../../../components/layout";
import router, { useRouter } from "next/router";

import { Title } from "../../../../components/title";
import { eventDetails, memberAttendanceType, memberType } from "../../../../types/types";

import { TextInput } from "../../../../components/textInput";
import { toast } from "sonner";
import fetcher from "../../../../utils/fetcher";
import poster from "../../../../utils/poster";

import useSWR, { mutate } from "swr";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { SelectInput } from "../../../../components/selectInput";

const AddAttendee: NextPage = () =>
{
  const router = useRouter();

  const [swag, setSwag] = useState(false);
  const [idSearch, setIdSearch] = useState("");
  const [contactExists, setContactExists] = useState(false);

  const { eventID } = router.query;

  const { data, error, isLoading } = useSWR("/api/members", fetcher);

  const handleExistingSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
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

  // basically the code from /addmember.tsx
  // with some extra stuff at the end to add it to the event
  const handleNewSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
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
    const memberDat = data?.attendees as memberType[];

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

      <div className="w-5/12 mx-auto mt-4">
        <div className="bg-red-900 bg-opacity-10 px-4 py-2 my-4 rounded-sm border border-red-500">
          <span className="block font-semibold mx-2">
            Notes
          </span>
          <ul className="list-disc mx-2">
            <li className="mt-0.5">
              If the attendee's already logged in the event, you can use this page to update
              their swag status.
            </li>
          </ul>
        </div>
        <label className="w-full">
          <input
            className="w-full h-9 px-2 bg-selectInputBG placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-white border border-neutral-500 rounded-sm"
            name="searchBox"
            placeholder={"UH ID"}
            maxLength={7}
            value={idSearch}
            onChange={e =>
            {
              setIdSearch(e.target.value);
              const id = parseInt(e.target.value);
              const memberDat = data as memberType[];
              console.log(memberDat.some((member) => member.uh_id === id));
              setContactExists(memberDat.some((member) => member.uh_id === id));
            }}
          />
        </label>

        <form onSubmit={contactExists ? handleExistingSubmit : handleNewSubmit}>
          {contactExists ? <ExistingAttendee /> : <NewAttendee />}
          <label>
            <span className="mr-2 text-md">Did they receive swag?:</span>
            <input type="checkbox" className="mt-4 accent-red-500 scale-125" checked={swag} onChange={e => setSwag(e.target.checked)} />
          </label>
        </form>
      </div>
    </Layout >
  );
};

export default AddAttendee;


const ExistingAttendee = () =>
{
  return (
    <>
      <button type="submit" className="mt-6 w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700">Add Attendee</button>
    </>
  );
};

const NewAttendee = () =>
{
  const [shirtSize, setShirtSize] = useState("M");
  const shirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <>
      <TextInput className="mt-4" name="uhid" label="UH ID" placeholder="1234567" />
      <TextInput className="mt-4" name="first" label="First Name" placeholder="Mihir" />
      <TextInput className="mt-4" name="last" label="Last Name" placeholder="Sahu" />
      <TextInput className="mt-4" name="phone" label="Phone" placeholder="0123456789" />
      <TextInput className="mt-4" name="email" label="Email" placeholder="mihir_here@uh.edu" />

      <div className="mt-4 flex gap-x-2">
        <span>Shirt size</span>
        <SelectInput
          name="shirt"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { setShirtSize(e.target.value); }}
          options={shirtSizeOptions}
          value={shirtSize}
          height="h-fit"
          width="w-18"
          textSize="text-md"
          ariaLabel="Update shirt size"
        />
      </div>

      <button type="submit" className="mt-6 w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700">Add Contact</button>
    </>
  );
};