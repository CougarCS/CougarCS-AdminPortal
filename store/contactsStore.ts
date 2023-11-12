import create from 'zustand'
import { memberType } from '../types/types';

type contactsStore = {
    contact: memberType;
    setContactInfo: (contact: memberType) => void;
    clearContactInfo: () => void;
}

export const useContactsStore = create<contactsStore>((set) => ({
    contact : {
        contact_id: "",
        uh_id: 0,
        first_name: "",
        last_name: "",
        phone_number: 0,
        email: "",
        shirt_size_id: "",
        timestamp: "",
    },
    setContactInfo: (contact: memberType) => set({ contact }),
    clearContactInfo: () => set({ contact: {
        contact_id: "",
        uh_id: 0,
        first_name: "",
        last_name: "",
        phone_number: 0,
        email: "",
        shirt_size_id: "",
        timestamp: "",
    }})
}))