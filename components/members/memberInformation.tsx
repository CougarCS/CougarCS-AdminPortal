import React from "react";
import { viewMemberModalProps } from "../../types/types";

export const MemberInformation = ({
  setEditingMember,
  setModalOpen,
  member,
}: viewMemberModalProps) => {
  const timestamp = member.timestamp.slice(0, member.timestamp.search("T"));

  return (
    <>
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
            setEditingMember(true);
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
    </>
  );
};
