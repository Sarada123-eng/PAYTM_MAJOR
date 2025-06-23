"use client";

import { useState } from "react";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { Select } from "@repo/ui/select";
import { Button } from "@repo/ui/button";
import { createOnRampTransaction } from "../app/lib/actions/createOnRampTransaction";
import axios from "axios";
import { useSession } from "next-auth/react";

  const SUPPORTED_BANKS = [{
        name: "HDFC Bank",
        redirectUrl: "https://netbanking.hdfcbank.com"
    },
   {
        name: "ICICI Bank",
        redirectUrl: "https://www.icicibank.com"
    },
   {
        name: "SBI Bank",
        redirectUrl: "https://www.onlinesbi.com"
    }];

export const AddMoneyCard = () => {
    const [amount, setAmount] = useState(0);
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

   const session = useSession();
   const id = session.data?.user?.id || 123; // Replace with actual user ID retrieval logic

    
    const handleTxn = async () => {
        const res = await createOnRampTransaction(amount, provider);
        alert(`Your transaction has been initiated with id ${res.token}`);
        window.location.href = "http://localhost:3001/transfer";

        if(res.token) {
            const response = await axios.post("http://localhost:3001/api/bank", {
                userId: id,
                amount:amount,
                token: res.token
            });
        }

    }

     return <Card title="Add Money">
    <div className="w-full">
        <TextInput value={amount} label={"Amount"} placeholder={"Amount"} onChange={(value) => {
            setAmount(Number(value));
        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
            setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            <Button onClick={handleTxn}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}