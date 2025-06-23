
import axios from 'axios';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { amount, userId, token } = body;

    // Validate input
    if (!amount || !userId || !token) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Generate a unique transaction ID
    const transactionId = token;

    // Simulate a call to HDFC API (replace with actual API call)
    const response = await axios.post('http://localhost:3003/hdfcWebhook', {
      user_identifier: userId,
      amount: amount,
      token: transactionId
    });

    return NextResponse.json({
      message: "Transaction successful",
      data: response.data
    });
  } catch (error) {
    console.error("Error processing transaction:", error);
    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}

export const GET = (req: NextRequest) => {
  return NextResponse.json({ message: "GET request to HDFC endpoint" });
}
