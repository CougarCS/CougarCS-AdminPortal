import React from "react";
import { dataTableProps2, memberType } from "../types/types";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

type paginationControlProps = {
  dataPage: number;
  setDataPage: React.Dispatch<React.SetStateAction<number>>;
  presentableData: dataTableProps2[][];
};

export const PaginationControl = ({
  dataPage,
  setDataPage,
  presentableData,
}: paginationControlProps) => {
  return (
    <div className="mt-4 flex items-center justify-end">
      <button
        className="mr-3 rounded-md p-1 text-red-600 hover:bg-gray-500 hover:bg-opacity-30 disabled:text-gray-400 disabled:text-opacity-40 disabled:hover:bg-transparent"
        onClick={() => setDataPage((prev) => prev - 1)}
        disabled={dataPage === 0 ? true : false}
      >
        <HiArrowLeft className="h-6 w-6" />
      </button>

      <p className="flex w-fit justify-center text-lg font-medium">
        Page {dataPage + 1} of {presentableData.length}
      </p>

      <button
        className="ml-3 rounded-md p-1 text-red-600 hover:bg-gray-500 hover:bg-opacity-30 disabled:text-gray-400 disabled:text-opacity-40 disabled:hover:bg-transparent"
        onClick={() => setDataPage((prev) => prev + 1)}
        disabled={dataPage === presentableData.length - 1 ? true : false}
      >
        <HiArrowRight className="h-6 w-6" />
      </button>
    </div>
  );
};
