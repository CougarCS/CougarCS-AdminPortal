import React, { useState } from "react";
import { memberType } from "../../types/types";
import { SelectInput } from "../selectInput";
import { toast } from "sonner";
import fetcher from "../../utils/fetcher";
import putter from "../../utils/putter";
import useSWR, { mutate } from "swr";

type updateMemberModalProps = {
  member: memberType;
  setModalOpen: (state: boolean) => void;
  setIsUpdatingMember: (state: boolean) => void;
};

type updateMemberInformation = {
  phone_number: number;
  email: string;
  shirt_size_id: string;
};

export const UpdateMemberModal = ({
  setIsUpdatingMember,
  setModalOpen,
  member,
}: updateMemberModalProps) => {
  const timestamp = member.timestamp;

  const [memberInfo, setMemberInfo] = useState<updateMemberInformation>({
    email: member.email,
    phone_number: member.phone_number,
    shirt_size_id: member.shirt_size_id,
  });

  const { data } = useSWR("/api/members", fetcher);

  function handleChange(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) {
    const { value, name } = e.target;
    setMemberInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function onSubmit() {
    try {
      const updatedMemberInfo: memberType = {
        ...member,
        email: memberInfo.email,
        phone_number: memberInfo.phone_number,
        shirt_size_id: memberInfo.shirt_size_id,
      };

      const res = await putter("/api/members", updatedMemberInfo);

      if (res.error) {
        throw new Error(`Update Error: ${res.description}`);
      }

      const returnedMemberInfo: memberType = res.data[0];

      const updatedMemberCacheData = data.map((member: memberType) => {
        if (returnedMemberInfo.contact_id === member.contact_id) {
          return returnedMemberInfo;
        }
        return member;
      });

      mutate("/api/members", updatedMemberCacheData, false);

      setIsUpdatingMember(false);
      setModalOpen(false);
      toast.success(`Successfully updated ${returnedMemberInfo.first_name}.`);
    } catch (error) {
      const err = error as string;
      return toast.error(err);
    }
  }

  const shirtSizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

  const inputCSS =
    "mb-2 h-10 w-full rounded-md border-[1px] border-gray-600 bg-transparent px-3 outline-0 transition-all hover:border-gray-200 focus:border-gray-200";
  const buttonCSS = "rounded-lg px-4 py-[3px] font-medium transition-colors";
  return (
    <>
      <div className="mt-4 mb-14 flex flex-col gap-2 text-xl">
        <input
          name="phone_number"
          value={memberInfo.phone_number}
          onChange={handleChange}
          className={inputCSS}
        ></input>

        <input
          name="email"
          value={memberInfo.email}
          onChange={handleChange}
          className={inputCSS}
        ></input>

        <div className="flex items-center">
          <p className="mr-2">Shirt Size:</p>

          <SelectInput
            name="shirt_size_id"
            onChange={handleChange}
            options={shirtSizeOptions}
            value={memberInfo.shirt_size_id}
            height="h-fit"
            width="w-18"
            textSize="text-xl"
            ariaLabel="Update shirt size"
          />
        </div>

        <p>Timestamp: {timestamp}</p>
        <p>Member since: {timestamp}</p>
        <p>Cougar Coins: 0</p>
      </div>
      <div className="flex items-center justify-end gap-6">
        <button
          onClick={() => {
            setIsUpdatingMember(false);
          }}
          className={`${buttonCSS} w-22 bg-gray-200 text-xl text-gray-800 hover:bg-gray-300`}
          aria-label="Cancel member update"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className={`${buttonCSS} w-20 bg-red-600 text-lg text-white hover:bg-red-700`}
          aria-label="Save member information"
        >
          Save
        </button>
      </div>
    </>
  );
};
