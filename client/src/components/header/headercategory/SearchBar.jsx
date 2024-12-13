import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import Input from '../../ui/Input';

const SearchBar = ({ show, toggleSearchBar }) => {
    const [state, setState] = useState('');
    const navigate = useNavigate(); 

    const search = (e) => {
    e.preventDefault();
    navigate(`/search/news?q=${state}`); // Navigate to search results page
    setState(''); // Clear input field after submitting
    };
    
    return (
        <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <div
                onClick={toggleSearchBar}  // Toggle search bar visibility
                className={`text-xl font-bold h-full w-[48px] cursor-pointer justify-center flex items-center hover:text-red-400`}
            >
                {show ? <X size={24} /> : <Search className='text-red-500' size={24} />}
            </div>

            {/* Search Bar */}
            <div
                className={`absolute lg:block transition-all text-slate-700 z-20 shadow-lg lg:right-10 top-[50px] w-full lg:w-[300px] right-0 ${
                    show ? 'visible' : 'invisible'
                }`}
            >
                    <form className="flex" onSubmit={search}>
                        <div className="w-[calc(100%)] h-[40px]">
                            <Input
                                icon={Search}
                                required
                                type="text"
                                placeholder="search"
                                onChange={(e) => setState(e.target.value)} // Update state on input change
                                className="h-full w-full p-2 border border-slate-300 outline-none bg-slate-100"
                            />
                        </div>
                    </form>
            </div>
        </div>
    );
};

export default SearchBar;


