import { useReducer, useEffect } from 'react';
import { useQuery } from 'react-query';
import { searchPoetry, searchShijing } from '../api/poem.js';
import PoemCard from '../components/Poem/PoemCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { debounce } from 'lodash';

const initialState = {
    type: 'poetry',
    author: '',
    title: '',
    chapter: '',
    section: '',
    results: [],
    currentPage: 1,
    totalPages: 0,
    error: '',
    searchTriggered: false,
    queryParams: {
        author: '',
        title: '',
        chapter: '',
        section: '',
        page: 1,
        limit: 10,
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TYPE':
            return { ...state, type: action.payload, searchTriggered: false };
        case 'SET_INPUT':
            return { ...state, [action.field]: action.payload };
        case 'SET_QUERY_PARAMS':
            return { ...state, queryParams: action.payload, searchTriggered: true, currentPage: 1 };
        case 'SET_RESULTS':
            return { ...state, results: action.payload.results, currentPage: action.payload.currentPage, totalPages: action.payload.totalPages, error: '' };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_PAGE':
            return { ...state, currentPage: action.payload, queryParams: { ...state.queryParams, page: action.payload }, searchTriggered: true };
        default:
            return state;
    }
};

const SearchPage = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchSearchResults = async () => {
        if (state.type === 'poetry') {
            return await searchPoetry({ ...state.queryParams, page: state.currentPage });
        } else {
            return await searchShijing({ ...state.queryParams, page: state.currentPage });
        }
    };

    const { data, error: queryError, isLoading } = useQuery(
        ['search', state.queryParams, state.type],
        fetchSearchResults,
        {
            enabled: state.searchTriggered, // 只有在提交表单后才触发查询
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (data) {
            dispatch({ type: 'SET_RESULTS', payload: { results: data.poems, currentPage: data.currentPage, totalPages: data.totalPages } });
        }
        if (queryError) {
            dispatch({ type: 'SET_ERROR', payload: 'An error occurred while fetching the data.' });
            console.error(queryError);
        }
    }, [data, queryError]);

    const debouncedSearch = debounce((params) => {
        dispatch({
            type: 'SET_QUERY_PARAMS',
            payload: params,
        });
    }, 300); // 300ms debounce delay

    const handleSearch = (e) => {
        e.preventDefault();
        const params = {
            author: state.author,
            title: state.title,
            page: 1,
            limit: 10,
        };
        if (state.type === 'shijing') {
            params.chapter = state.chapter;
            params.section = state.section;
        }
        debouncedSearch(params);
    };
    const handlePageChange = (page) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    };

    return (
        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
            <h1 className="m-4 text-2xl font-bold">Search {state.type === 'poetry' ? 'Poetry' : 'Shijing'}</h1>
            <form onSubmit={handleSearch} className="w-full max-w-md bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select value={state.type} onChange={(e) => dispatch({ type: 'SET_TYPE', payload: e.target.value })} className="w-full px-3 py-2 bg-gray-200 rounded">
                        <option value="poetry">Poetry</option>
                        <option value="shijing">Shijing</option>
                    </select>
                </div>
                {state.type === 'poetry' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">Author</label>
                            <input type="text" value={state.author} onChange={(e) => dispatch({ type: 'SET_INPUT', field: 'author', payload: e.target.value })} className="w-full px-3 py-2 bg-gray-100 rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input type="text" value={state.title} onChange={(e) => dispatch({ type: 'SET_INPUT', field: 'title', payload: e.target.value })} className="w-full px-3 py-2 bg-gray-100 rounded" />
                        </div>
                    </>
                )}
                {state.type === 'shijing' && (
                    <>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input type="text" value={state.title} onChange={(e) => dispatch({ type: 'SET_INPUT', field: 'title', payload: e.target.value })} className="w-full px-3 py-2 bg-gray-100 rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Chapter</label>
                            <input type="text" value={state.chapter} onChange={(e) => dispatch({ type: 'SET_INPUT', field: 'chapter', payload: e.target.value })} className="w-full px-3 py-2 bg-gray-100 rounded" />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Section</label>
                            <input type="text" value={state.section} onChange={(e) => dispatch({ type: 'SET_INPUT', field: 'section', payload: e.target.value })} className="w-full px-3 py-2 bg-gray-100 rounded" />
                        </div>
                    </>
                )}
                <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded">Search</button>
            </form>
            {state.error && <p className="text-red-500 mt-4">{state.error}</p>}
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div className="flex flex-col items-center justify-center w-full max-w-2xl py-4">
                    <h2 className="text-xl font-bold text-neutral-900">{state.type === 'poetry' ? '诗词结果' : '诗经结果'}</h2>
                    {state.results.length > 0 && state.results?.map((result) => (
                        <PoemCard key={result._id} poem={result} type={state.type} className="mb-4" />
                    ))}
                    {/*TODO: FIX Pagination UI Bug  */}
                    <Pagination currentPage={state.currentPage} totalPages={state.totalPages} onPageChange={handlePageChange} />
                </div>
            )}
        </div>
    );
};

export default SearchPage;