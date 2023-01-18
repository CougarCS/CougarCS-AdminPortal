import { Alert } from "@mantine/core";
import { childrenProps } from "../types/types";
import { BiErrorCircle } from "react-icons/bi";

const Error = ({ children }: childrenProps) => {
  return (
    <Alert
      className="absolute bottom-6 right-6 w-1/5 min-w-max bg-red-600 py-3 px-5 text-black"
      title="Error"
      icon={<BiErrorCircle />}
    >
      <a>{children}</a>
    </Alert>
  );
};

export default Error;
