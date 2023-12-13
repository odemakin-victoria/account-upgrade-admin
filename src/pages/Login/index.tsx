import { Button, FormControl, Label, Modal } from "@/shared/components"
import { FormProvider, useForm } from "react-hook-form"
import { loginValidationSchema } from "./validation.schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLocation, useNavigate } from "react-router-dom"
import UsePageTitle from "@/utils/page-title.hook"
import {
    ACCOUNT_UPDATE_REQUEST,
    DASHBOARD_ROUTE,
    VALIDATE_OTP,
} from "../routes-config"
import { useLoginRequest } from "./hooks/queries.hooks"
import { useAuthContext } from "@/utils/auth.context"
import { useState } from "react"
import { motion } from "framer-motion"
import BG from "./assets/images/login_bg.jpg"
import { FaEye, FaEyeSlash } from "react-icons/fa" // Import react-icons
import headerOptimusLogo from "@/shared/assets/images/Optimus_Logo.svg"
import { notifications } from "@mantine/notifications"
import SuccessIcon from "../../assets/Success.png"

class CaesarCipher {
    public static CaesarEncrypt(
        input: string,
        key: number,
        rounds: number,
        customAlphabet: string | null = null
    ): string {
        const DefaultAlphabet =
            "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=}{][~`>,?"
        let alphabet = DefaultAlphabet
        const encryptedText = input.split("")

        for (let round = 0; round < rounds; round++) {
            for (let i = 0; i < encryptedText.length; i++) {
                const originalChar = encryptedText[i]
                if (alphabet.includes(originalChar)) {
                    const originalIndex = alphabet.indexOf(originalChar)
                    const newIndex = (originalIndex + key) % alphabet.length
                    const newChar = alphabet[newIndex]
                    encryptedText[i] = newChar
                }
            }
        }

        return encryptedText.join("")
    }
}

export default function Login() {
    UsePageTitle("Login")
    const methods = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(loginValidationSchema),
    })

    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
    const [referenceId, setReferenceId] = useState("")
    const [email, setEmail] = useState("")

    let location = useLocation()
    let navigate = useNavigate()
    let from = location.state?.from?.pathname || DASHBOARD_ROUTE
    const auth = useAuthContext()
    const loginRequest = useLoginRequest()
    const [showPassword, setShowPassword] = useState(false) // State to control password visibility

    function generateRandomSalt(length: number): string {
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        let salt = ""
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            salt += characters.charAt(randomIndex)
        }
        return salt
    }

    // Your handleSubmit function
    const handleSubmit = async (data: {
        username: string
        password: string
    }) => {
        setIsLoading(true)

        try {
            // Generate a random salt
            const salt = generateRandomSalt(16)
            const salt1 = generateRandomSalt(16)

            // Concatenate the salt with the user's password
            const saltedPassword = salt + data.password
            const saltedUsername = salt1 + data.username

            // Encrypt the salted username and password
            const encryptedUsername = CaesarCipher.CaesarEncrypt(
                saltedUsername,
                5,
                3
            )
            const encryptedPassword = CaesarCipher.CaesarEncrypt(
                saltedPassword,
                5,
                3
            )

            // const response = await loginRequest.mutateAsync({
            //     username: encryptedUsername,
            //     password: encryptedPassword,
            // })
            // const response = {
            //     responseCode: "00",
            //     data: { referenceId: referenceId, email: email },
            // }

            const response = await auth.login({
                username: encryptedUsername,
                password: encryptedPassword,
                callback: () => {
                    console.log("here in callback")
                    setIsLoading(false)
                    setIsSuccessModalOpen(true)
                },
            })

            console.log(isSuccessModalOpen)

            console.log(response, "the response here in index")
            setReferenceId(response.data.referenceId)
            setEmail(response.data.email)
            // if (response.responseCode === "00") {
            // } else {
            // }
            console.log(auth.user, "the auth user in login")
        } catch (error) {
            notifications.show({
                message: "Wrong password or Username. Please try again!",
                title: "An Error Occurred",
                styles: (theme) => ({
                    root: {
                        backgroundColor: theme.colors.red[8],
                        border: "transparent",
                        "&::before": { backgroundColor: theme.white },
                    },
                    description: {
                        color: "white",
                    },
                    title: {
                        color: "white",
                        fontWeight: "bold",
                    },
                }),
                color: "white",
                autoClose: 5000,
            })
            setIsLoading(false)
        }
    }

    return (
        <div
            className="h-screen bg-blue-100 px-20 "
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
                className="flex justify-center items-center w-full mt-28 "
            >
                <div className="w-[514px] bg-white p-11 shadow-lg">
                    <h1 className="text-2xl font-medium mb-10 text-text-gray">
                        Customer Update Admin Portal
                    </h1>
                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}
                    <FormProvider {...methods}>
                        <div className="mb-6 ">
                            <Label labelName="login">Username</Label>
                            <FormControl
                                fieldName="username"
                                variant="input"
                                id="login"
                                type="text"
                                placeholder="Enter your AD Username"
                                className="focus:ring-2 ring-blue-500/50"
                            />
                        </div>

                        <div className="mb-10">
                            <Label labelName="password">Password</Label>
                            <FormControl
                                fieldName="password"
                                variant="input"
                                id="password"
                                type={showPassword ? "text" : "password"} // Dynamic type based on state
                                placeholder="Enter your Password"
                            />
                            <button
                                className="fixed left-[60%] top-[59%] focus:outline-none"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FaEye className="text-gray-500" /> // Use react-icons for the eye-off state
                                ) : (
                                    <FaEyeSlash className="text-gray-500" /> // Use react-icons for the eye-on state
                                )}
                            </button>
                        </div>

                        <Button
                            type="button"
                            variant="primary"
                            className="font-normal"
                            onClick={methods.handleSubmit(handleSubmit)}
                            isLoading={isLoading}
                        >
                            Login
                        </Button>
                    </FormProvider>
                </div>
                <Modal
                    isOpen={isSuccessModalOpen}
                    onClose={() => setIsSuccessModalOpen(false)}
                    className="w-full mx-auto mt-[-10px]"
                    size={500}
                    styles={{
                        root: {
                            borderRadius: 0,
                            marginTop: 500,
                        },
                        body: {
                            
                            paddingLeft: 24,
                            paddingRight: 24,
                        },
                    }}
                >
                    <div className="flex flex-col items-center w-full mt-10">
                        <h2 className="text-center text-xl text-blue-500">
                            Login Success!
                        </h2>
                        <img
                            src={SuccessIcon}
                            alt="success icon"
                            className="w-16 h-16 mt-4"
                        />
                        <p className="text-center text-xl text-blue-500">
                            Please check your mail for OTP to complete login.
                        </p>
                        <button
                            className="bg-green-500 w-1/4 my-5 rounded-lg px-2 py-4"
                            onClick={() => {
                                setIsSuccessModalOpen(false)
                                navigate(VALIDATE_OTP, {
                                    state: { referenceId, email },
                                })
                            }}
                        >
                            OK
                        </button>
                    </div>
                </Modal>
            </motion.div>

            {/* Modal */}
        </div>
    )
}
