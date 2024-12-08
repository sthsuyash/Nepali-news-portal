import { useEffect, useState } from 'react';
import Title from './Title';
import SimpleDetailsNewCard from './Items/SimpleDetailsNewCard';
import { BASE_API_URL } from '../../../config';

const PopularNews = ({ type }) => {
    const [popularNews, setPopularNews] = useState([]);

    useEffect(() => {
        const fetchPopularNews = async () => {
            try {
                const res = await fetch(`${BASE_API_URL}/posts/popular`);
                const res_data = await res.json();
                const data = res_data.data.posts;
                setPopularNews(data); // Set the fetched news
            } catch (error) {
                console.error('Error fetching popular news:', error); // Log errors if any
            }
        };

        fetchPopularNews();
    }, []); // Empty dependency array ensures this runs once on component mount

    return (
        <div className="w-full pb-8 mt-5">
            <div className="flex flex-col w-full gap-y-[14px]">
                <Title title="लोकप्रिय समाचार" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-3 sm:gap-3 lg:gap-x-3">
                    {popularNews.length > 0 &&
                        popularNews.slice(0, 4).map((item, i) => (
                            <SimpleDetailsNewCard
                                key={i}
                                news={item}
                                type={type}
                                height={230}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default PopularNews;
