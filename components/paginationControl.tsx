import React from "react";
import { memberType } from "../types/types";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

type paginationControlProps = {
  dataPage: number;
  setDataPage: React.Dispatch<React.SetStateAction<number>>;
  presentableData: memberType[][];
};

export const PaginationControl = ({
  dataPage,
  setDataPage,
  presentableData,
}: paginationControlProps) => {
  function decrementDataPage() {
    if (dataPage === 0) return;

    setDataPage((prev) => prev - 1);
  }

  function incrementDataPage() {
    if (dataPage === presentableData.length - 1) return;

    setDataPage((prev) => prev + 1);
  }

  return (
    <div className="mt-3 flex items-center justify-end">
      <button
        className="mr-3 rounded-md p-2 text-red-600 hover:bg-gray-500 hover:bg-opacity-30 disabled:text-gray-400 disabled:text-opacity-40 disabled:hover:bg-transparent"
        onClick={decrementDataPage}
        disabled={dataPage === 0 ? true : false}
      >
        <AiOutlineArrowLeft className="h-6 w-6" />
      </button>

      <p className="flex w-fit justify-center font-medium">
        Page {dataPage + 1} of {presentableData.length}
      </p>

      <button
        className="ml-3 rounded-md p-2 text-red-600 hover:bg-gray-500 hover:bg-opacity-30 disabled:text-gray-400 disabled:text-opacity-40 disabled:hover:bg-transparent"
        onClick={incrementDataPage}
        disabled={dataPage === presentableData.length - 1 ? true : false}
      >
        <AiOutlineArrowRight className="h-6 w-6" />
      </button>
    </div>
  );
};
