import {redirect} from "next/navigation";
import {headers} from "next/headers";
import {get_token} from "../../../cookies/cookies.server";

export default async function AuthLayout({children}) {
    const active_path = headers().get("x-current-path");
    const token = await get_token();

    // IF LOGGED IN
    if (
        (active_path.includes("auth/login") || active_path.includes("auth/register")) &&
        token
    ) {
        redirect("/auth/account/profile");
    }

    if (
        active_path.includes("account/") && !token
    ) {
        // notFound(); // OR GO TO LOGIN
        redirect("/auth/login");
    }

    return <>{children}</>;
}
