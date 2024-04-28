import connectMongoDB from "@/libs/mongodb";
import SellReq from "@/models/sellReq";
import { NextResponse } from "next/server";

export async function GET() {
    await connectMongoDB();

    try {
        const result = await SellReq.find();

        if (!result) {
            return NextResponse.json({ message: "Something Wrong", success: false }, { status: 500 });

        } else {

            return NextResponse.json(result);
        }

    } catch (error) {
        return NextResponse.json({ message: "Something Wrong", success: false }, { status: 500 });

    }
}

export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();

    const result = await SellReq.create(data);

    if (!result) {
        return NextResponse.json({ message: "Something Wrong", success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: "Data successfully saved in database", success: true }, { status: 200 });
    }
}