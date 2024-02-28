import connectMongoDB from "@/libs/mongodb";
import AreaItem from "@/models/items/area";
import { NextResponse } from "next/server";

// Area Get
export async function GET() {
    await connectMongoDB();
    const result = await AreaItem.find();

    if (!result.length) {
        return NextResponse.json({ message: 'no data found', success: true }, { status: 501 });

    } else {
        return NextResponse.json(result);
    }
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
    };
};

export async function DELETE(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    const result = await AreaItem.findByIdAndDelete(id);

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {
        return NextResponse.json({ message: 'Data successfully deleted from database', success: true }, { status: 200 });
    }

}