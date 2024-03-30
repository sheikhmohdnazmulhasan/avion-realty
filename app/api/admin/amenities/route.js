import connectMongoDB from "@/libs/mongodb";
import Amenities from "@/models/amenities";
import { NextResponse } from "next/server";

// amenities Get
export async function GET(request) {
  await connectMongoDB();
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if(name){
    const result = await Amenities.find({ name });
    return NextResponse.json(result);
  }
  else {
    const result = await Amenities.find();
    return NextResponse.json(result);
  }
}

// amenities post
export async function POST(request) {
  await connectMongoDB();
  const data = await request.json();

  const result = await Amenities.create(data);

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

// delete one amenities
export async function DELETE(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const result = await Amenities.findByIdAndDelete(id);

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
