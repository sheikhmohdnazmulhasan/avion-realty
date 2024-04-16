import connectMongoDB from "@/libs/mongodb";
import Leads from "@/models/leads";
import { NextResponse } from "next/server";

export async function POST(required) {
    await connectMongoDB();
    const data = await required.json();

    const result = await Leads.create(data);

    if (!result) {
        return NextResponse.json({ message: "Something Wrong", success: false }, { status: 500 });

    } else {

        return NextResponse.json({ message: "Data successfully saved in database", success: true }, { status: 200 });
    };

};


