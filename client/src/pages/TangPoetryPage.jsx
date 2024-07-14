import React, { useState } from 'react';
import { fetchTang300Poems } from '../api/poem.js';
import { useQuery } from 'react-query';
import PoemCard from '../components/Poem/PoemCard.jsx';
import Pagination from '../components/Pagination.jsx';

const TangPoemPage = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, error, isLoading } = useQuery(["tang-300-poems", page], () => fetchTang300Poems(page, limit), {
        keepPreviousData: true,
    });

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const { poems, currentPage, totalPages } = data;

    return (
        <div className='flex flex-col mx-auto justify-center items-center'>
            <h1 className='mt-10 text-bold text-neutral-900 text-2xl lg:text-4xl'>唐宋经典诗词 - 唐诗三百首</h1>
            <div className="flex flex-col items-center w-full max-w-2xl justify-center min-h-screen py-4">
                {poems.map((poem) => (
                    <PoemCard key={poem._id} poem={poem} type={"poetry"} className="mb-4" />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default TangPoemPage;