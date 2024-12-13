import { useState, useEffect } from 'react';
import NepaliDate from 'nepali-date-converter';
import moment from 'moment';
import 'moment/locale/ne';

const useDate = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [nepaliDate, setNepaliDate] = useState('');

  useEffect(() => {
    const nepali = new NepaliDate();
    const formattedNepaliDate = nepali.format('ddd DD, MMMM YYYY', 'np');
    setNepaliDate(formattedNepaliDate);

    moment.locale('ne');
    setCurrentDate(moment().format('dddd, D MMMM YYYY'));
  }, []);

  return { currentDate, nepaliDate };
};

export default useDate;
