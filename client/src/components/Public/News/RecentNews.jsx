import { useState, useEffect } from 'react';
import Title from '../News/Title';
import NewsCard from './Items/NewsCard';
import { BASE_API_URL } from '../../../config';

const RecentNews = () => {
  const [news, setNews] = useState([]); // State to store news data
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    const fetchNews = async () => {
      try {
          const res = await fetch(`${BASE_API_URL}/posts/recent?limit=4`);
        const data = await res.json();
        setNews(data.data.posts); // Set news data to state
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false); // Set loading to false when the fetch is complete
      }
    };

    fetchNews();
  }, []); // Empty dependency array to run this effect once on mount

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (!news || news.length === 0) {
    return <div>No news available</div>; // Handle case where no news data is fetched
  }

  return (
    <div className="w-full flex flex-col gap-y-[14px] bg-white pt-4">
      <div className="pl-4">
        <Title title="ताजा समाचार" />
      </div>
      <div className="grid grid-cols-1 gap-y-3">
        {news.map((item, i) => (
          <NewsCard key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default RecentNews;
