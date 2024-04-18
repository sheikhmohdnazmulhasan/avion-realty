import connectMongoDB from "@/libs/mongodb";
import AgentInquiry from "@/models/agentInquiry";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const agent = searchParams.get('agent');

    try {
        const result = await AgentInquiry.find({ agent });

        if (result) {
            return NextResponse.json(result);
        }

    } catch (error) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });
    }
}

export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();

    try {
        const result = await AgentInquiry.create(data);

        if (result) {
            return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });

        }
    } catch (error) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });
    }
};

export async function DELETE(request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    try {
        const result = await AgentInquiry.findByIdAndDelete(id);

        if (result) {
            return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });

        }

    } catch (error) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });
    }
}