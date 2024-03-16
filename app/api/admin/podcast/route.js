import connectMongoDB from "@/libs/mongodb";
import Podcast from "@/models/podcast";
import { NextResponse } from "next/server";

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