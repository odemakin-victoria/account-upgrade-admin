export const ROOT_ROUTE = "/";
export const ADMIN_ROUTE = "/admin";
export const DASHBOARD_ROUTE_UPDATE = `${ADMIN_ROUTE}/account-update`;
export const DASHBOARD_ROUTE_UPGRADE = `${ADMIN_ROUTE}/account-upgrade`;
export const ACCOUNT_UPDATE_REQUEST = `${DASHBOARD_ROUTE_UPDATE}/account-update-request/:requestId`;
export const ACCOUNT_UPGRADE_REQUEST = `${DASHBOARD_ROUTE_UPGRADE}/account-upgrade-request/:requestId`;



export const protectedRoutes = [
    `${ADMIN_ROUTE}/dashboard/account-update`,
    `${ADMIN_ROUTE}/dashboard/account-upgrade`,
    `${DASHBOARD_ROUTE_UPDATE}/account-update-request`,
    `${DASHBOARD_ROUTE_UPGRADE}/account-upgrade-request`
]
