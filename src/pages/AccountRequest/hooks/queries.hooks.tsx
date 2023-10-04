import { adminInstance, axiosInstance } from "@/config/api"
import {
    AccountDocumentResponse,
    AccountDocumentUpdate,
    AccountRequestResponse,
    ApiResponse,
    CustomerDocumentMultiple,
    CustomerStatusUpdate,
} from "@/shared/types"
import { useAuthContext } from "@/utils/auth.context"
import { notifications } from "@mantine/notifications"
import { IconCheck } from "@tabler/icons-react"
import { AxiosError, AxiosResponse } from "axios"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { IUpdateDocument } from "./types"
import { NotificationManager } from "@/utils/ResponseHandler"
import { useRequestTypeContext } from "@/utils/request.context"
import { string } from "yup"

export const useAccountRequestQuery = () => {
    const { user } = useAuthContext()
    const { requestType } = useRequestTypeContext()
    const search = useParams()
    const { accountNo } = useParams()

    const request = async () => {
        const data = await axiosInstance.get<AccountRequestResponse>(
            `/api/account-request/${accountNo}?accountNumber=${accountNo}&requestType=${requestType}`,
            {
                headers: {
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
        return data.data
    }

    return useQuery<AccountRequestResponse, AxiosError<any>>({
        queryKey: ["get-account-details", accountNo, requestType],
        queryFn: request,
        onError: (error) => {
            notifications.show({
                message: "Unable to fetch user request!",
                title: "An Error Occurred",
                autoClose: 5000,
            })
        },
    })

    // return useQuery<
    //     AxiosResponse<AccountRequestResponse>,
    //     AxiosError<{
    //         statusCode: number
    //         message: "string"
    //         data: string[]
    //     }>
    // >({
    //     queryKey: ["get-account-details", search.requestId],
    //     queryFn: () => request(),
    //     onError: () => {
    //         notifications.show({
    //             message: "Unable to fetch user request!",
    //             title: "An Error Occurred",
    //             autoClose: 5000,
    //         })
    //     },
    // })
}

/**
 * Custom hook for updating account documents on the server.
 * Uses `useMutation` from react-query to perform the update.
 * @returns The react-query useMutation object.
 */
export const useDocumentUpdate = () => {
    const queryClient = useQueryClient()
    const { user } = useAuthContext()

    const { accountNo } = useParams()

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
        const formData = new FormData()

        const valueKeys = Object.values(values)
        const fieldKeys = Object.keys(values)

        for (let i = 0; i < valueKeys.length; i++) {
            formData.append(fieldKeys[i], valueKeys[i])
        }
        const data = await axiosInstance.patch(
            `/api/update-account-request/${accountNo}?accountNo=${accountNo}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json", // Set the content type to JSON
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
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

//     const queryClient = useQueryClient();
//     const { user } = useAuthContext();
//     const { accountNo } = useParams();

//     const updateAccountStatus = async (status: void) => {

//           const response = await axiosInstance.patch(
//             `/account-request-api/api/update-account-status/${accountNo}?accountNo=${accountNo}updateStatus=${status}`,

//             {
//               headers: {
//                 Authorization: `Bearer ${user?.token}`,
//               },
//             }
//           );
//           return response.data;
//         }

//         return useMutation<
//         AxiosResponse<AccountDocumentResponse>,
//         AxiosError<ApiResponse<null>>

//       >({
//         mutationKey: 'patch-account-document',
//         mutationFn: (status) => updateAccountStatus(status), // Pass the status to the updateAccountStatus function
//         onSuccess: () => {
//           queryClient.invalidateQueries('get-account-details');
//           NotificationManager.showSuccessNotification();
//         },
//         onError: (err) => {
//           NotificationManager.showErrorNotification(err.response?.data.responseMessage);
//         },
//       });
//       };

export const useAccountStatusUpdate = () => {
    const queryClient = useQueryClient()
    const { user } = useAuthContext()
    const { accountNo } = useParams()

    const updateAccountStatus = async (status: string) => {
        // Fix the status parameter type
        console.log(user)
        const response = await axiosInstance.patch(
            `/api/update-account-status/${accountNo}`,

            {
                accountNo: accountNo,
                status: status,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user?.token}`,
                },
            }
        )
        return response.data
    }

    return useMutation<
        AxiosResponse<AccountDocumentResponse>,
        AxiosError<ApiResponse<null>>,
        string // Define the type for the mutation parameter (status)
    >({
        mutationKey: "patch-account-document",
        mutationFn: (status) => updateAccountStatus(status), // Pass the status to the updateAccountStatus function
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
