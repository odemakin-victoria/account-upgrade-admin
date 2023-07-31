import { adminInstance, axiosInstance } from "@/config/api"
import {
    AccountDocumentResponse,
    AccountDocumentUpdate,
    AccountRequestResponse,
    ApiResponse,
    CustomerDocumentMultiple,
} from "@/shared/types"
import { useAuthContext } from "@/utils/auth.context"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { IUpdateDocument } from "./types"
import { NotificationManager } from "@/utils/ResponseHandler"

export const useAccountRequestQuery = () => {
    const { user } = useAuthContext()

    const search = useParams()

    const request = async () => {
        const data = await axiosInstance.get(
            `/account-update-request/${search.requestId}`,
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<
        AxiosResponse<AccountRequestResponse>,
        AxiosError<{
            statusCode: number
            message: "string"
            data: string[]
        }>
    >({
        queryKey: ["get-account-details", search.requestId],
        queryFn: () => request(),
        onError: () => {
            notifications.show({
                message: "Unable to fetch user request!",
                title: "An Error Occurred",
                autoClose: 5000,
            })
        },
    })
}

export const useAccountNumberQuery = () => {
    const { user } = useAuthContext()

    const search = useParams()
    const request = async () => {
        const data = await adminInstance.get(
            `/get-by-account-number/${search.requestId}`,
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<
        AxiosResponse<{
            emailId: string
        }>,
        AxiosError<{
            statusCode: number
            message: "string"
            data: string[]
        }>
    >({
        queryKey: ["get-account-info", search.requestId],
        queryFn: () => request(),
        onError: () => {
            notifications.show({
                message: "Unable to fetch user request!",
                title: "An Error Occurred",
                autoClose: 5000,
            })
        },
    })
}

/**
 * Custom hook for updating account documents on the server.
 * Uses `useMutation` from react-query to perform the update.
 * @returns The react-query useMutation object.
 */
export const useDocumentUpdate = () => {
    const queryClient = useQueryClient()
    const { user } = useAuthContext()


    /**
     * Retrieves the token from the URL query parameters.
     * @returns The token value or null if not found.
     */
    function getTokenFromURL(): string | null {
        const urlParams = new URLSearchParams(window.location.search)
        return urlParams.get("token")
    }

    /**
     * Sends a request to update the account document on the server.
     * @param values - The updated account document details.
     * @returns A Promise that resolves to the updated account document.
     */
    const request = async (values: CustomerDocumentMultiple) => {
        const data = await axiosInstance.patch(`/admin/Customer/documents`, values, {
            headers: {
                Authorization: `Bearer ${user?.token}`,
            },
        })
        return data.data
    }

    return useMutation<
        AxiosResponse<AccountDocumentResponse>,
        AxiosError<ApiResponse<null>>,
        CustomerDocumentMultiple
    >({
        mutationKey: "patch-account-document", // Updated to a single string value
        mutationFn: (values) => request(values),
        onSuccess: () => {
            queryClient.invalidateQueries("get-account-details")
            NotificationManager.showSuccessNotification()
        },
        onError: (err) => {
            NotificationManager.showErrorNotification(
                err.response?.data.responseMessage
            )
        },
    })
}
