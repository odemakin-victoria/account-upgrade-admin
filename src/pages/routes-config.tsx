export const ROOT_ROUTE = "/"
export const ADMIN_ROUTE = "/admin"
export const VALIDATE_OTP = `${ADMIN_ROUTE}/ValidateOtp`
export const DASHBOARD_ROUTE = `${ADMIN_ROUTE}/dashboard`
export const ACCOUNT_UPDATE_REQUEST = `${DASHBOARD_ROUTE}/account-update-request/:requestId`
export const VIEWACCOUNT = `${DASHBOARD_ROUTE}/view-account/:accountNo`

export const protectedRoutes = [
    `${ADMIN_ROUTE}/dashboard`,
    `${ADMIN_ROUTE}/ValidateOtp`,
    `${DASHBOARD_ROUTE}/account-update-request`,
    VIEWACCOUNT,
]
