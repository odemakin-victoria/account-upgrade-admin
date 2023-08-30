import Login from "@/pages/Login"
import { AuthProvider } from "@/utils/auth.context"
import { Routes, Route, BrowserRouter } from "react-router-dom"
import AccountRequest from "./pages/AccountRequest"
import Dashboard from "./pages/Dashboard"
import {
    ROOT_ROUTE,
    DASHBOARD_ROUTE,
    ACCOUNT_UPDATE_REQUEST,
    VIEWACCOUNT,
} from "./pages/routes-config"
import { RequestTypeProvider } from "./utils/request.context"

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <RequestTypeProvider>
                    <Routes>
                        <Route path={ROOT_ROUTE} element={<Login />} />
                        <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
                        <Route
                            path={VIEWACCOUNT}
                            element={<AccountRequest />}
                        />
                        <Route
                            path={ACCOUNT_UPDATE_REQUEST}
                            element={<AccountRequest />}
                        />
                    </Routes>
                </RequestTypeProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
