import connectMongoDB from "@/libs/mongodb";
import PropertyItem from "@/models/items/property";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();
    const result = await PropertyItem.find();

    if (!result.length) {
        return NextResponse.json({ message: 'no data found', success: true }, { status: 501 });

    } else {
        return NextResponse.json(result);
    }

}

export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();
    const result = await PropertyItem.create(data);

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });
    }

};