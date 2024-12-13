import { api } from "../config";
import { useState, useEffect } from "react";

const useFetchNews = () => {
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState({});

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
          api.get("/posts/recent"),
          api.get("/category/economy/top?limit=1"),
          api.get("/category/opinion/top"),
          api.get("/category/national/top"),
          api.get("/category/sports/top"),
          api.get("/category/entertainment/top"),
          api.get("/category/diaspora/top"),
          api.get("/category/literature/top"),
          api.get("/category/technology/top"),
          api.get("/category/health/top"),
          api.get("/category/world/top"),
        ]);

        setNewsData({
          recentNews: recentRes.data.data.posts || [],
          economyNews: economyRes.data.data.posts || [],
          opinionNews: opinionRes.data.data.posts || [],
          nationalNews: nationalRes.data.data.posts || [],
          sportsNews: sportsRes.data.data.posts || [],
          entertainmentNews: entertainmentRes.data.data.posts || [],
          diasporaNews: diasporaRes.data.data.posts || [],
          literatureNews: literatureRes.data.data.posts || [],
          techNews: techRes.data.data.posts || [],
          healthNews: healthRes.data.data.posts || [],
          worldNews: worldRes.data.data.posts || [],
        });
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { loading, newsData };
};

export default useFetchNews;