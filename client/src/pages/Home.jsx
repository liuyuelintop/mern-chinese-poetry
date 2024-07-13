import { fetchRandomPoems } from '../api/poem.js'
import { useQuery } from 'react-query'
import PoemCard from '../components/Poem/PoemCard.jsx';
export const Home = () => {
    const { data, error, isLoading } = useQuery(["random-poems"], fetchRandomPoems);
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    const { poems } = data;
    console.log(data);
    return (
        <div className='flex flex-col mx-auto justify-center items-center'>
            <h1 className='mt-10 text-bold text-neutral-900 text-2xl lg:text-4xl'>唐宋经典诗词 - 随机 10 首 </h1>
            <div className="flex flex-col items-center w-full max-w-2xl justify-center min-h-screen py-4">
                {poems.map((poem) => (
                    <PoemCard key={poem._id} poem={poem} type={"poetry"} className="mb-4" />
                ))}
            </div>
        </div>

    )
}
