import { useEffect, useState } from "react";
import { BASE_API_URL } from "../config";

import Title from "../components/Public/News/Title";
import HeadLines from "../components/Public/Header/Headlines";

import LatestNews from "../components/Public/News/LatestNews";
import PopularNews from "../components/Public/News/PopularNews";
import DetailsNewsRow from "../components/Public/News/DetailsNewsRow";
import DetailsNews from "../components/Public/News/DetailsNews";
import DetailsNewsCol from "../components/Public/News/DetailsNewsCol";

import NewsCard from "../components/Public/News/Items/NewsCard";
import SimpleNewsCard from "../components/Public/News/Items/SimpleNewsCard";

const HomePage = () => {
  const [loading, setLoading] = useState(true);

  const [recentNews, setRecentNews] = useState([]);
  const [economyNews, setEconomyNews] = useState([]);
  const [opinionNews, setOpinionNews] = useState([]);
  const [nationalNews, setNationalNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [entertainmentNews, setEntertainmentNews] = useState([]);
  const [diasporaNews, setDiasporaNews] = useState([]);
  const [literatureNews, setLiteratureNews] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);
  const [worldNews, setWorldNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const [
          recentRes,
          economyRes,
          opinionRes,
          nationalRes,
          sportsRes,
          entertainmentRes,
          diasporaRes,
          literatureRes,
          techRes,
          healthRes,
          worldRes,
        ] = await Promise.all([
          fetch(`${BASE_API_URL}/posts/recent`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/economy/top?limit=1`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/opinion/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/national/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/sports/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/entertainment/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/diaspora/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/literature/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/technology/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/health/top`).then((res) => res.json()),
          fetch(`${BASE_API_URL}/category/world/top`).then((res) => res.json()),
        ]);

        setRecentNews(recentRes.data.posts || []);
        setEconomyNews(economyRes.data.posts || []);
        setOpinionNews(opinionRes.data.posts || []);
        setNationalNews(nationalRes.data.posts || []);
        setSportsNews(sportsRes.data.posts || []);
        setEntertainmentNews(entertainmentRes.data.posts || []);
        setDiasporaNews(diasporaRes.data.posts || []);
        setLiteratureNews(literatureRes.data.posts || []);
        setTechNews(techRes.data.posts || []);
        setHealthNews(healthRes.data.posts || []);
        setWorldNews(worldRes.data.posts || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {/* Headline Section */}
      <HeadLines news={recentNews} />

      <div className="bg-slate-100">
        <div className="px-4 md:px-8 py-8">
          {/* Section 1: Latest and Technology News */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12">
              <LatestNews news={recentNews} />
            </div>
            <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
              <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                <Title title="सूचनाप्रविधि" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  {techNews.map((item, i) => (
                    <SimpleNewsCard item={item} key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Popular News Section */}
          <PopularNews type="Popular news" />

          {/* Section 2: Sports, Health, and Diaspora News */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12">
              <DetailsNewsRow news={sportsNews} category="खेलकुद" type="details-news" />
              <DetailsNews news={healthNews} category="स्वास्थ्य" />
              <DetailsNewsRow news={diasporaNews} category="प्रवास" type="details-news" />
            </div>
            <div className="w-full lg:w-4/12 space-y-5">
              <DetailsNewsCol news={nationalNews} category="देशका मुख्य समाचार" />
              <DetailsNewsCol news={economyNews} category="अर्थबाणिज्यका मुख्य समाचार" />
            </div>
          </div>

          {/* Section 3: World, National, and Opinion News */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 my-5">
              <DetailsNewsRow news={worldNews} category="विश्व" type="details-news" />
            </div>
            <div className="w-full lg:w-4/12 mt-5">
              <Title title="विचारका मुख्य समाचार" />
              <div className="grid grid-cols-1 gap-y-[14px] mt-4">
                {opinionNews.map((item, i) => (
                  <NewsCard item={item} key={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Entertainment and Literature News */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12">
              <DetailsNewsRow news={entertainmentNews} category="मनोरञ्जन" type="details-news" />
            </div>
            <div className="w-full lg:w-6/12">
              <DetailsNewsRow news={literatureNews} category="साहित्य" type="details-news" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
