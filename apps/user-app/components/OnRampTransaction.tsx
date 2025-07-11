import { Card } from "@repo/ui/card"

export const OnRampTransactions = ({
    transactions
}: {
    transactions: {
        time: Date,
        amount: number,
        status: "Success"| "Failed"| "Pending",
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }
    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map(t => <div className="flex justify-between">
                <div>
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    <div>
                    + Rs {t.amount / 100}
                    </div>
                    <p
                        className={
                            t.status === "Success"
                                ? "text-green-500"
                                : t.status === "Pending"
                                ? "text-yellow-500"
                                : "text-red-500"
                        }
                    >
                        Status: {t.status}
                    </p>
                </div>

            </div>)}
        </div>
    </Card>
}