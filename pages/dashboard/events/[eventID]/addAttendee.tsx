import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../../../../components/layout";
import { useRouter } from "next/router";
import { Title } from "../../../../components/title";
import {
  eventDetails,
  memberAttendanceType,
  memberType,
} from "../../../../types/types";
import { TextInput } from "../../../../components/textInput";
import { toast } from "sonner";
import fetcher from "../../../../utils/fetcher";
import poster from "../../../../utils/poster";
import useSWR, { mutate } from "swr";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { SelectInput } from "../../../../components/formInput/selectInput";
import { HiArrowLeft } from "react-icons/hi";

const AddAttendee: NextPage = () => {
  const router = useRouter();

  const [idSearch, setIdSearch] = useState("");
  const [existingContact, setExistingContact] = useState<
    memberType | undefined
  >(undefined);

  const { eventID } = router.query;

  const { data, error, isLoading } = useSWR("/api/members", fetcher);

  const handleExistingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!existingContact) {
      toast.error(`Attendee Add Error: We couldn't find that contact.`);
      return;
    }

    const swag = document.getElementsByName("swagcheck")[0] as HTMLInputElement;
    const result = await poster(`/api/events/${eventID}`, {
      member: existingContact,
      swag: swag.checked,
    });

    if (result.error) {
      toast.error("Failed to add attendee! " + result.description);
      return;
    }
    toast.success("Successfully added attendee!");
    mutate(`/api/events/${eventID}`);
    setIdSearch("");
  };

  // basically the code from /addmember.tsx
  // with some extra stuff at the end to add it to the event
  const handleNewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("first")?.toString() ||
      !formData.get("uhid")?.toString() ||
      !formData.get("last")?.toString()
    ) {
      toast.error(
        `Contact Creation Error: Contact requires at LEAST a first name, last name, and UH ID.`
      );
      return;
    }

    if (
      !parseInt(formData.get("phone")!.toString()) ||
      formData.get("phone")!.toString().includes("-")
    ) {
      toast.error(
        `Contact Creation Error: Rewrite the phone number to use no special characters.`
      );
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
      shirt_size_id: "M",
    };

    // ok to use ! here cause guard statement should catch but TS cries anyway
    // so ! it is
    const contInput: Partial<memberType> &
      Pick<memberType, "uh_id" | "first_name" | "last_name"> = {
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
    const res = await poster(`/api/events/${eventID}`, {
      member: nuMember.data,
      swag: swag.checked,
    });

    if (res.error) {
      toast.error(`Contact Creation Error: ${res.error.message}`);
    } else {
      toast.success("Successfully created and added attendee!");
      mutate(`/api/events/${eventID}`);
      setIdSearch("");
    }
  };

  return (
    <Layout title="Add Attendee">
      <Title title="Add Attendee" subtitle="Look who the coog dragged in! 🤗">
        <button
          onClick={() => router.push(`/dashboard/events/${eventID}`)}
          className="group mt-1 flex h-9 items-center gap-x-2 pr-3 text-sm text-white"
        >
          <HiArrowLeft className="text-lg" />
          <span className="border-gray-200 group-hover:border-b">
            Back to Events
          </span>
        </button>
      </Title>

      <div className="mx-auto w-full place-content-center xl:w-[42%]">
        {/* lil note */}
        {idSearch.length < 7 && (
          <div className="my-4 rounded-sm border border-neutral-500 bg-neutral-700 bg-opacity-10 px-5 py-4">
            <span className="mx-2 block font-semibold">Note</span>
            <ul className="mx-2 list-disc">
              <li className="mt-0.5">
                If the attendee's already logged in the event, you can use this
                page to update their swag status.
              </li>
            </ul>
          </div>
        )}

        {/* contact status */}
        {idSearch.length === 7 && (
          <>
            {existingContact ? (
              <div className="my-4 rounded-sm border border-green-500 bg-green-700 bg-opacity-10 px-4 py-2">
                <span className="mx-2 block font-semibold">Contact Found!</span>
                <ul className="mx-2 list-disc">
                  <li className="mt-0.5">
                    {existingContact.first_name}'s already logged in our system,
                    so you don't have to enter their info.
                  </li>
                </ul>
              </div>
            ) : (
              <div className="my-4 rounded-sm border border-red-500 bg-red-700 bg-opacity-10 px-4 py-2">
                <span className="mx-2 block font-semibold">
                  Contact Not Found!
                </span>
                <ul className="mx-2 list-disc">
                  <li className="mt-0.5">
                    We don't have that contact logged in our system. Please
                    create a new one below:
                  </li>
                </ul>
              </div>
            )}
          </>
        )}

        <form
          onSubmit={existingContact ? handleExistingSubmit : handleNewSubmit}
        >
          <label className="w-full text-sm">
            UH ID
            <input
              className="h-9 w-full rounded-sm border border-zinc-700 bg-zinc-800 px-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              name="uhid"
              placeholder={"UH ID"}
              maxLength={7}
              value={idSearch}
              onChange={(e) => {
                setIdSearch(e.target.value);
                const id = parseInt(e.target.value);
                const memberDat = data as memberType[];

                setExistingContact(
                  memberDat.find((member) => member.uh_id === id)
                );
              }}
            />
          </label>

          {idSearch.length === 7 && (
            <>
              {existingContact ? (
                <ExistingAttendee member={existingContact} />
              ) : (
                <NewAttendee />
              )}
            </>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default AddAttendee;

type ExistingAttendeeProps = {
  member: memberType;
};
const ExistingAttendee = ({ member }: ExistingAttendeeProps) => {
  return (
    <>
      <label>
        <span className="text-md mr-2">Did they receive swag?</span>
        <input
          name="swagcheck"
          type="checkbox"
          className="mt-4 scale-125 accent-red-500"
        />
      </label>

      <button
        type="submit"
        className="mt-6 h-9 w-full rounded-md bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700"
      >
        Add Attendee
      </button>
    </>
  );
};

const NewAttendee = () => {
  const [shirtSize, setShirtSize] = useState("M");
  const shirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <>
      <TextInput
        className="mt-4"
        name="first"
        label="First Name"
        placeholder="Mihir"
      />
      <TextInput
        className="mt-4"
        name="last"
        label="Last Name"
        placeholder="Sahu"
      />
      <TextInput
        className="mt-4"
        name="phone"
        label="Phone"
        placeholder="0123456789"
      />
      <TextInput
        className="mt-4"
        name="email"
        label="Email"
        placeholder="mihir_here@uh.edu"
      />

      <label className="mt-4 flex w-fit items-center gap-x-2">
        <span className="text-sm">Shirt Size</span>
        <SelectInput
          name="shirt"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setShirtSize(e.target.value);
          }}
          options={shirtSizeOptions}
          value={shirtSize}
          height="h-fit"
          width="w-18"
          textSize="text-md"
          ariaLabel="Update shirt size"
        />
      </label>

      <label>
        <span className="text-md mr-2">Did they receive swag?</span>
        <input
          name="swagcheck"
          type="checkbox"
          className="mt-4 scale-125 accent-red-500"
        />
      </label>

      <button
        type="submit"
        className="mt-6 h-9 w-full rounded-md bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700"
      >
        Add Contact
      </button>
    </>
  );
};
