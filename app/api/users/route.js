import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectMongoDB();
    
    await User.create(await request.json());
    return NextResponse.json({ message: "The user has been successfully saved to the database" }, { status: 201 })

}