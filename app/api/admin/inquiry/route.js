import connectMongoDB from "@/libs/mongodb";
import AdminInquiry from "@/models/adminInquiry";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();

    try {
        const result = await AdminInquiry.create(data);

        if (result) {
            return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });
        }

    } catch (error) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });
    }


}