"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function () {
    const session = await getServerSession(authOptions);

    return(
        <div>
            {JSON.stringify(session)}
        </div>
    )
}