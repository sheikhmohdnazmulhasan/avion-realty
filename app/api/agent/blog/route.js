import connectMongoDB from "@/libs/mongodb";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')
    const agentEmail = searchParams.get('email');

    if (id) {
        const result = await Blog.findById(id);
        return NextResponse.json(result);

    } else if (agentEmail) {
        const result = await Blog.find({ agentEmail });
        return NextResponse.json(result);

    } else {
        return NextResponse.json({ message: 'Unauthorize Request' }, { status: 401 })
    };
};

export async function POST(request) {
    await connectMongoDB();

    const data = await request.json();

    const result = await Blog.create(data);

    if (!result) {
        return NextResponse.json({ message: "Something Wrong", success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: "Data successfully saved in database", success: true }, { status: 200 });
    };
};

export async function DELETE(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const result = await Blog.findByIdAndDelete(id);

    if (!result) {
        return NextResponse.json({ message: "Something Wrong", success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: "Data successfully delete from database", success: true }, { status: 200 });
    };
}