import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';  
import SimpleDetailsNewCard from './Items/SimpleDetailsNewCard';
import { api } from '../../config';  // Ensure `api` is the Axios instance
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles

const SearchNewsComponent = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true); // New loading state

    const location = useLocation();  
    const searchParams = new URLSearchParams(location.search);  
    const q = searchParams.get('q'); 

    const get_news = async () => {
        if (!q) return;  // If there's no search value, don't fetch

        setLoading(true); // Set loading to true before fetching

        try {
            // Make the GET request using Axios
            const res = await api.get(`/posts/search?q=${q}`);
            
            if (res.status === 200) {
                setNews(res.data.data.posts); 
            } else {
                console.error('Failed to fetch news:', res.data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false); // Set loading to false after fetch
        }
    };

    useEffect(() => {
        if (q) {
            get_news();  // Only fetch news when on the client side and if there's a search value
        }
    }, [q]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {loading ? (
                // Show Skeletons while loading
                Array(6).fill(0).map((_, i) => (
                    <div key={`skeleton-${i}`} className="bg-white p-4 rounded-md shadow-md">
                        <Skeleton height={200} />
                        <Skeleton height={20} style={{ marginTop: '10px' }} />
                        <Skeleton width="60%" height={15} style={{ marginTop: '5px' }} />
                    </div>
                ))
            ) : news.length > 0 ? (
                // Show the actual news content if available
                news.map((item, i) => (
                    <SimpleDetailsNewCard key={i} news={item} type="details-news" height={200} />
                ))
            ) : (
                // If no news found
                <div className="col-span-full text-center text-gray-500">No news found.</div>
            )}
        </div>
    );
};

export default function SearchNews() {
    return (
        <div>
            <SearchNewsComponent />
        </div>
    );
}
