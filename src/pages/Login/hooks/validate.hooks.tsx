import { axiosInstance } from "@/config/api"
import { ApiResponse } from "@/shared/types"
import { NotificationManager } from "../../../utils/ResponseHandler"
import { AxiosError } from "axios"
// import dayjs from "dayjs"

/**
 * Class representing an OTP Validator.
 */
export class OTPValidator {
    static isLoading: boolean = false

    /**
     * Performs validation using OTP.
     * @param {Object} params - The parameters for validation.
     * @param {string} params.otp - The OTP code.
     * @param {string} params.accountNumber - The account number.
    // @param {string} params.dob - The date of birth.
     * @param {string} params.token - The token.
     * @returns {Promise<ApiResponse<unknown>>} - The result of the validation.
     */
    static async validateOtp({
        token,
        ...rest
    }: {
        accountNumber: string
        // dob: string
        token: string
        callback: (bool: boolean) => void
    }) {
        const { accountNumber } = rest
        try {
            rest.callback(true)

            const result = await axiosInstance.post("/api/ValidateOTP", {
                accountNumber: accountNumber,
                // DOB: dayjs(dob).format("YYYY-MM-DDTHH:mm:ss"),
                token: token,
            })

            return result.data
        } catch (error) {
            // Handle error
            NotificationManager.showErrorNotification(
                (error as AxiosError<ApiResponse<unknown>>).response?.data
                    .responseMessage
            )
        } finally {
            rest.callback(false)
        }
    }

    /**
     * Sends OTP for customer validation.
     * @param {Object} params - The parameters for sending OTP.
     * @param {string} params.accountNumber - The account number.
     * @param {string} params.DOB - The date of birth.
     * @returns {Promise<formResponse>} - The response object from sending OTP.
     */
    static async sendOTP({
        accountNumber,
        // DOB,
        ...rest
    }: {
        accountNumber: string
        // DOB: string
        callback: (bool: boolean) => void
    }) {
        try {
            rest.callback(true)
            const res = await axiosInstance.post("/api/SendOTP", {
                accountNumber,
                // DOB: dayjs(DOB).format("YYYY-MM-DDTHH:mm:ss"),
            })

            return res.data
        } catch (error) {
            NotificationManager.showErrorNotification(
                (error as AxiosError<ApiResponse<unknown>>).response?.data
                    .responseMessage
            )
        } finally {
            rest.callback(false)
        }
    }
}
