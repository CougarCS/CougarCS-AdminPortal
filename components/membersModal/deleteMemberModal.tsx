import React, { useState } from "react";
import Modal from "react-modal";
import { memberType } from "../../types/types";
import { TextInput } from "../textInput";
import deleter from "../../utils/deleter";

import { toast } from "sonner";

type deleteMemberModalProps = {
  member: memberType;
  isOpen: boolean;
  setModalOpen: (state: boolean) => void;
};

export const DeleteMemberModal = ({
  isOpen,
  setModalOpen,
  member,
}: deleteMemberModalProps) =>
{
  const [nameConfirm, setNameConfirm] = useState("");

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
          Deleting Contact
        </h1>

        <p className="mt-2 pb-2 text-lg">
          Are you sure you want to delete <span className="font-bold">{member.first_name} {member.last_name}? </span>
        </p>
        <p className="mb-2 pb-2 text-lg">
          Type <span className="font-bold">{member.first_name}</span> into the box below to confirm.
        </p>

        <input
          name="first"
          placeholder="First Name"
          value={nameConfirm}
          onChange={(e) => setNameConfirm(e.target.value)}
          className={"mb-0 h-10 w-full rounded-md border-[1px] border-gray-600 bg-transparent px-3 outline-0 transition-all hover:border-gray-200 focus:border-gray-200"}
        ></input>

        <button disabled={member.first_name !== nameConfirm} className="mt-6 w-full text-white font-semibold text-sm h-9 rounded-sm bg-red-600 hover:bg-red-700"
          onClick={async () =>
          {
            // make api call to /api/members
            const delResp = await deleter("/api/members", member);

            if (delResp.error)
            {
              setModalOpen(false);
              toast.error(`Failed to delete ${member.first_name}: ${delResp.error}`);
              return;
            }
            setModalOpen(false);
            toast.success(`Successfully deleted ${member.first_name}.`);
          }}
        >Delete</button>
      </div>
    </Modal>
  );
};
