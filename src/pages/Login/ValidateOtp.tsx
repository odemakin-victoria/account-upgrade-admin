import React, { useState } from "react"
import { Button } from "@/shared/components"
import BG from "./assets/images/login_bg.jpg"
import { motion } from "framer-motion"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/utils/auth.context"
import headerOptimusLogo from "@/shared/assets/images/Optimus_Logo.svg"
import OTPInput from "../../shared/components/OTP-verification/index"
import { NotificationManager } from "../../utils/ResponseHandler"
import { DASHBOARD_ROUTE, ROOT_ROUTE } from "../routes-config"

export default function ValidateOtpScreen() {
    const [otp, setOtp] = useState({})
    const [isValidatingOtp, setIsValidatingOtp] = useState(false)
    const navigate = useNavigate()
    const auth = useAuthContext()
    const location = useLocation()
    const referenceId = location.state ? location.state.referenceId : null
    const email = location.state ? location.state.email : null

    const handleOTPValidation = async () => {
        try {
            if (!otp || Object.values(otp).some((value) => !value)) {
                NotificationManager.showErrorNotification(
                    "Please enter a valid OTP"
                )
                return
            }

            setIsValidatingOtp(true)

            const response = await fetch(
                "http://172.16.22.22/account-request-api/api/Admin/validate-login-otp",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        otpToken: Object.values(otp).join(""),
                        referenceId: referenceId,
                        email: email,
                    }),
                }
            )

            const result = await response.json()

            if (response.ok) {
                console.log(result, "result")
                let accessToken = result.data.accessToken
                // Store Access Token
                localStorage.setItem("Access", accessToken)
                auth.setToken(accessToken)
                console.log(auth.user, "the auth user in validate otp page")
                navigate(`${DASHBOARD_ROUTE}`)
                setIsValidatingOtp(true)
            } else {
                NotificationManager.showErrorNotification(
                    "Invalid OTP. Please try again."
                )
                setIsValidatingOtp(false)
            }
        } catch (error) {
            console.error("Error validating OTP:", error)
            NotificationManager.showErrorNotification(
                "Error validating OTP. Please try again."
            )
            setIsValidatingOtp(false)
        }
    }

    return (
        <div
            className="h-screen bg-blue-100 px-20 py-9"
            data-testid="page-layout"
            style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: "cover",
            }}
        >
            <img src={headerOptimusLogo} alt="optimus_bank_logo" />

            <motion.div
                animate={{
                    y: [-24, 0],
                    opacity: 1,
                }}
                className="flex justify-center items-center w-full flex-grow mt-28"
            >
                <div className="w-[514px] bg-white p-11 shadow-lg rounded-md ">
                    <h1 className="font-bold text-2xl mb-2">Validate OTP</h1>

                    <OTPInput
                        onCodeFilled={(e) =>
                            setOtp(e as unknown as Record<string, string>)
                        }
                    />

                    <div className="flex items-center gap-4 mt-4">
                        {!isValidatingOtp && (
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => navigate(ROOT_ROUTE)}
                            >
                                Cancel
                            </Button>
                        )}
                        <Button
                            variant="primary"
                            type="button"
                            onClick={handleOTPValidation}
                        >
                            {isValidatingOtp ? "Please wait..." : "Verify OTP"}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
