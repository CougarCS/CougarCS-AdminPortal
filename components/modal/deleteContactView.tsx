import { useState } from "react";
import type { memberType } from "../../types/types";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { Dialog } from "@headlessui/react";
import deleter from "../../utils/deleter";
import { toast } from "sonner";

type DeleteContactViewProps = {
  contact: memberType;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteContactView = ({
  contact,
  setOpen,
}: DeleteContactViewProps) => {
  const [nameConfirm, setNameConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    // make api call to /api/members

    setIsLoading(true);
    const delResp = await deleter("/api/members", contact);

    if (delResp.error) {
      setOpen(false);
      toast.error(`Failed to delete ${contact.first_name}: ${delResp.error}`);
      return;
    }

    setIsLoading(false);
    setOpen(false);
    toast.success(`Successfully deleted ${contact.first_name}.`);
  }

  return (
    <>
      <div className="bg-mainBG px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <BsExclamationTriangleFill
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>

          <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-white"
            >
              Delete {contact.first_name} {contact.last_name}'s Contact?
            </Dialog.Title>
            <div className="mt-2 w-full">
              <p className="mb-3 text-sm text-gray-300">
                Type <span className="font-bold">{contact.first_name}</span>{" "}
                into the box below to confirm.
              </p>

              <input
                name="first"
                placeholder="First Name"
                value={nameConfirm}
                onChange={(e) => setNameConfirm(e.target.value)}
                className={
                  "mb-0 h-9 w-full rounded-sm border-[1px] border-gray-600 bg-transparent px-3 text-gray-100 outline-0 transition-all hover:border-gray-200 focus:border-gray-200"
                }
              ></input>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-mainBG px-4 pt-4 pb-5 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 disabled:bg-gray-700 disabled:bg-opacity-40 disabled:text-gray-400 disabled:text-opacity-40 disabled:hover:cursor-not-allowed sm:ml-4 sm:w-auto"
          onClick={handleDelete}
          disabled={contact.first_name !== nameConfirm || isLoading}
        >
          Delete
        </button>

        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-selectInputBG px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-transparent hover:bg-hoverBG sm:mt-0 sm:w-auto"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </div>
    </>
  );
};
