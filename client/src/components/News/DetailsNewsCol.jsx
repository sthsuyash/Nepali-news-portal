import Title from "./Title";
import SimpleDetailsNewCard from "./Items/SimpleDetailsNewCard";
import NewsCard from "./Items/NewsCard";

const DetailsNewsCol = ({ news, category }) => {
  return (
    <div className="w-full flex flex-col gap-[14px] pl-2">
      <Title title={category} />
      <div className="grid grid-cols-1 gap-y-6">
        <SimpleDetailsNewCard news={news[0]} type="details-news" height={300} />
      </div>
      <div className="grid grid-cols-1 gap-y-[14px] mt-4">
        {news.map((item, i) => {
          if (i < 4) {
            return <NewsCard item={item} key={i} />;
          }
        })}
      </div>
    </div>
  );
};

export default DetailsNewsCol;