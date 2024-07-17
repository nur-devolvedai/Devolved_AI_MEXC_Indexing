import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase, pool } from '@/lib/dbConnect';

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

  const { txHash } = await request.json();

  if (!txHash) {
    return NextResponse.json(
      {
        success: false,
        message: "Transaction hash is required",
      },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const query = `
      SELECT * FROM transactions
      WHERE tx_hash = $1
    `;
    const values = [txHash];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        result: result.rows[0],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        result: 'Internal server error'
      },
      { status: 500 }
    );
  }
};
