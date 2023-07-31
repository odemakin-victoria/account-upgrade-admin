import { adminInstance } from "@/config/api";
import { AccountRequestResponse } from "@/shared/types";
import { useAuthContext } from "@/utils/auth.context";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Paginate } from "../types";

/**
 * Handles the fetching of all client update requests
 * @param searchQuery
 * @returns useQueryFn
 */
export const useDashboardQuery = (
  searchQuery?: string,
  page?: string | null
) => {
  const { user } = useAuthContext();

  const request = async () => {
    const data = await adminInstance.get(`/account-update-request`, {
      params: {
        page: page ?? 1,
        searchQuery,
      },

      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    return data.data;
  };

  return useQuery<
  Paginate<AccountRequestResponse>,
  AxiosError<{
      statusCode: number;
      message: "string";
      data: string[];
    }>
  >({
    queryKey: ["get-account-details", page],
    queryFn: () => request(),
  });
};
export const useAccountRequestQuery = () => {
  const { user } = useAuthContext();

  const search = useParams();
  const request = async () => {
    const data = await adminInstance.get(
      `/account-update-request/${search.accountNumber}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    return data.data;
  };

  return useQuery<
    Paginate<AccountRequestResponse>,
    AxiosError<{
      statusCode: number;
      message: "string";
      data: string[];
    }>
  >({
    queryKey: "get-account-details",
    queryFn: () => request(),
  });
};
