import Login from "@/pages/Login";
import { AuthProvider } from "@/utils/auth.context";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AccountRequest from "./pages/AccountRequest";
import Dashboard from "./pages/Dashboard";
import { ROOT_ROUTE, DASHBOARD_ROUTE, ACCOUNT_UPDATE_REQUEST } from "./pages/routes-config";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={ROOT_ROUTE} element={<Login />} />
          <Route path={DASHBOARD_ROUTE} element={<Dashboard />} />
          <Route path={ACCOUNT_UPDATE_REQUEST} element={<AccountRequest />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
