import { useEventAttendeeStore } from "../../../store/eventAttendeeStore";
import { Dialog } from "@headlessui/react";
import dayjs from "dayjs";

export const ViewEventAttendee = () => {
  const { attendee } = useEventAttendeeStore();

  const eventAttendedDate = dayjs(attendee.event_timestamp).format(
    "MM-DD-YYYY"
  );

  const eventAttendedTime = dayjs(attendee.event_timestamp).format("h:mm[ ]A");

  return (
    <>
      <Dialog.Title className="mb-10 text-4xl font-bold leading-6">
        <p className="mb-4">{attendee.first_name}</p>
        <p>{attendee.last_name}</p>
      </Dialog.Title>

      <div className="mb-12 flex flex-col gap-7">
        <div>
          <p className="text-gray-200">UH ID</p>
          <p className="text-xl">{attendee.uh_id}</p>
        </div>

        <div>
          <p className="text-gray-200">Email</p>
          <p className="text-xl">{attendee.email}</p>
        </div>

        <div>
          <p className="text-gray-200">Phone</p>
          <p className="text-xl">{attendee.phone_number}</p>
        </div>

        <div>
          <p className="text-gray-200">Event Date</p>
          <p className="text-xl">{eventAttendedDate}</p>
        </div>

        <div>
          <p className="text-gray-200">Checked In</p>
          <p className="text-xl">{eventAttendedTime}</p>
        </div>

        <div>
          <p className="text-gray-200">Acquired Swag</p>
          <p className="text-xl">{attendee.swag ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="mb-12 flex h-28 w-full flex-col items-center justify-center border border-green-600 bg-green-900 bg-opacity-10">
        <p className="text-xl font-medium">Member</p>
        <p className="text-xl">
          Via <span className="font-bold">Stripe</span>
        </p>
      </div>
    </>
  );
};
