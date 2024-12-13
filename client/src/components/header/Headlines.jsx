import { Link } from 'react-router-dom'; // React Router Link
import LoadingSpinner from 'react-spinners-components';
import Marquee from 'react-fast-marquee';

const HeadLines = ({ news }) => {
    // Ensure the news array is valid
    if (!Array.isArray(news) || news.length === 0) {
        return <div className="text-gray-500">No recent news available</div>;
    }

    return (
        <div className="bg-white shadow flex flex-wrap">
            {/* Section Title */}
            <div className="flex md:w-[170px] w-full bg-[#ddd] relative after:absolute after:bg-[#ddd] after:w-[20px] after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30">
                <div className="md:pl-8 pl-4 w-full py-2 flex justify-start items-center gap-x-1">
                    <span>
                        <LoadingSpinner type="Ripple" colors={['#800000', '#c80000']} size="30px" />
                    </span>
                    <h2 className="text-[#333333] font-semibold text-lg">ब्रेकिङ</h2>
                </div>
            </div>
            {/* Marquee with Recent News */}
            <div className="flex md:w-[calc(100%-170px)] w-full">
                <div className="flex w-full justify-start items-center">
                    <Marquee>
                        {news.map((article, i) => (
                            <Link
                                key={article._id || i} // Use `_id` if available, fallback to `i`
                                className="py-3 block font-normal hover:text-[#c80000] pr-12 text-sm"
                                to={`/news/${article.slug}`} // Adjust the route as needed
                            >
                                {article.title}
                            </Link>
                        ))}
                    </Marquee>
                </div>
            </div>
        </div>
    );
};

export default HeadLines;
