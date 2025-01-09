import { useState, useEffect } from 'react';
import NepaliDate from 'nepali-date-converter';
import moment from 'moment';

const useDate = () => {
    const [currentDate, setCurrentDate] = useState('');
    const [nepaliDate, setNepaliDate] = useState('');
    const currentDateNonFormatted = new Date();

    useEffect(() => {
        try {
            // Get Nepali date using NepaliDate library
            const nepali = new NepaliDate();
            const formattedNepaliDate = nepali.format('ddd DD, MMMM YYYY', 'np');
            setNepaliDate(formattedNepaliDate);

            // Set Moment.js to Nepali locale and get the current date
            moment.locale('ne'); // Set Nepali locale for moment
            const formattedGregorianDate = moment().format('dddd, D MMMM YYYY');
            setCurrentDate(formattedGregorianDate);
        } catch (error) {
            console.error('Error setting dates:', error);
        }
    }, []);

    return { currentDateNonFormatted, currentDate, nepaliDate };
};

export default useDate;
