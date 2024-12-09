import { Search, X } from 'lucide-react';

const SearchBar = ({ show, toggleSearchBar }) => {
    return (
        <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <div
                onClick={toggleSearchBar}  // Toggle search bar visibility
                className={`text-xl ${show ? 'bg-[#00000026]' : ''} font-bold h-full w-[48px] cursor-pointer justify-center flex items-center hover:bg-[#00000026]`}
            >
                {show ? <X size={24} /> : <Search size={24} />}
            </div>

            {/* Search Bar */}
            <div
                className={`absolute lg:block transition-all text-slate-700 z-20 shadow-lg lg:right-10 top-[50px] w-full lg:w-[300px] right-0 ${
                    show ? 'visible' : 'invisible'
                }`}
            >
                <div className="p-3 bg-white">
                    <form className="flex">
                        <div className="w-[calc(100%-45px)] h-[40px]">
                            <input
                                required
                                type="text"
                                placeholder="search"
                                className="h-full w-full p-2 border border-slate-300 outline-none bg-slate-100"
                            />
                        </div>
                        <button className="w-[45px] hover:bg-red-700 cursor-pointer h-[40px] flex justify-center outline-none items-center bg-red-600 text-white text-xl">
                            <Search size={20} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;


