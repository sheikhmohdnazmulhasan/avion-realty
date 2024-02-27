import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request) {
    await connectMongoDB();
    const { name, email, password } = await request.json();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const isExist = await User.findOne({ email });

    if (isExist) {
        return NextResponse.json({ message: 'User Already Exist!' }, { status: 200 })
    }


    await User.create({ name, email, password: encryptedPassword });
    return NextResponse.json({ message: "The user has been successfully saved to the database" }, { status: 201 })

};

export async function PUT(request) {

    const { email } = await request.json()

    console.log(email);

    // const user = await User.findByIdAndUpdate({})

    
    return NextResponse.json({ message: 'route hit' })
}