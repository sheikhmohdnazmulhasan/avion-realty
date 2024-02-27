import connectMongoDB from "@/libs/mongodb";
import AreaItem from "@/models/items/area";
import { NextResponse } from "next/server";

// Area Get
export async function GET() {

    await connectMongoDB();
    const data = await AreaItem.find();

    return NextResponse.json(data);

};

// Area POST
export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();

    const result = await AreaItem.create(data);

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {
        
        return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });
    }

};