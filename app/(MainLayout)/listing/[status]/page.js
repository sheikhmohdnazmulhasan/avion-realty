'use client'

import axios from 'axios';
import React from 'react';
import useSWR from 'swr';

const fetcher = (url) => axios.get(url).then((res) => res.data);
const ListingDetail = ({ params }) => {

    const { data = [], isLoading, error } = useSWR(`http://localhost:3000/api/offplans?status=${params.status}`, fetcher);

    return (
        <div>

        </div>
    );
};

export default ListingDetail;