import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;

        const user = await User.findOne({email});
        console.log(reqBody);
        if(!user)
        {
            return NextResponse.json({error: "User does not exist"}, {status: 400});
        }
        else {
            const validPassword = await bcryptjs.compare(password, user.password);
            if(!validPassword)
                return NextResponse.json({ error:"Invalid Password" },{ status: 401 });

            const tokenData = {
                id: user._id,
                username: user.username,
                email: user.email
            };
            console.log("User exists and before jwt");

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

            const response = NextResponse.json({
                message: "Login Successful",
                success: true
            }, {status: 200});
            response.cookies.set("token", token, {
                httpOnly: true,
            });
            return response;
        }
    } catch(error: any) {
        return NextResponse.json({error: "Server Error"}, {status: 400});
    }
}