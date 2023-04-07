import React, { useState } from "react";
import Modal from "react-modal";
import { MemberModalInformation } from "./memberModalInformation";
import { memberType } from "../../types/types";

type viewMemberModalProps = {
  member: memberType;
  isOpen: boolean;
  setModalOpen: (state: boolean) => void;
};

export const ViewMemberModal = ({
  isOpen,
  setModalOpen,
  member,
}: viewMemberModalProps) => {
  const [editingMember, setEditingMember] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={() => setModalOpen(false)}
      className="flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-80"
      ariaHideApp={false}
    >
      <div className="h-fit w-fit min-w-[30rem] max-w-xl rounded-md bg-sidebarBG p-7 text-white">
        <h1 className="text-4xl">
          {member.first_name} {member.last_name}
        </h1>
        <h2 className="mb-2 text-xl">ID: {member.uh_id}</h2>

        <MemberModalInformation
          setModalOpen={setModalOpen}
          member={member}
          setEditingMember={setEditingMember}
        />
      </div>
    </Modal>
  );
};
