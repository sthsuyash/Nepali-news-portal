import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Use React Router's Link instead of Next.js Link
import { BASE_API_URL } from '../../config';

const RecentNewsFooter = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchRecentNews = async () => {
            try {
                const res = await fetch(`${BASE_API_URL}/posts/recent`);
                const data_res = await res.json();
                const data = data_res.data;
                setNews(data.news); 
            } catch (error) {
                console.error('Error fetching recent news:', error); // Log errors if any
            }
        };

        fetchRecentNews();
    }, []); // Empty dependency array ensures it only runs once on mount

    return (
        <div className="w-full flex flex-col gap-y-[14px]">
            <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3">
                ताजा समाचार
            </div>
            <div className="grid grid-cols-1 gap-y-4 pt-3">
                {news && news.length > 0 &&
                    news.slice(0, 4).map((r, i) => (
                        <Link key={i} to={`/news/${r.slug}`} className="flex w-full">
                            <div className="group relative overflow-hidden w-[90px] h-[75px]">
                                <div className="w-[90px] h-[75px] block group-hover:scale-[1.1] transition-all duration-[1s]">
                                    <img
                                        className=""
                                        src={r.image}
                                        alt="images"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Adjust img styling
                                    />
                                    <div
                                        className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"
                                    ></div>
                                </div>
                            </div>
                            <div className="w-[calc(100%-90px)] pl-2">
                                <div className="flex flex-col gap-y-1">
                                    <h2 className="text-sm font-semibold text-white hover:text-[#c80000]">
                                        {r.title}
                                    </h2>
                                    <div className="flex gap-x-2 text-xs font-normal text-white">
                                        <span>{r?.date}</span>
                                        <span>{r.writerName}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default RecentNewsFooter;
