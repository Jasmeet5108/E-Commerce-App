import User from "../../../../models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connect } from "../../../../connect/connect";
import jwt from "jsonwebtoken";
connect();

export async function POST(request: NextRequest) {

    const secretKey = process.env.SECRET_KEY

    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody;

        console.log(reqBody);

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ success: false, msg: "User already exists" }, { status: 401 })
        }

        const hashedPass = await bcrypt.hash(password, 10)

        const newUser = await User.create({ username, email, password: hashedPass })

        const payload = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }

        const token = jwt.sign(payload, secretKey!, { expiresIn: "1d" })

        const response = NextResponse.json({
            success: true,
            msg: "Registered Successfully",
        })

        response.cookies.set("token", token, { httpOnly: true })

        return response;

    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}