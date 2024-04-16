import connectMongoDB from "@/libs/mongodb";

export async function POST(required) {
    await connectMongoDB();

    
}