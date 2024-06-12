import { connect } from "../../../../connect/connect";
import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request)
        const user = await User.findOne({ _id: userId }).select("-password")
        return NextResponse.json({ msg: "User found", data: user })
    } catch (error: any) {
        return NextResponse.json({ err: error.message })
    }
}