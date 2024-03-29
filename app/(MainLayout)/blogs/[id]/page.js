'use client'

import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const BlogDetails = ({ params }) => {
    const { data = [] } = useSWR(`http://localhost:3000/api/agent/blog?id=${params.id}`, fetcher);

    console.log(data);

    return (
        <div className='px-5 md:px-36 mt-10 '>
            <Image src={data?.blogImg} width={800} height={800} alt='Blog Image' className='w-full h-60 md:h-[500px]' />
            <h1 className='text-3xl mt-3'>{data?.title}</h1>
           
        </div>

    );
};

export default BlogDetails;