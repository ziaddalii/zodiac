import {i18nRouter} from "next-i18n-router";
import i18nConfig from "./i18n.config";

export function middleware(request) {

    const response = i18nRouter(request, i18nConfig);

    //ADD CUSTOM HEADER FOR REQUEST URL
    response.headers.set("x-current-path", request.nextUrl.pathname);

    return response;
}

// applies this middleware only to files in the app directory
export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
