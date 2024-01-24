import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../../components/layout";
import router from "next/router";
import { TextInput } from "../../components/textInput";
import { toast } from "sonner";
import { Title } from "../../components/title";
import { TextAreaInput } from "../../components/formInput/textareaInput";
import { SelectInput } from "../../components/formInput/selectInput";
import poster from "../../utils/poster";
import { HiArrowLeft } from "react-icons/hi";
import { NumberInput } from "../../components/formInput/numberInput";
import { LabelWrapper } from "../../components/formInput/labelWrapper";
import { ButtonSpinner } from "../../components/loading/buttonSpinner";
import { eventDetails } from "../../types/types";

type eventCreation = Omit<eventDetails, "event_id">;

const AddEvent: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeOfDay, setTimeOfDay] = useState("PM");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formRef = e.currentTarget;

    if (
      !formData.get("title")?.toString() ||
      !formData.get("date")?.toString() ||
      !formData.get("time")?.toString() ||
      !formData.get("cougarCoin")?.toString() ||
      !formData.get("location")?.toString() ||
      !formData.get("description")?.toString()
    ) {
      toast.error(
        `Event Creation Error: Event requires at LEAST a title, date, location, description, time and Cougar Coin value.`
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

    const eventDate = new Date(
      formData.get("date")!.toString().concat(" ", time)
    );

    const eventObj: eventCreation = {
      date: eventDate.toISOString(),
      description: formData.get("description")!.toString(),
      duration: hours + minutes,
      location: formData.get("location")!.toString(),
      point_value: parseInt(formData.get("cougarCoin")!.toString()),
      title: formData.get("title")!.toString(),
    };

    setIsLoading(true);

    const res = await poster("/api/events", eventObj);

    setIsLoading(false);

    if (res.error) {
      toast.error(`Event Creation Error: ${res.description}`);
    } else if (res.data) {
      toast.success("Event created!");

      if (formRef) {
        formRef.reset();
      }
    }
  };

  return (
    <Layout title="Event Creation">
      <Title title="Event Creation" subtitle="Create An Event Here 🥳🎉">
        <button
          onClick={() => router.push("/dashboard/events")}
          className="group mt-1 flex h-9 items-center gap-x-2 pr-3 text-sm text-white"
        >
          <HiArrowLeft className="text-lg" />
          <span className="border-gray-200 group-hover:border-b">
            Back to Events
          </span>
        </button>
      </Title>

      <div className="mx-auto w-full place-content-center xl:w-[42%]">
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

          <TextInput
            className="mt-4"
            name="location"
            label="Location"
            placeholder="PGH 563"
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

          <LabelWrapper className="mt-4" label="Cougar Coin">
            <NumberInput name="cougarCoin" placeholder="5" />
          </LabelWrapper>

          <LabelWrapper className="mt-4" label="Description">
            <TextAreaInput name="description" placeholder="Description" />
          </LabelWrapper>

          <button
            type="submit"
            className="mt-6 h-9 w-full rounded-md bg-red-600 text-sm font-semibold text-white hover:bg-red-700"
            disabled={isLoading}
          >
            {isLoading ? (
              <ButtonSpinner
                height="h-6"
                width="w-6"
                color="text-gray-100"
                fill="fill-black"
              />
            ) : (
              <span>Add Event</span>
            )}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddEvent;
