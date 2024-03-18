import connectMongoDB from "@/libs/mongodb"
import { NextResponse } from "next/server";

export async function POST(request){
    await connectMongoDB();
    const data = await request.json;
    console.log(data);
    return NextResponse.json({message : "API successfully called"});
}