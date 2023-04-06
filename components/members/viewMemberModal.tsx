import React, { useState } from "react";
import Modal from "react-modal";
import { viewMemberModalProps } from "../../types/types";

export const ViewMemberModal = ({
  isOpen,
  setModalOpen,
  member,
}: viewMemberModalProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // You can access member values like I do in the h2 element
  const timestamp = member.timestamp.slice(0, member.timestamp.search("T"));

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={() => setModalOpen(false)}
      className="bg-opacity-8 flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-80"
      ariaHideApp={false}
    >
      <div className="h-fit w-fit min-w-[30rem] max-w-xl rounded-md bg-sidebarBG p-7 text-white">
        <h1 className="text-4xl">
          {member.first_name} {member.last_name}
        </h1>
        <h2 className="mb-2 text-xl">ID: {member.uh_id}</h2>

        <div className="mb-14 flex flex-col gap-2">
          <p className="text-xl">Phone #: {member.phone_number}</p>
          <p className="text-xl">Email: {member.email}</p>
          <p className="text-xl">Shirt Size: {member.shirt_size_id}</p>
          <p className="text-xl">Timestamp: {timestamp}</p>
          <p className="text-xl">Member since: {timestamp}</p>
          <p className="text-xl">Cougar Coins: 0</p>
        </div>

        <div className="flex items-center justify-end gap-6">
          <button
            onClick={() => {
              setIsEditing((prev) => !prev);
            }}
            className="w-20 rounded-lg bg-gray-200 px-4 py-[3px] text-xl font-medium text-gray-800"
          >
            Edit
          </button>
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="w-20 rounded-lg bg-red-600 px-4 py-[3px] text-lg font-medium text-white"
          >
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
};
