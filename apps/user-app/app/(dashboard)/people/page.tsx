"use client";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { Button } from "@repo/ui/button";
import { transferMoney } from "../../lib/actions/moneyTransfer";
import { useRouter } from "next/navigation";

export default function People() {
    const [recipientNumber, setRecipientNumber] = useState("");
    const [amount, setAmount] = useState("");
    const router = useRouter();

    const handleClick = async () => {
        const res = await transferMoney(recipientNumber, Number(amount));
        if(res) {
            alert(`Money sent successfully to ${recipientNumber}`);
            setRecipientNumber("");
            setAmount("");
            router.push("/history");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen m-auto">
            <div className="w-full max-w-sm rounded-xl bg-white shadow-2xl p-8">
            <div className="font-bold text-2xl text-center mb-6 text-blue-700">
                Send Money
            </div>
            <div className="space-y-5">
                <TextInput
                value={recipientNumber}
                label="Recipient Number"
                placeholder="Enter phone number"
                onChange={setRecipientNumber}
                />
                <TextInput
                value={amount}
                label="Amount"
                placeholder="Enter amount"
                onChange={setAmount}
                />
                <Button
                onClick={handleClick}
                >
                Send Money
                </Button>
            </div>
            </div>
        </div>
    )
}