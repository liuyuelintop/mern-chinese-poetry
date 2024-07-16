import { useState } from 'react';
import { fetchShijing } from '../api/poem.js';
import { useQuery } from 'react-query';
import PoemCard from '../components/Poem/PoemCard.jsx';
import Pagination from '../components/Pagination/Pagination.jsx';

const ShijingPage = () => {
    const [page, setPage] = useState(1);
    const limit = 10;

    const { data, error, isLoading } = useQuery(["shijing", page], () => fetchShijing(page, limit), {
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
            <h1 className='mt-10 text-bold text-neutral-900 text-2xl lg:text-4xl'>诗经</h1>
            <div className="flex flex-col items-center w-full max-w-2xl justify-center min-h-screen py-4">
                {poems.map((poem) => (
                    <PoemCard key={poem._id} poem={poem} type={"shijing"} className="mb-4" />
                ))}
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
    );
}

export default ShijingPage;