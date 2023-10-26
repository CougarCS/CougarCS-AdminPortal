import { useState } from "react";
import { ViewContactInfo } from "./viewContactInfo";
import { EditContactInfo } from "./editContactInfo";
import { useContactsStore } from "../../../store/contactsStore";

export const ContactsController = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { contact } = useContactsStore();

  return (
    <>
      {isEditing ? (
        <EditContactInfo contact={contact} setIsEditing={setIsEditing} />
      ) : (
        <ViewContactInfo contact={contact} setIsEditing={setIsEditing} />
      )}
    </>
  );
};
