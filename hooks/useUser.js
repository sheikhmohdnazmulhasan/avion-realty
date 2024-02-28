import connectMongoDB from "@/libs/mongodb";
import User from "@/models/user";


export async function useUser() {

    try {
        await connectMongoDB();

        const currentUser = await User.findOne({  });

        console.log(currentUser);

        return currentUser

    } catch (error) {

        console.log(error);
        return error
    }

}