import connectMongoDB from "@/libs/mongodb";
import Leads from "@/models/leads";
import OffPlan from "@/models/offPlan";
import { NextResponse } from "next/server";

export async function POST(required) {
    await connectMongoDB();
    const data = await required.json();

    try {
        const list = await OffPlan.findById(data.leadFor);

        if (!list) {
            return NextResponse.json({ message: "Something Wrong for finding list by leadFor Id", success: false }, { status: 500 });

        } else {
            const updateLeadsCount = list.leads + 1;
            const updateLeadsCountInListing = await OffPlan.findByIdAndUpdate(data.leadFor, { leads: updateLeadsCount });

            if (updateLeadsCountInListing) {
                const result = await Leads.create(data);

                if (!result) {
                    return NextResponse.json({ message: "Something Wrong for creating new leads", success: false }, { status: 500 });

                } else {

                    return NextResponse.json({ message: "Data successfully saved in database", success: true }, { status: 200 });
                };
            }

        };

    } catch (error) {
        return NextResponse.json({ message: "Something Wrong in main tryc", success: false }, { status: 500 });
    };

};


