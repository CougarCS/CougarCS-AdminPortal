import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/layout";
import router, { useRouter } from "next/router";

import { TextInput } from "../../components/textInput";
import { toast } from "sonner";
import { LoadSpinner } from "../../components/loadingSpinner";
import { Title } from "../../components/title";
import { SelectInput } from "../../components/selectInput";
import { memberType } from "../../types/types";

import poster from "../../utils/poster";

import { AiOutlineArrowLeft } from "react-icons/ai";

const AddMember: NextPage = () => {
  const supabase = useSupabaseClient();
  const [shirtSize, setShirtSize] = useState("M");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    // ok to use ! here cause the guard statement should catch but TS cries anyway
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

    setLoading(true);

    const res = await poster("/api/members", contactObj);

    setLoading(false);

    if (res.error) toast.error(`Contact Creation Error: ${res.error.message}`);
    else if (res.data) toast.success("Contact created!");
  };

  const shirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <Layout title="Contact Creation">
      <Title title="Contact Creation" subtitle="Establish First Contact 👽🛸">
        <button
          onClick={() => router.push("/dashboard/members")}
          className="flex h-9 items-center gap-x-2 py-2 pr-3 text-sm font-medium text-white"
        >
          <AiOutlineArrowLeft className="text-lg" />
          <span>Back to Contacts</span>
        </button>
      </Title>

      <div className="mx-auto w-5/12 place-content-center">
        <form onSubmit={handleSubmit}>
          <TextInput
            className="mt-4"
            name="uhid"
            label="UH ID"
            placeholder="1234567"
          />
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

          <div className="mt-4 flex gap-x-2">
            <span>Shirt size</span>
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
          </div>

          <button
            type="submit"
            className="mt-6 h-9 w-full rounded-sm bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
          >
            Add Contact
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddMember;
