'use client'
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";

const fetcher = url => axios.get(url).then(res => res.data);
const FilterRoute = () => {

    const searchParams = useSearchParams();

    const status = searchParams.get('status');
    const pt = searchParams.get('pt');
    const br = searchParams.get('br');
    const min = searchParams.get('min');
    const max = searchParams.get('max');

    const { data = [] } = useSWR(`/api/filter?status=${status}&pt=${pt}&br=${br}&min=${min}&max=${max}`, fetcher);
    console.log(data)


    return (
        <div className="w-full h-screen  flex justify-center items-center">
            <div>
                <p className="font-semibold">Data Fetched Successfully </p>
                <p>But The UI is Still Cooking. Rimi Apu is So Lazzzy!</p>
            </div>
        </div>
    )
}

export default FilterRoute;