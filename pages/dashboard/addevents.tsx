import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/layout";
import router, { useRouter } from "next/router";

import { TextInput } from "../../components/textInput";
import { toast } from "sonner";
import { LoadSpinner } from "../../components/loadingSpinner";
import { Title } from "../../components/title";
import { memberType, eventDetails } from "../../types/types";
import { TextAreaInput } from "../../components/textareaInput";
import { SelectInput } from "../../components/selectInput";
import poster from "../../utils/poster";
import { HiArrowLeft } from "react-icons/hi";
import { NumberInput } from "../../components/numberInput";
import { LabelWrapper } from "../../components/labelWrapper";

type eventCreation = {
  date: string;
  description: string;
  duration: number;
  point_value: number | string;
  time: string;
  title: string;
};

const AddEvent: NextPage = () => {
  const supabase = useSupabaseClient();
  const [loading, setLoading] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("PM");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (
      !formData.get("title")?.toString() ||
      !formData.get("description")?.toString() ||
      !formData.get("date")?.toString() ||
      !formData.get("time")?.toString() ||
      (!formData.get("hours")?.toString() &&
        !formData.get("minutes")?.toString()) ||
      !formData.get("pointValue")?.toString()
    ) {
      toast.error(
        `Event Creation Error: Contact requires at LEAST a title, description, date, duration, and point value.`
      );
      return;
    }

    const dateFormatRegex =
      /^(0?[1-9]|1[0-2])\/(0?[1-9]|[12][0-9]|3[01])\/\d{4}$/;

    const timeFormatRegex = /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    if (!dateFormatRegex.test(formData.get("date")!.toString())) {
      toast.error(
        `Event Creation Error: Date must be in the format MM/DD/YYYY.`
      );
      return;
    }

    if (!timeFormatRegex.test(formData.get("time")!.toString())) {
      toast.error(`Event Creation Error: Time must be in the format HH:MM`);
      return;
    }

    const hours = formData.get("hours")
      ? parseInt(formData.get("hours")!.toString()) * 60
      : 0;
    const minutes = formData.get("minutes")
      ? parseInt(formData.get("minutes")!.toString())
      : 0;
    const time = formData
      .get("time")!
      .toString()
      .concat(" ", formData.get("timeOfDay")!.toString());

    const eventObj: eventCreation = {
      date: new Date(formData.get("date")!.toString()).toISOString(),
      description: formData.get("description")!.toString(),
      duration: hours + minutes,
      point_value: parseInt(formData.get("pointValue")!.toString()),
      time: time,
      title: formData.get("title")!.toString(),
    };

    console.log(eventObj);
    toast.success("Event created!");
  };

  return (
    <Layout title="Event Creation">
      <Title title="Event Creation" subtitle="Create An Event Here 🥳🎉">
        <button
          onClick={() => router.push("/dashboard/events")}
          className="mt-1 flex h-9 items-center gap-x-2 py-2 pr-3 text-sm font-medium text-white"
        >
          <HiArrowLeft className="text-lg" />
          <span>Back to Events</span>
        </button>
      </Title>

      <div className="mx-auto w-full place-content-center xl:w-[40%]">
        <form onSubmit={handleSubmit}>
          <TextInput
            className="mt-4"
            name="title"
            label="Title"
            placeholder="Event Title"
          />

          <TextInput
            className="mt-4"
            name="date"
            label="Date"
            placeholder="MM/DD/YYYY"
          />

          <LabelWrapper className="mt-4" label="Time">
            <div className="flex w-full items-center gap-4">
              <input
                type="text"
                name="time"
                placeholder="HH:MM"
                className="h-9 w-4/5 rounded-sm border border-zinc-700 bg-zinc-800 px-4 text-sm placeholder:text-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />

              <SelectInput
                name="timeOfDay"
                options={["AM", "PM"]}
                value={timeOfDay}
                onChange={(e) => setTimeOfDay(e.target.value)}
                height="h-9"
                width="w-1/5"
                textSize="text-md"
                ariaLabel="Update time of day"
              />
            </div>
          </LabelWrapper>

          <LabelWrapper className="mt-4" label="Duration">
            <div className="flex w-full gap-4">
              <div className="flex w-1/2">
                <NumberInput name="hours" units="hr" placeholder="1" />
              </div>

              <div className="flex w-1/2">
                <NumberInput name="minutes" units="min" placeholder="30" />
              </div>
            </div>
          </LabelWrapper>

          <LabelWrapper className="mt-4" label="Point Value">
            <NumberInput name="pointValue" placeholder="5" />
          </LabelWrapper>

          <LabelWrapper className="mt-4" label="Description">
            <TextAreaInput name="description" placeholder="Description" />
          </LabelWrapper>

          <button
            type="submit"
            className="mt-6 h-9 w-full rounded-sm bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
          >
            Add Event
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddEvent;
