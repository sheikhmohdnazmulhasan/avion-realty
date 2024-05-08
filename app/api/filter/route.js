import connectMongoDB from "@/libs/mongodb";
import OffPlan from "@/models/offPlan";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);

    const from = searchParams.get('from');
    const status = searchParams.get('status');
    const propertyType = searchParams.get('pt');
    const bedroom = searchParams.get('br');
    const minBudget = searchParams.get('min');
    const maxBudget = searchParams.get('max');
    const query = searchParams.get('query');


    try {

        if (from === 'hero') {
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

        } else {

            const data = await OffPlan.find();

            const xx = data.filter(i => {
                // Split the string into words
                const words = i.title.split(' ');

                // Check if any word includes the search term
              return  words.some(word => word.toLowerCase().includes(query.toLowerCase()));
            });



            return NextResponse.json({ data: xx, success: true }, { status: 200 });


        }

    } catch (error) {
        console.log(error)
    }


}