import { Link } from 'react-router-dom'; 

const SimpleNewsCard = ({ item, type }) => {
    return (
        <div className="group relative">
            <div className="overflow-hidden">
                <div className={`${type ? 'h-[270px] sm:h-[470px]' : 'h-[228px]'} w-full group-hover:scale-[1.1] transition-all duration-[1s]`}>
                    <img
                        className="rounded-md object-cover w-full h-full"
                        src={item.image}
                        alt="images"
                    />
                </div>
            </div>
            <div className="w-full h-full block absolute left-0 top-0 invisible group-hover:visible bg-white cursor-pointer opacity-5 transition-all duration-300"></div>
            <div className="left-5 absolute bottom-4 flex justify-start items-start flex-col text-white font-semibold gap-y-2">
                <div className="px-[6px] py-[2px] rounded-sm text-[13px] bg-[#c80000]">
                    {item.category}
                </div>
                <Link to={`/news/${item.slug}`} className="text-xl">
                    {item.title}
                </Link>
                <div className="flex gap-x-2 text-sm font-normal">
                    <span>{item.createdAt}</span>
                </div>
            </div>
        </div>
    );
};

export default SimpleNewsCard;
