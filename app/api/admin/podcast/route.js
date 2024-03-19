import connectMongoDB from "@/libs/mongodb";
import Podcast from "@/models/podcast";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (email) {
        const result = await Podcast.findOne({ agent: email });
        return NextResponse.json(result);

    } else {
        const result = await Podcast.find()
        return NextResponse.json(result);
    }
}

export async function POST(request) {
    await connectMongoDB();
    const data = await request.json();

    const result = await Podcast.create(data);

    if (!result) {
        return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });
    };

}