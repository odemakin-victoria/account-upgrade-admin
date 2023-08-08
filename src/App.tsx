import Login from "@/pages/Login";
import { AuthProvider } from "@/utils/auth.context";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AccountRequest from "./pages/AccountRequest";
import { ROOT_ROUTE,  ACCOUNT_UPDATE_REQUEST, DASHBOARD_ROUTE_UPDATE, DASHBOARD_ROUTE_UPGRADE } from "./pages/routes-config";
import AccountUpgrade from "./pages/Dashboard/Screens/AccountUpgrade";
import AccountUpdate from "./pages/Dashboard/Screens/AccountUpdate";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path={ROOT_ROUTE} element={<AccountUpdate />} />
          <Route path={DASHBOARD_ROUTE_UPDATE} element={<AccountUpdate />} />
          <Route path={DASHBOARD_ROUTE_UPGRADE} element={<AccountUpgrade />} />
          <Route path={ACCOUNT_UPDATE_REQUEST} element={<AccountRequest />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
