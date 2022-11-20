import type { NextPage } from "next";
import React, { useState } from 'react';
import { Modal, Button, Group } from '@mantine/core';
import { DefaultDeserializer } from 'v8';
import Layout from "../components/layout";

// TO-DO:
  // capture the field changes into some type of local state
    // instead of having state all together, each field will get its own handler bc why not
  // will need to figure out where that info is going (later)

// referring to this for form state stuff: https://stackoverflow.com/questions/53519578/forms-as-functional-components-with-react

const EventForm = () => {
  // const [eventTitle, setEventTitle] = useState("");
  // const [eventDate, setEventDate] = useState("");
  // const [eventDuration, setEventDuration] = useState("");
  // const [eventPoints, setEventPoints] = useState("");
  // const [eventDescription, setEventDescription] = useState("");

  // const [inputField, setInputField] = useState({
  //   eventTitle: '',
  //   eventDate: '',
  //   eventDuration: '',
  //   eventPoints: '',
  //   eventDescription: ''
  // })

  // const inputsHandler = ( e : React.FormEvent<HTMLInputElement>): void => {
  //   setInputField( {0: "bob"});
  // }

  // const inputsTextAreaHandler = (e : React.FormEvent<HTMLTextAreaElement>) => {
  //   setInputField({eventDescription : e.currentTarget.value});
  // }

  return(
    <form onSubmit={e => e.preventDefault()}>
      <div>
        <label>Event title: </label><input type="text" name="eventTitle" value={inputField.eventTitle} onChange={inputsHandler}/>
      </div>
      <div>
        <label>Event date: </label><input type="date" name="eventDate" value={inputField.eventDate} onChange={inputsHandler}/>
      </div>
      <div>
        <label>Event duration: </label><input type="number" name="eventDuration" value={inputField.eventDuration} onChange={inputsHandler}/> <label>mins</label>
      </div>
      <div>
        <label>Member point value: </label><input type="number" name="eventPoints" value={inputField.eventPoints} onChange={inputsHandler}></input>
      </div>
      {/* // <div>
      //   <label>Event description: </label><textarea name="eventDescription" value={inputField.eventDescription} onChange={e => inputsTextAreaHandler(e)}></textarea>
      // </div> */}
      <input type="submit"/>
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
        <Button onClick={() => setOpened(true)}>Create Event</Button>
      </Group>
    </>
  );
}

const Events: NextPage = () => {
  return(
    <Layout shell>
      <h1>Events</h1>
      <h2>Upcoming Events</h2>
      <CreateEvent/>
    </Layout>
  );
}

export default Events;
