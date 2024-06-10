// noinspection TypeScriptValidateTypes

"use server";

import {cookies} from "next/headers";

export const get_token = async () => await cookies().get("token")?.value ?? "";

export const get_locale = async () => await cookies().get("NEXT_LOCALE")?.value ?? "ar";
