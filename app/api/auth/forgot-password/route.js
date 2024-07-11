import GetExpirationTime from "@/app/api/auth/forgot-password/utils/getExpirationTime";
import GenerateRandomString from "@/app/api/auth/forgot-password/utils/randomString";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {

    try {
        await connectMongoDB()
        const { email } = await request.json();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'invalid email' }, { status: 400 })
        }

        const token = GenerateRandomString(30);
        const expirationTime = GetExpirationTime(30);
        const dataForForgotPassword = { token, expirationTime }

        const setToUser = await User.findOneAndUpdate({ email }, dataForForgotPassword);

        if (!setToUser) {
            return NextResponse.json({ message: 'Something Wrong' }, { status: 400 })
        }

        return NextResponse.json({ message: 'Email send successfully' }, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}