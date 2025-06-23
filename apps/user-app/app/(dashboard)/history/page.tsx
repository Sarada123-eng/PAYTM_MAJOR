import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function getTransferTransactions() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) return [];
    const txns = await prisma.p2PTransavtion.findMany({
        where: {
            OR: [
                { senderId: Number(session.user.id) },
                { receiverId: Number(session.user.id) }
            ]
        },
        include: {
            receiver: {
                select: {
                    number: true,
                    name: true
                }
            },
            sender: {
                select: {
                    number: true,
                    name: true
                }
            }
        },
        orderBy: {
            startTime: "desc"
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        receiver: {
            number: t.receiver.number,
            name: t.receiver.name
        },
        sender: {
            number: t.sender.number,
            name: t.sender.name
        },
        isSent: t.senderId === Number(session.user.id)
    }));
}

export default async function HistoryPage() {
    const transactions = await getTransferTransactions();

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Transaction History</h1>
            <div className="space-y-4">
                {transactions.length === 0 && (
                    <div className="text-gray-500">No transactions found.</div>
                )}
                {transactions.map((txn, idx) => (
                    <div
                        key={idx}
                        className={`rounded-lg shadow p-4 flex items-center justify-between ${
                            txn.isSent
                                ? "bg-red-50 border-l-4 border-red-400"
                                : "bg-green-50 border-l-4 border-green-400"
                        }`}
                    >
                        <div>
                            <div className="font-semibold">
                                {txn.isSent ? "Sent to" : "Received from"}{" "}
                                {txn.isSent
                                    ? txn.receiver.name || txn.receiver.number
                                    : txn.sender.name || txn.sender.number}
                            </div>
                            <div className="text-xs text-gray-500">
                                {new Date(txn.time).toLocaleString()}
                            </div>
                        </div>
                        <div
                            className={`text-lg font-bold ${
                                txn.isSent ? "text-red-600" : "text-green-600"
                            }`}
                        >
                            {txn.isSent ? "-" : "+"}₹{txn.amount}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}