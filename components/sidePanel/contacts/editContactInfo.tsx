import { useState } from "react";
import { memberType } from "../../../types/types";
import { Dialog } from "@headlessui/react";
import { TextInput } from "../../formInput/textInput";
import { NumberInput } from "../../formInput/numberInput";
import { SelectInput } from "../../formInput/selectInput";
import { LabelWrapper } from "../../formInput/labelWrapper";
import fetcher from "../../../utils/fetcher";
import putter from "../../../utils/putter";
import useSWR from "swr";
import { toast } from "sonner";
import { useContactsStore } from "../../../store/contactsStore";
import dayjs from "dayjs";
import { LoadSpinner } from "../../loadingSpinner";

type contactInfoProps = {
  contact: memberType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

type contactInfoForm = {
  uh_id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  shirt_size_id: string;
};

type updateContactDB = {
  contact_id: string;
  uh_id: number;
  first_name: string;
  last_name: string;
  phone_number: number;
  email: string;
  shirt_size_id: string;
};

export const EditContactInfo = ({
  contact,
  setIsEditing,
}: contactInfoProps) => {
  const { data, mutate } = useSWR("/api/members", fetcher);

  const [contactInfoForm, setContactInfoForm] = useState<contactInfoForm>({
    uh_id: contact.uh_id ? contact.uh_id.toString() : "",
    first_name: contact.first_name,
    last_name: contact.last_name,
    email: contact.email,
    phone_number: contact.phone_number ? contact.phone_number.toString() : "",
    shirt_size_id: contact.shirt_size_id,
  });

  const { setContactInfo } = useContactsStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setContactInfoForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (contactInfoForm.uh_id.length !== 7) {
      toast.error(`Contact Update Error: UH ID must be 7 digits.`);
      return;
    }

    if (contactInfoForm.phone_number.length !== 10) {
      toast.error(`Contact Update Error: Phone number must be 10 digits.`);
      return;
    }

    setIsLoading(true);

    const updatedContactInfo: updateContactDB = {
      uh_id: parseInt(contactInfoForm.uh_id),
      contact_id: contact.contact_id,
      first_name: contactInfoForm.first_name,
      last_name: contactInfoForm.last_name,
      email: contactInfoForm.email,
      phone_number: parseInt(contactInfoForm.phone_number),
      shirt_size_id: contactInfoForm.shirt_size_id,
    };

    const res = await putter("/api/members", updatedContactInfo);

    setIsLoading(false);

    if (res.error) {
      toast.error(`Contact Update Error: ${res.description}`);
      return;
    }

    const returnedContactInfo: memberType = res.data[0];

    const updatedCacheData = data.map((member: memberType) => {
      if (returnedContactInfo.contact_id === member.contact_id) {
        return returnedContactInfo;
      }
      return member;
    });

    mutate(updatedCacheData, false);
    setContactInfo({ ...updatedContactInfo, timestamp: contact.timestamp });

    toast.success(
      `Successfully updated ${returnedContactInfo.first_name} ${returnedContactInfo.last_name}'s contact information.`
    );
  };

  const shirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const contactCreatedDate = dayjs(contact.timestamp).format("MM-DD-YYYY");

  const compareObjects = (objToBeCompared: any, objComparer: any) => {
    return Object.keys(objToBeCompared).every((key) => {
      return objToBeCompared[key] == objComparer[key];
    });
  };

  if (isLoading) {
    return (
      <div className="mb-2 flex h-full items-center justify-center">
        <LoadSpinner />
      </div>
    );
  }

  return (
    <>
      <Dialog.Title className="mb-10 text-4xl font-bold leading-6">
        <p className="mb-4">{contact.first_name}</p>
        <p>{contact.last_name}</p>
      </Dialog.Title>

      <form onSubmit={handleSubmit}>
        <div className="mb-2 flex h-[30rem] flex-col gap-5">
          <LabelWrapper label="UH ID">
            <NumberInput
              name="uh_id"
              placeholder="1234567"
              value={contactInfoForm.uh_id}
              onChange={handleChange}
            />
          </LabelWrapper>

          <LabelWrapper label="First Name">
            <TextInput
              name="first_name"
              placeholder="John"
              value={contactInfoForm.first_name}
              onChange={handleChange}
            />
          </LabelWrapper>

          <LabelWrapper label="Last Name">
            <TextInput
              name="last_name"
              placeholder="Doe"
              value={contactInfoForm.last_name}
              onChange={handleChange}
            />
          </LabelWrapper>

          <LabelWrapper label="Email">
            <TextInput
              name="email"
              placeholder="mihir@gmail.com"
              value={contactInfoForm.email}
              onChange={handleChange}
            />
          </LabelWrapper>

          <LabelWrapper label="Phone">
            <NumberInput
              name="phone_number"
              placeholder="1234567890"
              value={contactInfoForm.phone_number}
              onChange={handleChange}
            />
          </LabelWrapper>

          <LabelWrapper className="w-1/5" label="Shirt Size">
            <SelectInput
              name="shirt_size_id"
              onChange={handleChange}
              options={shirtSizeOptions}
              value={contactInfoForm.shirt_size_id}
              height="h-9"
              width="w-full"
              textSize="text-md"
              ariaLabel="Update shirt size"
            />
          </LabelWrapper>
        </div>

        <div className="mb-8">
          <p>Contact Created</p>
          <p className="text-xl">{contactCreatedDate}</p>
        </div>

        <div className="flex items-center justify-end gap-6">
          <button
            className="h-10 w-20 rounded-md bg-selectInputBG px-4 py-2 text-sm font-medium transition-colors hover:bg-hoverBG"
            aria-label="Cancel editing"
            type="button"
            onClick={() => {
              setIsEditing(false);
            }}
            disabled={isLoading}
          >
            Cancel
          </button>

          <button
            className="h-10 w-32 rounded-md bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:bg-gray-700 disabled:bg-opacity-40 disabled:text-gray-400 disabled:text-opacity-40 disabled:hover:cursor-not-allowed"
            type="submit"
            aria-label="Save contact information"
            disabled={isLoading || compareObjects(contactInfoForm, contact)}
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};
