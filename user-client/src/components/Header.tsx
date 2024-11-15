'use client';

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/ne';  // Import Nepali locale
import Image from 'next/image';

import HeaderCategory from './HeaderCategory';
import logo from '../../public/logo.png';
import bg_header from '../../public/header-bg.jpg';

const Header = () => {
    const [currentTime, setCurrentTime] = useState<string>('');  // Initialize with an empty string

    useEffect(() => {
        // Set the moment.js locale to Nepali
        moment.locale('ne');

        // Update the time every second (1s)
        const intervalId = setInterval(() => {
            setCurrentTime(moment().format('dddd, D MMMM YYYY, A, h:mm:ss')); // Format with seconds
        }, 1000);

        // Set the initial time after mounting
        setCurrentTime(moment().format('dddd, D MMMM YYYY, A h:mm:ss'));

        // Clean up the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, []);  // Empty dependency array ensures this runs once on mount

    return (
        <div>
            <div className='px-5 lg:px-8 flex justify-between items-center bg-[#333333] text-[#cccccc]'>
                {/* Display running Nepali Date and Time */}
                {currentTime && <span className='text-[15px] py-3 font-medium'>{currentTime}</span>}  {/* Only render after time is set */}
            </div>
            <div style={{ backgroundImage: `url(${bg_header.src})`, backgroundSize: 'cover' }}>
                <div className="px-8 py-10">
                    <div className='flex justify-center items-center flex-wrap'>
                        <div className='md:w-4/12 w-full'>
                            <div className='flex flex-col justify-center items-center md:items-start'>
                                <Image className='w-[200px] h-[45px]' alt='logo' src={logo} />
                            </div>
                        </div>
                        <div className='md:w-8/12 w-full hidden md:block'>
                            <div className='w-full flex justify-end'>
                                {/* Optional Advertisement */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <HeaderCategory />
        </div>
    );
};

export default Header;
