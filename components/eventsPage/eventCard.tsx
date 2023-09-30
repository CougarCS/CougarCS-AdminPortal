import React from "react";
import { eventDetails } from "../../types/types";
import router from "next/router";
import dayjs from "dayjs";
import { BsCalendar, BsClockFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

type EventCardProps = {
  event: eventDetails;
};

const EventCard = ({ event }: EventCardProps) => {
  // We don't have locations setup in the database just yet,
  // so ignore that part of the design.
  // We have dayJS installed https://day.js.org/en/
  // so look into that for formatting the time in event.date
  // You can also ignore event.duration for now since it's not in the design

  return (
    <div className="flex w-full flex-col rounded-md border-[1px] border-cardBorder bg-neutral-800 md:w-[85%] xl:w-[26rem]">
      <button
        className="block w-full"
        onClick={() => {
          router.push(`/dashboard/events/${event.event_id}`);
        }}
      >
        <p className="border-b-[1px] border-cardBorder p-4 text-left font-medium">
          {event.title}
        </p>
        <div className="flex flex-wrap gap-y-2 p-4">
          <p className="flex basis-2/3 flex-row items-center gap-2">
            <BsCalendar className="h-[18px] w-[18px]" />

            {dayjs(event.date).format("MMM D")}
          </p>
          <p className="flex basis-1/3 flex-row items-center gap-2">
            <BsClockFill className="h-[18px] w-[18px]" />
            {dayjs(event.date).format("LT")}
          </p>

          <p className="flex basis-2/3 flex-row items-center gap-2">
            <HiLocationMarker className="h-[18px] w-[18px]" />
            TBD
          </p>
        </div>
      </button>
    </div>
  );
};

export default EventCard;
