'use client'

import axios from 'axios';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const PodcastDetails = ({ params }) => {

    const { data = [] } = useSWR(`http://localhost:3000/api/admin/podcast?id=${params.id}`, fetcher);


    return (
        <div>
            {/* video */}
            <div className="">
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${data?.videoUrl?.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1]}`} title="ddddd" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    );
};

export default PodcastDetails;