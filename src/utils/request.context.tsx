import { createContext, ReactNode, useContext, useState } from "react"

interface RequestContextData {
    requestType: string
    setRequestType: (val: string) => void
}

export const RequestTypeContext = createContext<RequestContextData>({
    requestType: "account-update",
    setRequestType: (val: string) => {},
})

export const RequestTypeProvider = ({ children }: { children: ReactNode }) => {
    const [requestType, setRequestType] = useState("account-update")

    const value = {
        requestType,
        setRequestType,
    }

    return (
        <RequestTypeContext.Provider value={value}>
            {children}
        </RequestTypeContext.Provider>
    )
}

export const useRequestTypeContext = () => {
    const context = useContext(RequestTypeContext)
    if (!context) {
        throw new Error(
            "useRequestTypeContext  must be used within an RequestTypeContext"
        )
    }

    return context
}
