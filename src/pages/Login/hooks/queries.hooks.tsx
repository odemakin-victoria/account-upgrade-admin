import { axiosInstance } from "@/config/api";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { LoginResponse } from "../types";

/**
 * Handles network calls to the login endpoint
 * @returns useMutationFn
 */
export const useLoginRequest = () => {
  const request = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    const { data } = await axiosInstance.post(`/Admin/Login`, {
      username,
      password,
    });
    return data;
  };

  return useMutation<
  {
    responseCode: string;
    message: "string";
    data: LoginResponse;
  },
    AxiosError<{
      statusCode: number;
      message: "string";
      data: string;
    }>,
    { username: string; password: string }
  >("login", ({ username, password }) => request({ username, password }));
};
