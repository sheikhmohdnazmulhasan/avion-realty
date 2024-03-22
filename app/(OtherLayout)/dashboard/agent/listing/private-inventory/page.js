'use client'
import useInventory from "@/hooks/useInventory";

const PrivateInventory = () => {
    const [data, isLoading] = useInventory();

    

    return (
        <div>
            hello
        </div>
    );
};

export default PrivateInventory;