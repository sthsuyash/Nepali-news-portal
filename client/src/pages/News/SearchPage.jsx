import Breadcrumb from "../../components/ui/Breadcrumb";
import Category from "../../components/category/Category";
import Search from "../../components/search/Search";
import PopularNews from "../../components/News/PopularNews";
import RecentNews from "../../components/News/RecentNews";
import SearchNews from "../../components/News/SearchNews";

const SearchPage = () => {
    return (
            <div>
                <div className="bg-white shadow-sm py-4">
                    <div className="px-4 md:px-8 w-full">
                        <Breadcrumb one="प्रकार " two={'खोजी परिणाम'} />
                    </div>
                </div>
                <div className="bg-slate-200 w-full">
                    <div className="px-4 md:px-8 w-full py-8">
                        <div className="flex flex-wrap">
                            {/* Left Content */}
                            <div className="w-full xl:w-8/12">
                                <div className="w-full pr-0 xl:pr-4">
                                    <SearchNews />
                                </div>
                            </div>
                            {/* Right Sidebar */}
                            <div className="w-full xl:w-4/12">
                                <div className="w-full pl-0 xl:pl-4">
                                    <div className="flex flex-col gap-y-8">
                                        <Search />
                                        <RecentNews />
                                        <div className="p-4 bg-white rounded-md">
                                            <Category titleStyle="text-gray-700 font-bold" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pt-8">
                            <PopularNews type="Popular news" />
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default SearchPage;
