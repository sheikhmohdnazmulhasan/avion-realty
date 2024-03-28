'use client'

import axios from 'axios';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const BlogDetails = ({ params }) => {
    const { data = [] } = useSWR(`http://localhost:3000/api/agent/blog?id=${params.id}`, fetcher);

    console.log(data);

    return (
        <div>
            {params.id}
        </div>
    );
};

export default BlogDetails;