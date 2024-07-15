import { NextRequest, NextResponse } from "next/server";
import pool from '@/lib/db';

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

  const { hash } = await request.json();

  if (!hash || typeof hash !== 'string') {
    return NextResponse.json(
      {
        success: false,
        message: "Transaction hash is required",
      },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      'SELECT * FROM transactions WHERE tx_hash = $1',
      [hash]
    );

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
        result: result.rows,
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
