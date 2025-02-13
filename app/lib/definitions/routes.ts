/** Landing Routes */
export const LANDING_ROUTE = "/";

//** Auth Routes */
export const SIGNIN_ROUTE = "/signin";
export const SIGNIN_EXPIRED_ROUTE = `${SIGNIN_ROUTE}?session=expired`;
export const SIGNUP_ROUTE = "/signup";

//** Dashboard Routes */
export const EVENTS_ROUTE = "/events";
export const CUPBOARD_ROUTE = "/cupboard";
export const NOTIFICATIONS_ROUTE = "/notifications";
export const PROFILE_ROUTE = "/profile";
export const SETTINGS_ROUTE = "/settings";

//** API routes */
export const API_LOGIN_ROUTE = "/auth/login";
export const API_LOGOUT_ROUTE = "/auth/logout";
export const API_REGISTER_ROUTE = "/auth/register";
export const API_CATEGORIES_ROUTE = "/categories";
export const API_PRODUCTS_ROUTE = "/products";
export const API_UNITS_ROUTE = "/units";

//** API Internal routes */

export const PUBLIC_ROUTES = [LANDING_ROUTE, SIGNIN_ROUTE, SIGNUP_ROUTE];
