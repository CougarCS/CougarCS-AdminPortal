import { Dialog } from "@headlessui/react";
import { BsExclamationTriangleFill } from "react-icons/bs";
import deleter from "../../utils/deleter";
import { toast } from "sonner";
import { useEventInfoStore } from "../../store/eventInfoStore";
import { mutate } from "swr";
import type { eventDetails } from "../../types/types";

type deleteEventViewProps = {
  data: eventDetails;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DeleteEventView = ({ data, setOpen }: deleteEventViewProps) => {
  const { clearEventState } = useEventInfoStore();

  async function handleDelete() {
    const res = await deleter(`/api/events`, data);
    console.log(res);

    if (res !== null && res.error) {
      toast.error(res.description);
      return;
    }

    mutate("/api/events");

    setOpen(false);
    clearEventState();
    toast.success(`Successfully deleted ${data.title}.`);
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
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-white"
            >
              Delete {data.title}
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-300">
                Are you sure you want to delete this event? This action cannot
                be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-mainBG px-4 pt-4 pb-5 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 sm:ml-4 sm:w-auto"
          onClick={handleDelete}
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
