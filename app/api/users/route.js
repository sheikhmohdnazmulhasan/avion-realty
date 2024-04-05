import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function GET(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get('id');
    const email = searchParams.get('email');

    if (id) {
        const result = await User.findById(id);
        return NextResponse.json(result);

    } else if (email) {
        const result = await User.findOne({ email });
        return NextResponse.json(result);

    } else {
        const result = await User.find({ role: 'agent' }).sort({ properties: -1 });
        return NextResponse.json(result);
    }
    
};


export async function POST(request) {
    await connectMongoDB();

    const { name, email, password, designation, wpNum, role, properties } = await request.json();
    const encryptedPassword = await bcrypt.hash(password, 10);
    const isExist = await User.findOne({ email });

    if (isExist) {
        return NextResponse.json({ message: 'User Already Exist!' }, { status: 200 })
    }

    await User.create({ name, email, password: encryptedPassword, designation, wpNum, role, properties });
    return NextResponse.json({ message: "The user has been successfully saved to the database" }, { status: 201 })

};


export async function PUT(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const data = await request.json();
    const filter = { email }

    const result = await User.findOneAndUpdate(filter, data);

    if (!result) {
        return NextResponse.json({ message: 'Something is wrong', success: false }, { status: 402 })
    }

    return NextResponse.json({ message: 'Data Updated', success: true }, { status: 200 });
}

export async function DELETE(request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const result = await User.findByIdAndDelete(id);

    if (!result) {
        return NextResponse.json({ message: 'Something is wrong', success: false }, { status: 402 })
    }

    return NextResponse.json({ message: 'User Deleted', success: true }, { status: 200 });

}