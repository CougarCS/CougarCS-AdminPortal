import React from 'react';
import { eventDetails } from '../../types/types';
import router from 'next/router';

type EventCardProps = {
  event: eventDetails;
};

const EventCard = ({ event }: EventCardProps) =>
{
  // We don't have locations setup in the database just yet,
  // so ignore that part of the design.
  // We have dayJS installed https://day.js.org/en/ 
  // so look into that for formatting the time in event.date
  // You can also ignore event.duration for now since it's not in the design

  return (
    <div className="flex flex-col bg-neutral-800 mb-4">
      <button className='block w-full' onClick={() => { router.push(`/dashboard/events/${event.event_id}`); }}>
        <p>
          {event.title}
        </p>
      </button>
    </div >
  );
};

export default EventCard;
