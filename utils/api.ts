import { loginData } from "../types/types";

const fetchLogin = async (data: loginData) => {
  return await fetch(`${process.env.BASE_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export { fetchLogin };
