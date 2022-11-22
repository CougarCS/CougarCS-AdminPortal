import type { NextPage } from "next";
import React, { useState } from 'react';
import { Modal, Button, Group, TextInput, NumberInput, Textarea, Title } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Layout from "../components/layout";
import styles from "../styles/Events.module.css"

// Helen McKay | 11/21/22
  // NOTES: 
    // added loading, error, and errorMessage states so can be used later
    // wasn't sure if eventDate, eventDuration, and eventPoints also need to be converted to strings
    // wasn't sure which fields needed to be "required" so just set all of them to be required
    // apologies if the silly placeholders are too silly, feel free to change them

const EventForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const eventTitle = data.get("eventTitle")?.toString();
    const eventDate = data.get("eventDate");
    const eventDuration = data.get("eventDuration");
    const eventPoints = data.get("eventPoints");
    const eventDescription = data.get("eventDescription")?.toString();

    // FIXME: 
      // send form data to backend
      // deal with the error, errorMessage, and loading states, too
  }

  return(
    <form onSubmit={handleSubmit}>
      <TextInput
        name="eventTitle"
        label="Event Title"
        placeholder="A Really Cool Event's Really Cool Title"
        required
        disabled={loading}
        error={error}
      />
      <DatePicker
        required
        name="eventDate"
        label="Event Date"
        placeholder="A Convenient Date"
        disabled={loading}
        error={error}
      />
      <NumberInput
        required
        name="eventDuration"
        label="Event Duration (in minutes)"
        placeholder="A Length of Time"
        disabled={loading}
        error={error}
      />
      <NumberInput
        required
        name="eventPoints"
        label="Member Point Value"
        placeholder="A Reasonable Amount of Points"
        disabled={loading}
        error={error}
      />
      <Textarea
        required
        name="eventDescription"
        label="Event Description"
        placeholder="An Exciting Description of the Really Cool Event"
        disabled={loading}
        error={error}
      />
      {error && <a className={styles.error}>{errorMessage}</a>}
      <Button 
        type="submit"
        loading={loading}
        color="red"
      >
        Submit
      </Button>
    </form>
  );
}

const CreateEvent = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create Event"
      >
        <EventForm/>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} color="red">Create Event</Button>
      </Group>
    </>
  );
}

const Events: NextPage = () => {
  return(
    <Layout shell title="Events">
      <Title order={1} className={styles.title}>Events</Title>
      {/* FIXME: Implement "Upcoming Events" */}
      <CreateEvent/>
    </Layout>
  );
}

export default Events;
