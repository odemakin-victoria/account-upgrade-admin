import { Button, FormControl, Label } from "@/shared/components"
import { FormProvider, useForm } from "react-hook-form"
import { loginValidationSchema } from "./validation.schema"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLocation, useNavigate } from "react-router-dom"
import UsePageTitle from "@/utils/page-title.hook"
import { ACCOUNT_UPDATE_REQUEST, DASHBOARD_ROUTE } from "../routes-config"
import { useLoginRequest } from "./hooks/queries.hooks"
import { useAuthContext } from "@/utils/auth.context"
import { useState } from "react"
import { motion } from "framer-motion"
import BG from "./assets/images/login_bg.jpg"
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import react-icons
import headerOptimusLogo from "@/shared/assets/images/Optimus_Logo.svg"
import { notifications } from "@mantine/notifications"


function caesarEncrypt(text: string, shift: number): string {
    return text
        .split('')
        .map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                let shiftAmount = shift % 26;
                if (char.match(/[A-Z]/)) {
                    if (code + shiftAmount > 90) {
                        shiftAmount -= 26;
                    }
                    return String.fromCharCode(code + shiftAmount);
                } else if (char.match(/[a-z]/)) {
                    if (code + shiftAmount > 122) {
                        shiftAmount -= 26;
                    }
                    return String.fromCharCode(code + shiftAmount);
                }
            }
            return char;
        })
        .join('');
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

    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    let location = useLocation()
    let navigate = useNavigate()
    let from = location.state?.from?.pathname || DASHBOARD_ROUTE
    const auth = useAuthContext()
    const loginRequest = useLoginRequest()
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility


    const handleSubmit = async (data: {
        username: string;
        password: string;
    }) => {
        setIsLoading(true);
        try {
            // Encrypt the username and password
            const encryptedUsername = caesarEncrypt(data.username, 3); // Encrypt with a Caesar cipher (3 shifts)
            const encryptedPassword = caesarEncrypt(data.password, 3); // Encrypt with a Caesar cipher (3 shifts)
    
            const response = await loginRequest.mutateAsync({
                username: encryptedUsername,
                password: encryptedPassword,
            });
    
            if (response.responseCode === "00") {
                auth.login({
                    username: data.username,
                    password: data.password,
                    callback: () => {
                        navigate(`${DASHBOARD_ROUTE}`);
                        setIsLoading(false);
                    },
                });
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
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
            });
        }
    };
    // const handleSubmit = async (data: { username: string; password: string }) => {

    //   setIsLoading(true)
    //   try {
    //     auth.login({
    //       username: data.username,
    //       password: data.password,
    //       callback: () =>{
    //         navigate(from)
    //         setIsLoading(false)
    //       },
    //     });

    //   } catch (error) {
    //     setIsLoading(false)
    //   }

    // };

    return (
        <div
            className="h-screen bg-blue-100 px-20 py-9"
            data-testid="page-layout"
            style={{
                backgroundImage: `url(${BG})`,
                backgroundSize: "cover",
            }}
        >
            <img
                                src={headerOptimusLogo}
                                alt="optimus_bank_logo"
                            />

            <motion.div
                animate={{
                    y: [-24, 0],
                    opacity: 1,
                }}
                className="flex justify-center items-center w-full flex-grow mt-28"
            >
                <div className="w-[514px] bg-white p-11 shadow-lg">
                    <h1 className="text-2xl font-medium mb-10 text-text-gray">
                        Customer Update Portal
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
                            className="absolute left-[60%] top-[62%] focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FaEye className="text-gray-500" /> // Use react-icons for the eye-off state
                            ) : (
                                < FaEyeSlash className="text-gray-500" /> // Use react-icons for the eye-on state
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
            </motion.div>
        </div>
    )
}
