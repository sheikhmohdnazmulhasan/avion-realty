import connectMongoDB from "@/libs/mongodb";
import Podcast from "@/models/podcast";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const email = searchParams.get("email");

  if (email) {
    const result = await Podcast.findOne({ agent: email });
    return NextResponse.json(result);

  } else if (id) {
    const result = await Podcast.findById(id);
    return NextResponse.json(result);

  } else {
    const result = await Podcast.find();
    return NextResponse.json(result);
  }
}

export async function POST(request) {
  await connectMongoDB();
  const data = await request.json();

  const result = await Podcast.create(data);

  if (!result) {
    return NextResponse.json(
      { message: "Something Wrong", success: false },
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      { message: "Data successfully saved in database", success: true },
      { status: 200 }
    );
  }
}

export async function PUT(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const data = await request.json();

  const result = await Podcast.findByIdAndUpdate(id, data);

  if (!result) {
    return NextResponse.json({ message: 'Something Wrong', success: false }, { status: 500 });

  } else {

    return NextResponse.json({ message: 'Data successfully saved in database', success: true }, { status: 200 });
  };
}

export async function DELETE(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const result = await Podcast.findByIdAndDelete(id);

  if (!result) {
    return NextResponse.json(
      { message: "Something Wrong", success: false },
      { status: 500 }
    );
  } else {
    return NextResponse.json(
      { message: "Data successfully deleted from database", success: true },
      { status: 200 }
    );
  }
}
