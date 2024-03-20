import connectMongoDB from "@/libs/mongodb"
import OffPlan from "@/models/offPlan";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const result = await OffPlan.findById(id);
        return NextResponse.json(result);

    } else {
        const result = await OffPlan.find();
        return NextResponse.json(result);
    }
}

export async function POST(request) {
    await connectMongoDB();
    
    const data = await request.json();

    const result = await OffPlan.create(data);

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });
    };
};

export async function DELETE(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const result = await OffPlan.findByIdAndDelete(id);

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: 'Data successfully Deleted From Database', success: true }, { status: 200 });
    };
}