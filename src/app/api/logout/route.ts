import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Succesfully Logged out",
    });
    response.cookies.set("token", "", { httpOnly: true });

    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
