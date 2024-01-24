import { memberType } from "../../../types/types";
import { Dialog } from "@headlessui/react";
import dayjs from "dayjs";

type contactInfoProps = {
  contact: memberType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ViewContactInfo = ({
  contact,
  setIsEditing,
}: contactInfoProps) => {
  const contactCreatedDate = dayjs(contact.timestamp).format("MM-DD-YYYY");

  return (
    <>
      <Dialog.Title className="mb-10 text-4xl font-bold leading-6">
        <p className="mb-4">{contact.first_name}</p>
        <p>{contact.last_name}</p>
      </Dialog.Title>

      <div className="mb-12 flex flex-col gap-7">
        <div>
          <p>UH ID</p>
          <p className="text-xl">{contact.uh_id}</p>
        </div>

        <div>
          <p>Email</p>
          <p className="text-xl">{contact.email}</p>
        </div>

        <div>
          <p>Phone</p>
          <p className="text-xl">{contact.phone_number}</p>
        </div>

        <div>
          <p>Shirt Size</p>
          <p className="text-xl">{contact.shirt_size_id}</p>
        </div>

        <div>
          <p>Contact Created</p>
          <p className="text-xl">{contactCreatedDate}</p>
        </div>
      </div>

      <div className="mb-10 flex h-28 w-full flex-col items-center justify-center border border-green-600 bg-green-900 bg-opacity-10">
        <p className="text-xl font-medium">Member</p>
        <p className="text-xl">
          Via <span className="font-bold">Stripe</span>
        </p>
      </div>

      <div className="flex w-full items-center justify-center">
        <button
          onClick={() => {
            setIsEditing(true);
          }}
          className="h-10 w-20 rounded-md bg-selectInputBG px-4 py-2 text-sm font-medium transition-colors hover:bg-hoverBG"
        >
          Edit
        </button>
      </div>
    </>
  );
};
