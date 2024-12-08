import { useState } from 'react';

import Categories from './Categories';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';


const SecondaryHeader = () => {
    const [showSearchBar, setShowSearchBar] = useState(false); // State for SearchBar visibility
    const [showUserMenu, setShowUserMenu] = useState(false);   // State for UserMenu visibility

    const toggleSearchBar = () => {
        setShowSearchBar(!showSearchBar);
        setShowUserMenu(false);  // Hide UserMenu when SearchBar is toggled
    };

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu);
        setShowSearchBar(false);  // Hide SearchBar when UserMenu is toggled
    };

    return (
        <div className="w-full">
            <hr className="my-2" /> {/* Horizontal line above */}
            <div className="w-full text-black uppercase font-semibold relative">
                <div className="px-8 flex justify-between items-center relative h-[48px]">
                    {/* Categories Section */}
                    <Categories/>

                    {/* SearchBar and UserMenu */}
                    <div className="flex items-center space-x-4">
                        <SearchBar show={showSearchBar} toggleSearchBar={toggleSearchBar} />
                        <UserMenu show={showUserMenu} toggleUserMenu={toggleUserMenu} />
                    </div>
                </div>
            </div>
            <hr className="mt-2" /> {/* Horizontal line below */}
        </div>
    );
};

export default SecondaryHeader;
