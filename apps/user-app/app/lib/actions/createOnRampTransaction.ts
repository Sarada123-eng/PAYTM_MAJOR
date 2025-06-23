"use server"

import { getServerSession } from "next-auth"
import prisma from "@repo/db/client";
import { authOptions } from "../auth";

export async function createOnRampTransaction(amount:number, provider:string) {
    const session = await getServerSession(authOptions);
    const userId = Number(session.user.id);

    if(!userId) {
        throw new Error("User not authenticated");
    }

    const token = crypto.randomUUID();


    await prisma.onRampTransaction.create({
        data: {
            userId: userId,
            amount: amount*100,
            status: "Pending",
            provider: provider,
            token: token
        }
    });

    return {
        token: token,
        message: "Transaction created successfully",
    }
}