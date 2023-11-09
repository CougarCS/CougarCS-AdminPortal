import { memberType } from "../../../types/types";
import { Dialog } from "@headlessui/react";

type ContactInfoProps = {
  contact: memberType;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ViewContactInfo = ({
  contact,
  setIsEditing,
}: ContactInfoProps) => {
  const contactCreatedDate = new Date(contact.timestamp);
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  } as const;
  const formattedDate = contactCreatedDate.toLocaleDateString(
    "en-US",
    dateOptions
  );

  return (
    <div>
      <Dialog.Title className="mb-10 text-4xl font-bold leading-6 ">
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
          <p>Contact Logged</p>
          <p className="text-xl">{formattedDate}</p>
        </div>
      </div>

      <div className="mb-12 flex h-28 w-full flex-col items-center justify-center border border-green-600 bg-green-900 bg-opacity-10">
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
          className="w-28 rounded-sm bg-selectInputBG px-4 py-2 font-medium transition-colors hover:bg-hoverBG"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
