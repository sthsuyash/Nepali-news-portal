import Title from "../components/News/Title";
import HeadLines from "../components/Header/Headlines";
import LatestNews from "../components/News/LatestNews";
import PopularNews from "../components/News/PopularNews";
import DetailsNewsRow from "../components/News/DetailsNewsRow";
import DetailsNews from "../components/News/DetailsNews";
import DetailsNewsCol from "../components/News/DetailsNewsCol";
import NewsCard from "../components/News/Items/NewsCard";
import SimpleNewsCard from "../components/News/Items/SimpleNewsCard";
import NewsSkeleton from "../components/skeletons/HomePageSkeletion";

import useFetchNews from "../hooks/useFetchNews";

const HomePage = () => {
  const { loading, newsData } = useFetchNews();

  if (loading) {
    return <NewsSkeleton />;
  }

  return (
    <main>
      {/* Headline Section */}
      <HeadLines news={newsData.recentNews} />

      <div className="bg-slate-100">
        <div className="px-4 md:px-8 py-8">
          {/* Section 1: Latest and Technology News */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12">
              <LatestNews news={newsData.recentNews} />
            </div>
            <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
              <div className="flex w-full flex-col gap-y-[14px] pl-0 lg:pl-2">
                <Title title="सूचनाप्रविधि" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px]">
                  {newsData.techNews.map((item, i) => (
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
              <DetailsNewsRow news={newsData.sportsNews} category="खेलकुद" type="details-news" />
              <DetailsNews news={newsData.healthNews} category="स्वास्थ्य" />
              <DetailsNewsRow news={newsData.diasporaNews} category="प्रवास" type="details-news" />
            </div>
            <div className="w-full lg:w-4/12 space-y-5">
              <DetailsNewsCol news={newsData.nationalNews} category="देशका मुख्य समाचार" />
              <DetailsNewsCol news={newsData.economyNews} category="अर्थबाणिज्यका मुख्य समाचार" />
            </div>
          </div>

          {/* Section 3: World, National, and Opinion News */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-8/12 my-5">
              <DetailsNewsRow news={newsData.worldNews} category="विश्व" type="details-news" />
            </div>
            <div className="w-full lg:w-4/12 mt-5">
              <Title title="विचारका मुख्य समाचार" />
              <div className="grid grid-cols-1 gap-y-[14px] mt-4">
                {newsData.opinionNews.map((item, i) => (
                  <NewsCard item={item} key={i} />
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Entertainment and Literature News */}
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12">
              <DetailsNewsRow news={newsData.entertainmentNews} category="मनोरञ्जन" type="details-news" />
            </div>
            <div className="w-full lg:w-6/12">
              <DetailsNewsRow news={newsData.literatureNews} category="साहित्य" type="details-news" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
