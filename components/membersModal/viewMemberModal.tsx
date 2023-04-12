import React, { useState } from "react";
import Modal from "react-modal";
import { MemberInformationModal } from "./memberInformationModal";
import { UpdateMemberModal } from "./updateMemberModal";
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
  const [isUpdatingMember, setIsUpdatingMember] = useState<boolean>(false);

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      onRequestClose={() => setModalOpen(false)}
      className="flex h-screen w-full flex-col items-center justify-center bg-black bg-opacity-80"
      ariaHideApp={false}
    >
      <div className="h-fit w-[30rem] rounded-md bg-sidebarBG p-7 text-white">
        <h1 className="text-4xl">
          {member.first_name} {member.last_name}
        </h1>
        <h2 className="mb-2 border-b-[1px] border-gray-600 pb-2 text-xl">
          ID: {member.uh_id}
        </h2>

        {isUpdatingMember ? (
          <UpdateMemberModal
            setModalOpen={setModalOpen}
            member={member}
            setIsUpdatingMember={setIsUpdatingMember}
          />
        ) : (
          <MemberInformationModal
            setModalOpen={setModalOpen}
            member={member}
            setIsUpdatingMember={setIsUpdatingMember}
          />
        )}
      </div>
    </Modal>
  );
};
