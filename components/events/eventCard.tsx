import React from "react";
import { eventDetails } from "../../types/types";
import dayjs from "dayjs";
import { BsCalendar, BsClockFill } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";
import { TbTrash } from "react-icons/tb";
import Link from "next/link";

var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

type EventCardProps = {
  eventInfo: eventDetails;
  onButtonClick: (data: any) => void;
};

export default function EventCard({
  eventInfo,
  onButtonClick,
}: EventCardProps) {
  // We don't have locations setup in the database just yet,
  // so ignore that part of the design.
  // We have dayJS installed https://day.js.org/en/
  // so look into that for formatting the time in eventInfo.date
  // You can also ignore eventInfo.duration for now since it's not in the design

  return (
    <div className="flex w-full flex-col rounded-md border-[1px] border-cardBorder bg-neutral-800 md:w-[85%] xl:w-[26rem]">
      <div className="flex items-center justify-between border-b-[1px] border-cardBorder px-4 py-3">
        <Link href={`/dashboard/events/${eventInfo.event_id}`}>
          <span className="cursor-pointer font-medium transition-colors hover:text-red-600">
            {eventInfo.title}
          </span>
        </Link>

        <button
          onClick={() => {
            onButtonClick(eventInfo);
          }}
          className="rounded-md border border-transparent p-1 text-gray-300 hover:border-gray-200 hover:text-white"
        >
          <TbTrash className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-wrap gap-y-3 p-4">
        <p className="flex basis-2/3 flex-row items-center gap-2">
          <BsCalendar className="h-[18px] w-[18px]" />

          {dayjs(eventInfo.date).format("MMM D")}
        </p>
        <p className="flex basis-1/3 flex-row items-center gap-2">
          <BsClockFill className="h-[18px] w-[18px]" />
          {dayjs(eventInfo.date).format("LT")}
        </p>

        <p className="flex basis-2/3 flex-row items-center gap-2">
          <HiLocationMarker className="h-[18px] w-[18px]" />
          {eventInfo.location}
        </p>
      </div>
    </div>
  );
}
