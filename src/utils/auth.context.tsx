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
interface DataResponse {
    responseCode: string
    data: {
        accessToken: string
        displayName: string
        referenceId: string
        email: string
    }
}
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
    }) => DataResponse
    logout: () => void
    setToken: (token: string) => void
    isLoading: boolean // Add isLoading to the context data

}

export const AuthContext = createContext<AuthContextData>({
    user: {
        isAuthenticated: false,
        token: null,
    },
    login: ({ ...values }): DataResponse => {
        // Your login logic here
        return {
            responseCode: "exampleCode",
            data: {
                accessToken: "exampleToken",
                displayName: "John Doe",
                referenceId: "123456",
                email: "john.doe@example.com",
            },
        };
    },
   
    logout: () => {},
    setToken: (token: string) => {},
    isLoading: false, // Initial value for isLoading

})




export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setIsAuthenticated] = useState<{
        isAuthenticated: boolean
        token: string | null
        displayName?: string
    } | null>(null)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const loginRequest = useLoginRequest()
    const location = useLocation()

    const protectedRoute = [...protectedRoutes]

    const login = async ({
        username,
        password,
        callback,
      }: {
        username: string;
        password: string;
        callback: () => void;
      }): Promise<DataResponse> => {
        let res: DataResponse = {
          responseCode: "",
          data: {
            accessToken: "",
            displayName: "",
            referenceId: "",
            email: "",
          },
        };
        try {
            setIsLoading(true); // Set isLoading to true before making the request

          res = await loginRequest.mutateAsync({
            username,
            password,
          });
    
          if (res.responseCode === "00") {
            console.log("I have been authenticated!");
            setIsAuthenticated({
              isAuthenticated: true,
              token: res.data.accessToken,
              displayName: res.data.displayName,
            });
            callback();
          }
        }
        catch (error: any) {
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
        } finally {
            setIsLoading(false); // Set isLoading to false after the request is complete, regardless of success or error
          }
        console.log(res, "to see if it contains data")
        return res
    }

    const logout = () => {
        setIsAuthenticated({
            isAuthenticated: false,
            token: null,
        })
        navigate("/")
    }
    const setToken = (token: string) => {
        setIsAuthenticated({
            isAuthenticated: true,
            token: token,
        })
    }
    const value = {
        user,
        setToken,
        login,
        logout,
        isLoading, // Include isLoading in the context value

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
            console.log("the error caught called", error)

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
            {!user?.isAuthenticated &&
            protectedRoute.includes(location.pathname) ? (
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