import React from "react";
import Modal from "react-modal";
import { viewMemberModalProps } from "../../types/types";

export const ViewMemberModal = ({ isOpen, setModalOpen, member }: viewMemberModalProps) =>
{
  // You can access member values like I do in the h2 element

  return (
    <Modal isOpen={isOpen} shouldCloseOnEsc shouldCloseOnOverlayClick onRequestClose={() => setModalOpen(false)}
      className="flex flex-col w-full h-screen items-center justify-center">
      <div className="w-3/5 h-fit px-20 py-10 bg-black text-white">
        <h1>test</h1>
        <h2>{member.first_name}</h2>
      </div>
    </Modal>
  );
};