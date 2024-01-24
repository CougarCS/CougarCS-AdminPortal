import { eventDetails } from "../types/types";
import create from 'zustand'

type eventInfoStore = {
  eventInfo: eventDetails;
  setEventInfoState: (event: eventDetails) => void;
  clearEventState: () => void;
};

export const useEventInfoStore = create<eventInfoStore>((set) => ({
    eventInfo: {
    event_id: "",
    title: "",
    description: "",
    date: "",
    duration: 0,
    location: "",
    point_value: 0,
  },
  setEventInfoState: (eventInfo: eventDetails) => set({ eventInfo }),
  clearEventState: () => set({
    eventInfo: {
        event_id: "",
        title: "",
        description: "",
        date: "",
        duration: 0,
        location: "",
        point_value: 0,
    },
}),
}));
