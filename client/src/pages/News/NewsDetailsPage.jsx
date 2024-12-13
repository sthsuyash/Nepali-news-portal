import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../../components/ui/Breadcrumb.jsx";
import CommentSection from "../../components/newsdetails/CommentSection.jsx";
import NewsDetailsMain from "../../components/newsdetails/NewsDetailsMain.jsx";
import RelatedNews from "../../components/News/RelatedNews.jsx";
import RecentNews from "../../components/News/RecentNews.jsx";
import Category from "../../components/category/Category.jsx";
import Search from "../../components/search/Search.jsx";
import NewsDetailsPageSkeleton from "../../components/skeletons/NewsDetailsPageSkeleton.jsx";

import { api } from "../../config/index.js";

const NewsDetailsPage = () => {
  const { slug } = useParams();

  const [news, setNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const newsData = await api.get(`/posts/${slug}`);
        const relatedNewsData = await api.get(`/posts/recommended/${newsData.data.data?.id}`);
        setNews(newsData.data.data);
        setRelatedNews(relatedNewsData.data.data || []);
      } catch (error) {
        console.error("Error fetching news details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) return <NewsDetailsPageSkeleton />;
  if (!news) return <div>No news found!</div>;

  return (
    <div>
      <div className="bg-white shadow-sm py-4">
        <div className="px-4 md:px-8 w-full">
          <Breadcrumb one={news.category.nepaliName} two={news.title} />
        </div>
      </div>
      <div className="bg-slate-200 w-full">
        <div className="px-4 md:px-8 w-full py-8">
          <div className="flex flex-wrap">
            <div className="w-full xl:w-8/12">
              <div className="w-full pr-0 xl:pr-4">
                <NewsDetailsMain news={news} />
                <CommentSection newsId={news.id}/>
              </div>
            </div>
            <div className="w-full xl:w-4/12">
              <div className="w-full pl-0 xl:pl-4">
                <div className="flex flex-col gap-y-8">
                  <Search />
                  <RecentNews />
                  <div className="p-4 bg-white">
                    <Category titleStyle="text-gray-700 font-bold" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8">
            <RelatedNews news={relatedNews} type="Related news" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailsPage;
