import { NextPage } from "next";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Layout from "../../components/layout";

import { toast } from "sonner";
import { LoadSpinner } from "../../components/loadingSpinner";
import { Title } from "../../components/title";

import useSWR, { mutate } from "swr";
import fetcher from "../../utils/fetcher";
import EventCard from "../../components/eventsPage/eventCard";
import { eventDetails } from "../../types/types";

const Events: NextPage = () =>
{
  const { data, error, isLoading } = useSWR("/api/events", fetcher);

  if (error)
  {
    toast.error(`Events Error: ${error}`);

    return (
      <Layout>
        <div className="grid h-full place-content-center">
          <h1 className="text-center text-4xl font-bold text-red-600">
            Events Page Error
          </h1>
          <h2 className="mt-2 text-center text-2xl font-medium text-white">
            {error}
          </h2>
        </div>
      </Layout>
    );
  }

  if (data)
  {
    const eventCards = data.map((evnt: eventDetails) => <EventCard event={evnt} />);
    return (
      <Layout title="Events">
        <Title
          title="Events"
          subtitle="Let's get the party started! 🎉 Check event attendance and make new events here.">
          <div className="mt-3"> <button className="px-4 py-2 bg-selectInputBG rounded-md">Add Event</button></div>
        </Title>

        <div className="w-full py-4 mx-auto place-content-center">
          {eventCards}
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Events">
      <div className="grid h-screen place-content-center">
        <LoadSpinner />
      </div>
    </Layout>
  );
};

export default Events;
