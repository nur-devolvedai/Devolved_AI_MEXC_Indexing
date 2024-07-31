import { NextRequest, NextResponse } from "next/server";
import { ApiPromise, WsProvider } from "@polkadot/api";
import { formatBalance } from "@polkadot/util";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  if (request.method !== "POST") {
      return NextResponse.json(
          {
          success: false,
          message: "Method not allowed!",
          },
          { status: 405 }
      );
  }

  const nextActionHeader = request.headers.get("next-action");
  if (!nextActionHeader) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing 'next-action' header",
      },
      { status: 400 }
    );
  }

  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { message: "Address is required" },
        { status: 400 }
      );
    }

    const provider = new WsProvider(process.env.RPC_NODE_URL);
    const api = await ApiPromise.create({ provider });

    // @ts-ignore
    const { data: balance } = await api.query.system.account(address);
    const balanceFormatted = formatBalance(balance.free, {
      decimals: 18,
      withSi: true,
      withUnit: "AGC",
    });

    return NextResponse.json({
      success: true,
      balance: balanceFormatted 
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching balance:", error);
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = `Error: ${error.message}`;
    }
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
};