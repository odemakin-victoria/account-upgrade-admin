import { adminInstance, axiosInstance } from "@/config/api"
import { useLoginRequest } from "@/pages/Login/hooks/queries.hooks"
import {
    ACCOUNT_UPDATE_REQUEST,
    DASHBOARD_ROUTE,
    protectedRoutes,
} from "@/pages/routes-config"
import { notifications } from "@mantine/notifications"
import { AxiosError } from "axios"
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

interface AuthContextData {
    user: {
        token: string | null
        isAuthenticated: boolean
        displayName?: string
    } | null
    login: ({
        ...values
    }: {
        username: string
        password: string
        callback: () => void
    }) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextData>({
    user: {
        isAuthenticated: false,
        token: null,
    },
    login: ({ ...values }) => {},
    logout: () => {},
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setIsAuthenticated] = useState<{
        isAuthenticated: boolean
        token: string | null
        displayName?: string
    } | null>(null)
    const navigate = useNavigate()
    const loginRequest = useLoginRequest()
    const location = useLocation()

    const protectedRoute = [...protectedRoutes]

    const login = async ({
        username,
        password,
        callback,
    }: {
        username: string
        password: string
        callback: () => void
    }) => {
        try {
            const res = await loginRequest.mutateAsync({
                username,
                password,
            })

            if (res.responseCode === "00") {
                setIsAuthenticated({
                    isAuthenticated: true,
                    token: res.data.accessToken,
                    displayName: res.data.displayName,
                })
                callback()
            }
        } catch (error: any) {
            notifications.show({
                title: "Error!",
                message:
                    error.response?.data.responseMessage ??
                    "An Error occurred, please try again later",
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
                withCloseButton: false,
                autoClose: 5000,
            })
        }
    }

    const logout = () => {
        setIsAuthenticated({
            isAuthenticated: false,
            token: null,
        })
        navigate("/")
    }

    const value = {
        user,
        login,
        logout,
    }

    // Add a response interceptor
    axiosInstance.interceptors.response.use(
        (response) => {
            // Return the response as-is if no conditions for logging out are met
            return response
        },
        (error) => {
            // Check if the error response indicates that the user should be logged out
            if (error.response?.status === 401) {
                // Perform the logout action here
                // For example:
                logout()
            }

            // Forward the error to the calling code
            return Promise.reject(error)
        }
    )

    // Add a response interceptor
    adminInstance.interceptors.response.use(
        (response) => {
            // Return the response as-is if no conditions for logging out are met
            return response
        },
        (error) => {
            // console.log("called", error)

            // console.log("error -- adminInstance", error.response.status)
            // Check if the error response indicates that the user should be logged out
            if (error.response?.status === 401) {
                // Perform the logout action here
                // For example:
                logout()
            }

            // Forward the error to the calling code
            return Promise.reject(error)
        }
    )

    return (
        <AuthContext.Provider value={value}>
            {!user && protectedRoute.includes(location.pathname) ? (
                <Navigate to="/" state={{ from: location }} replace />
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }

    return context
}
