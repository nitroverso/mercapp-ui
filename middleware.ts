import {
  PRODUCTS_ROUTE,
  PUBLIC_ROUTES,
  SIGNIN_ROUTE,
} from "@/app/lib/definitions/routes";
import { auth as middleware } from "@/auth";

export default middleware((req) => {
  const { auth, nextUrl } = req;
  const isAuthenticated = !!auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return Response.redirect(new URL(SIGNIN_ROUTE, nextUrl));
  }

  if (isAuthenticated && isPublicRoute) {
    return Response.redirect(new URL(PRODUCTS_ROUTE, nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|shopping-cart.webp).*)",
  ],
};
