import create from 'zustand'
import { memberAttendanceType } from "../types/types";

type eventAttendeeStore = {
  attendee: memberAttendanceType;
  setAttendeeState: (attendee: memberAttendanceType) => void;
  clearAttendeeState: () => void;
};

export const useEventAttendeeStore = create<eventAttendeeStore>((set) => ({
  attendee: {
    contact_id: "",
    uh_id: 0,
    first_name: "",
    last_name: "",
    phone_number: 0,
    email: "",
    shirt_size_id: "",
    timestamp: "",
    event_id: "",
    swag: false,
    event_timestamp: "",
  },
  setAttendeeState: (attendee: memberAttendanceType) => set({ attendee }),
  clearAttendeeState: () =>
    set({
      attendee: {
        contact_id: "",
        uh_id: 0,
        first_name: "",
        last_name: "",
        phone_number: 0,
        email: "",
        shirt_size_id: "",
        timestamp: "",
        event_id: "",
        swag: false,
        event_timestamp: "",
      },
    }),
}));