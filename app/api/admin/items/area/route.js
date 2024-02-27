import connectMongoDB from "@/libs/mongodb";
import AreaItem from "@/models/items/area";
import { NextResponse } from "next/server";

export async function GET(request) {

    await connectMongoDB();
    const data = await AreaItem.find();
    const { searchParams } = new URL(request.url);
    
    const params = searchParams.get('nazmul');

    return NextResponse.json(data);

};

// Area POST
export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();

    await AreaItem.create(data);
    return NextResponse.json({ message: 'item successfully save to database', success: true }, { status: 200 })
};