import GetExpirationTime from "@/app/api/auth/forgot-password/utils/getExpirationTime";
import GenerateRandomString from "@/app/api/auth/forgot-password/utils/randomString";
import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import isExpired from "./utils/isExpired";

export async function POST(request) {

    try {
        await connectMongoDB()
        const { email } = await request.json();
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'invalid email', success: false })
        }

        const token = GenerateRandomString(30);
        const expirationTime = GetExpirationTime(30);
        const dataForForgotPassword = { token, expirationTime }

        const setToUser = await User.findOneAndUpdate({ email }, dataForForgotPassword);

        if (!setToUser) {
            return NextResponse.json({ message: 'Something Wrong', success: false })
        }

        return NextResponse.json({ message: 'Email send successfully', token, success: true }, { status: 200 });

    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: 'Internal Server Error', success: false });
    }

};

export async function GET(request) {

    try {
        await connectMongoDB()
        const { searchParams } = new URL(request.url);
        const token = searchParams.get('token');

        const isValidToken = await User.findOne({ token });

        if (!isValidToken) {
            return NextResponse.json({ message: 'token not valid', success: false });
        }

        const isExpired2 = isExpired(isValidToken.expirationTime);

        if (isExpired2) {
            return NextResponse.json({ message: 'token not expired', success: false });
        }

        return NextResponse.json({ message: 'valid token', success: true }, { status: 200 });

    } catch (error) {
            return NextResponse.json({ message: 'Internal Server Error', success: false }, { status: 500 });

    }

}

export async function PATCH(request) {

    try {
        await connectMongoDB();
        const { token, newPassword } = await request.json();
        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        const user = await User.findOne({ token });

        if (!user) {
            return NextResponse.json({ message: 'Invalid Token', success: false });

        };

        const tokenExpired = isExpired(user?.expirationTime);

        if (tokenExpired) {
            return NextResponse.json({ message: 'Token expired', success: false });
        }

        const samePassword = await bcrypt.compare(newPassword, user.password);

        if (samePassword) {
            return NextResponse.json({ message: 'Same Password', success: false });
        }

        const updatePassword = await User.findOneAndUpdate({ token }, { password: encryptedPassword });

        if (!updatePassword) {
            return NextResponse.json({ message: 'Something Wrong', success: false });
        };

        const deleteToken = await User.findOneAndUpdate({ token }, { token: null, expirationTime: null });

        if (!deleteToken) {
            return NextResponse.json({ message: 'Something Wrong', success: false });
        }

        return NextResponse.json({ message: 'password update successfully', success: true }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal Server Error', success: false });
    }


}