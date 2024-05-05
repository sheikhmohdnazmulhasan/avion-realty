import connectMongoDB from "@/libs/mongodb";
import OffPlan from "@/models/offPlan";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);

    const status = searchParams.get('status');
    const propertyType = searchParams.get('pt');
    const bedroom = searchParams.get('br');
    const minBudget = searchParams.get('min');
    const maxBudget = searchParams.get('max');


    try {
        const data = await OffPlan.find({ status });

        if (data) {
            const filterByPropertyType = data.filter(x => x.propertyType === propertyType);

            if (filterByPropertyType) {
                const filterByBedroom = filterByPropertyType.filter(x => x.bedroom == bedroom);

                if (filterByBedroom) {
                    const filterByMinBudget = filterByBedroom.filter(x => x.startingPrice >= parseFloat(minBudget))

                    if (filterByMinBudget) {
                        const filterByMaxBudget = filterByMinBudget.filter(x => x.startingPrice <= parseFloat(maxBudget));

                        if (filterByMaxBudget) {
                            return NextResponse.json({ data: filterByMaxBudget, success: true }, { status: 200 });
                        }
                    }
                }

            }

        }

    } catch (error) {
        console.log(error)
    }


}