import React from "react";
import { memberType } from "../../types/types";

type memberInformationModalProps = {
  member: memberType;
  setModalOpen: (state: boolean) => void;
  setEditingMember: (state: boolean) => void;
};

export const MemberInformationModal = ({
  setEditingMember,
  setModalOpen,
  member,
}: memberInformationModalProps) => {
  const timestamp = member.timestamp.slice(0, member.timestamp.search("T"));

  return (
    <>
      <div className="mb-14 flex flex-col gap-2 text-xl">
        <p>Phone #: {member.phone_number}</p>
        <p>Email: {member.email}</p>
        <p>Shirt Size: {member.shirt_size_id}</p>
        <p>Timestamp: {timestamp}</p>
        <p>Member since: {timestamp}</p>
        <p>Cougar Coins: 0</p>
      </div>
      <div className="flex items-center justify-end gap-6">
        <button
          onClick={() => {
            setEditingMember(true);
          }}
          className="w-20 rounded-lg bg-gray-200 px-4 py-[3px] text-xl font-medium text-gray-800 transition-colors hover:bg-gray-300"
        >
          Edit
        </button>
        <button
          onClick={() => {
            setModalOpen(false);
          }}
          className="w-20 rounded-lg bg-red-600 px-4 py-[3px] text-lg font-medium text-white transition-colors hover:bg-red-700"
        >
          Done
        </button>
      </div>
    </>
  );
};
