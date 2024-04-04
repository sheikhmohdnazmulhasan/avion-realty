'use client'

import axios from 'axios';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const PodcastDetails = ({ params }) => {

    const { data = [] } = useSWR(`http://localhost:3000/api/admin/podcast?id=${params.id}`, fetcher);

    console.log(data);

    return (
        <div>
            {params.id}
        </div>
    );
};

export default PodcastDetails;