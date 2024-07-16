import PoemCard from "../../../components/Poem/PoemCard";

const SearchPoetryPage = ({ queryParams, onSearch, data }) => {
    const handleSearch = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const newQueryParams = {
            author: formData.get('author'),
            title: formData.get('title')
        };
        onSearch(newQueryParams);
    };

    const { poems } = data;

    return (
        <div className='flex flex-col mx-auto justify-center items-center'>
            <h1 className='mt-10 text-bold text-neutral-900 text-2xl lg:text-4xl'>搜索诗词</h1>
            <form onSubmit={handleSearch} className='flex flex-col mx-auto w-full max-w-2xl mb-4'>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='author' className='mb-2'>作者</label>
                    <input type='text' id='author' name='author' className='p-2 border border-gray-300 rounded' />
                </div>
                <div className='flex flex-col mb-4'>
                    <label htmlFor='title' className='mb-2'>标题</label>
                    <input type='text' id='title' name='title' className='p-2 border border-gray-300 rounded' />
                </div>
                <button type='submit' className='p-2 bg-blue-500 text-white rounded'>搜索</button>
            </form>
            <div className="flex flex-col items-center w-full max-w-2xl justify-center min-h-screen py-4">
                {poems.map((poem) => (
                    <PoemCard key={poem._id} poem={poem} type={"poetry"} className="mb-4" />
                ))}
            </div>
        </div>
    );
};

export default SearchPoetryPage;