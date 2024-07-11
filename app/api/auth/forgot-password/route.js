import GenerateRandomString from "@/app/utils/randomString";
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

        const token = GenerateRandomString(30)

        return NextResponse.json(token)

    } catch (error) {
        console.error(error);

        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }

}