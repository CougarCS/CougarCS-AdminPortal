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

  const [idSearch, setIdSearch] = useState("");
  const [existingContact, setExistingContact] = useState<memberType | undefined>(undefined);

  const { eventID } = router.query;

  const { data, error, isLoading } = useSWR("/api/members", fetcher);

  const handleExistingSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();

    if (!existingContact)
    {
      toast.error(`Attendee Add Error: We couldn't find that contact.`);
      return;
    }

    const swag = document.getElementsByName("swagcheck")[0] as HTMLInputElement;
    const result = await poster(`/api/events/${eventID}`, { member: existingContact, swag: swag.checked });

    if (result.error)
    {
      toast.error("Failed to add attendee! " + result.description);
      return;
    }
    toast.success("Successfully added attendee!");
    mutate(`/api/events/${eventID}`);
    setIdSearch("");
  };

  // basically the code from /addmember.tsx
  // with some extra stuff at the end to add it to the event
  const handleNewSubmit = async (e: React.FormEvent<HTMLFormElement>) =>
  {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (!formData.get("first")?.toString() || !formData.get("uhid")?.toString() || !formData.get("last")?.toString())
    {
      toast.error(`Contact Creation Error: Contact requires at LEAST a first name, last name, and UH ID.`);
      return;
    }

    if (!parseInt(formData.get("phone")!.toString()) || formData.get("phone")!.toString().includes("-"))
    {
      toast.error(`Contact Creation Error: Rewrite the phone number to use no special characters.`);
      return;
    }

    type contactWOTS = Omit<memberType, "timestamp">;

    const contactObj: contactWOTS = {
      contact_id: crypto.randomUUID(),
      uh_id: 1234567,
      first_name: "",
      last_name: "",
      phone_number: 123456789,
      email: "",
      shirt_size_id: "M"
    };

    // ok to use ! here cause guard statement should catch but TS cries anyway
    // so ! it is
    const contInput: Partial<memberType> & Pick<memberType, "uh_id" | "first_name" | "last_name"> = {
      uh_id: parseInt(formData.get("uhid")!.toString()),
      first_name: formData.get("first")!.toString(),
      last_name: formData.get("last")!.toString(),
      email: formData.get("email")!.toString(),
      phone_number: parseInt(formData.get("phone")!.toString()),
      shirt_size_id: formData.get("shirt")!.toString(),
    };

    Object.assign(contactObj, contInput);

    const nuMember = await poster(`/api/members`, contactObj);
    const swag = document.getElementsByName("swagcheck")[0] as HTMLInputElement;
    const res = await poster(`/api/events/${eventID}`, { member: nuMember.data, swag: swag.checked });

    if (res.error)
    {
      toast.error(`Contact Creation Error: ${res.error.message}`);
    }
    else
    {
      toast.success("Successfully created and added attendee!");
      mutate(`/api/events/${eventID}`);
      setIdSearch("");
    }
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
        {/* lil note */}
        {idSearch.length < 7 && <div className="bg-neutral-700 bg-opacity-10 px-4 py-2 my-4 rounded-sm border border-neutral-500">
          <span className="block font-semibold mx-2">
            Note
          </span>
          <ul className="list-disc mx-2">
            <li className="mt-0.5">
              If the attendee's already logged in the event, you can use this page to update
              their swag status.
            </li>
          </ul>
        </div>}

        {/* contact status */}
        {idSearch.length === 7 && <>
          {existingContact ? <div className="bg-green-700 bg-opacity-10 px-4 py-2 my-4 rounded-sm border border-green-500">
            <span className="block font-semibold mx-2">
              Contact Found!
            </span>
            <ul className="list-disc mx-2">
              <li className="mt-0.5">
                {existingContact.first_name}'s already logged in our system, so you don't have to enter their info.
              </li>
            </ul>
          </div> : <div className="bg-red-700 bg-opacity-10 px-4 py-2 my-4 rounded-sm border border-red-500">
            <span className="block font-semibold mx-2">
              Contact Not Found!
            </span>
            <ul className="list-disc mx-2">
              <li className="mt-0.5">
                We don't have that contact logged in our system. Please create a new one below:
              </li>
            </ul>
          </div>}
        </>}

        <form onSubmit={existingContact ? handleExistingSubmit : handleNewSubmit}>
          <label className="w-full">
            UH ID
            <input
              className="placeholder:text-neutral-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 w-full h-9 rounded-sm text-sm px-4 bg-zinc-800 border border-zinc-700"
              name="uhid"
              placeholder={"UH ID"}
              maxLength={7}
              value={idSearch}
              onChange={e =>
              {
                setIdSearch(e.target.value);
                const id = parseInt(e.target.value);
                const memberDat = data as memberType[];

                setExistingContact(memberDat.find((member) => member.uh_id === id));
              }}
            />
          </label>

          {idSearch.length === 7 &&
            <>
              {existingContact ? <ExistingAttendee member={existingContact} /> : <NewAttendee />}
            </>
          }
        </form>
      </div>
    </Layout>
  );
};

export default AddAttendee;

type ExistingAttendeeProps = {
  member: memberType;
};
const ExistingAttendee = ({ member }: ExistingAttendeeProps) =>
{
  return (
    <>
      <label>
        <span className="mr-2 text-md">Did they receive swag?:</span>
        <input name="swagcheck" type="checkbox" className="mt-4 accent-red-500 scale-125" />
      </label>

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

      <label>
        <span className="mr-2 text-md">Did they receive swag?:</span>
        <input name="swagcheck" type="checkbox" className="mt-4 accent-red-500 scale-125" />
      </label>

      <button type="submit" className="mt-6 w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700">Add Contact</button>
    </>
  );
};