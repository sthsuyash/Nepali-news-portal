'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import SimpleDetailsNewCard from './items/SimpleDetailsNewCard';
import { base_api_url } from '@/config';

const SearchNewsComponent = () => {
    const [news, setNews] = useState([]);
    const [isClient, setIsClient] = useState(false);  // State to check if we are on the client

    const searchParams = useSearchParams();
    const value = searchParams.get('value');

    const get_news = async () => {
        if (!value) return; // If there's no search value, don't fetch

        try {
            const res = await fetch(`${base_api_url}/api/search/news?value=${value}`);
            const data = await res.json();

            if (res.ok) {
                setNews(data.news); // Only update if the response is OK
            } else {
                console.error('Failed to fetch news:', data.message || 'Unknown error');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        setIsClient(true);  // Indicate that we are on the client
    }, []);

    useEffect(() => {
        if (isClient) {
            get_news();  // Only fetch news when on the client side
        }
    }, [value, isClient]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {news.length > 0 ? (
                news.map((item, i) => (
                    <SimpleDetailsNewCard key={i} news={item} type="details-news" height={200} />
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500">No news found.</div>
            )}
        </div>
    );
};

export default function SearchNews() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchNewsComponent />
        </Suspense>
    );
}
