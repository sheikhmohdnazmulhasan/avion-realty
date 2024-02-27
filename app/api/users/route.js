import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"


export async function POST(request) {
    await connectMongoDB();

    const data = 
}

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
    await connectMongoDB();

    const data = await request.json();
    const filter = { email: data.email }

    const newDoc = await User.findOneAndUpdate(filter, data);

    console.log(newDoc);

    return NextResponse.json({ message: 'Data Updated', success: true }, { status: 200 });
}