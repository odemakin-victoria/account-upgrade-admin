import { axiosInstance } from "@/config/api"
import { AccountRequestResponse } from "@/shared/types"
import { useAuthContext } from "@/utils/auth.context"
import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { useParams } from "react-router-dom"
import { Paginate } from "../types"
import { useRequestTypeContext } from "@/utils/request.context"

/**
 * Handles the fetching of all client update requests
 * @param searchQuery
 * @returns useQueryFn
 */
export const useDashboardQuery = (
    searchQuery?: string,
    accountStatus?: string,
    page?: string | null
) => {
    const { user } = useAuthContext()
    const { requestType } = useRequestTypeContext()

    const request = async () => {
        

        const data = await axiosInstance.get(
            requestType == "update"
                ? `api/account-update-request`
                : `api/account-upgrade-request`,
            {
                params: {
                    page: page ?? 1,
                    searchQuery,
                    accountStatus,
                },

                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<
        Paginate<AccountRequestResponse>,
        AxiosError<{
            statusCode: number
            message: "string"
            data: string[]
        }>
    >({
        queryKey: ["get-account-details", page],
        queryFn: () => request(),
    })
}


export const useAccountRequestQuery = (accountNumber?:   string | null) => {
    const { user } = useAuthContext()

  
    const { requestType } = useRequestTypeContext()
    const request = async () => {
        const data = await axiosInstance.get(
            requestType == "update"
            ? `/api/single-update-request/${accountNumber}?accountNumber=${accountNumber}`
            : `/api/single-upgrade-request/${accountNumber}?accountNumber=${accountNumber}`,
            { 
             
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
        console.log(data, "The data in dashboard query")
        return data.data
    }

    return useQuery<
        Paginate<AccountRequestResponse>,
        AxiosError<{
            statusCode: number
            message: "string"
            data: string[]
        }>
    >({
        queryKey: "get-account-details",
        queryFn: () => request(),
    })
}
