import { connect } from "../../../../connect/connect";
import User from "../../../../models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {

    const secretKey = process.env.SECRET_KEY

    try {
        const reqBody = await request.json() // same as req.body in express
        const { email, password } = reqBody;

        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ success: false, msg: "Invalid email or password" }, { status: 400 })
        }

        const validatePass = await bcrypt.compare(password, user.password)

        if (!validatePass) {
            return NextResponse.json({ success: false, msg: "Invalid email or password" }, { status: 401 })
        }

        const payload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(payload, secretKey!, { expiresIn: "1d" })

        const response = NextResponse.json({
            success: true,
            msg: "Login successfull",
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}