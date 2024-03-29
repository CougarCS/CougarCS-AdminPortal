import { NextPage } from "next";
import React, { useState } from "react";
import Layout from "../../components/layout";
import { toast } from "sonner";
import { LoadSpinner } from "../../components/loadingSpinner";
import { Title } from "../../components/title";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import EventCard from "../../components/events/eventCard";
import { eventDetails } from "../../types/types";
import { useRouter } from "next/router";
import { BaseModal } from "../../components/modal/baseModal";
import { DeleteEventView } from "../../components/modal/deleteEventView";
import { useEventInfoStore } from "../../store/eventInfoStore";

const Events: NextPage = () => {
  const { data, error } = useSWR("/api/events", fetcher);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { eventInfo, setEventInfoState } = useEventInfoStore();

  if (error) {
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

  if (data) {
    const eventCards = data.map((evnt: eventDetails, i: number) => (
      <EventCard
        key={i}
        eventInfo={evnt}
        onButtonClick={(modalData) => {
          setModalOpen(true);
          setEventInfoState(modalData);
        }}
      />
    ));

    return (
      <Layout title="Events">
        <Title
          title="Events"
          subtitle="Let's get the party started! 🎉 Check event attendance and make new events here."
        >
          <div className="mt-3">
            <button
              className="rounded-md bg-selectInputBG px-4 py-2 transition-colors hover:bg-hoverBG"
              onClick={() => router.push("/dashboard/addevents")}
            >
              <span className="text-sm font-semibold">Add Event</span>
            </button>
          </div>
        </Title>

        <BaseModal open={modalOpen} setOpen={setModalOpen}>
          <DeleteEventView data={eventInfo} setOpen={setModalOpen} />
        </BaseModal>

        <div className="mt-6 flex min-w-full flex-wrap gap-7">{eventCards}</div>
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
