import connectMongoDB from "@/libs/mongodb";
import OffPlan from "@/models/offPlan";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function GET(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const agent = searchParams.get("agent");
  const status = searchParams.get("status");
  const area = searchParams.get("area");
  const propertyType = searchParams.get("propertyType");

  if (id) {
    const result = await OffPlan.findById(id);
    return NextResponse.json(result);
  } else if (agent) {
    const result = await OffPlan.find({ agent });
    return NextResponse.json(result);
  } else if (status) {
    const result = await OffPlan.find({ status });
    return NextResponse.json(result);
  } else if (area) {
    const result = await OffPlan.find({ area });
    return NextResponse.json(result);
  } else if (propertyType) {
    const result = await OffPlan.find({ propertyType });
    return NextResponse.json(result);
  } else {
    const result = await OffPlan.find();
    return NextResponse.json(result);
  }
}

export async function POST(request) {
  await connectMongoDB();

  const data = await request.json();
  console.log(data.agent);

  const agent = await User.findOne({ email: data.agent });

  if (agent) {
    const prevProperties = agent.properties;
    const newTotalProperties = prevProperties + 1;
    const updateUser = await User.findOneAndUpdate(
      { email: data.agent },
      { properties: newTotalProperties }
    );

    if (updateUser) {
      const result = await OffPlan.create(data);

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
  } else {
    return NextResponse.json(
      {
        message: "Something Wrong , unable to update agent property",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const data = await request.json();

  const result = await OffPlan.findByIdAndUpdate(id, data);

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

export async function DELETE(request) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const agent = searchParams.get("agent");

  const result = await OffPlan.findByIdAndDelete(id);

  if (!result) {
    return NextResponse.json(
      { message: "Something Wrong", success: false },
      { status: 500 }
    );
  } else {
    const user = await User.findOne({ email: agent });

    const prevProperties = user.properties;
    const newTotalProperties = prevProperties - 1;

    const updateUserProperties = await User.findOneAndUpdate(
      { email: agent },
      { properties: newTotalProperties }
    );

    if (updateUserProperties) {
      return NextResponse.json(
        { message: "Data successfully Deleted From Database", success: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Something Wrong", success: false },
        { status: 500 }
      );
    }
  }
}
