import { Alert } from "@mantine/core";
import { childrenProps } from "../types/types";
import { BiCheckCircle } from "react-icons/bi";

const Success = ({ children }: childrenProps) => {
  return (
    <Alert
      className="absolute bottom-6 right-6 w-1/5 min-w-max bg-green-500 py-3 px-5 text-black"
      title="Success"
      icon={<BiCheckCircle />}
    >
      <a>{children}</a>
    </Alert>
  );
};

export default Success;
