import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from "../../../../config/index.js";


const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

       const getCategories = async () => {
        try {
            const res = await fetch(`${BASE_API_URL}/category`);
            const data = await res.json();
            setCategories(data.data);
        } catch (error) {
            console.error(error);
        }
    };

      useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="flex-1 flex justify-center space-x-4">
            {categories.length > 0 &&
                categories.map((category, i) => (
                    <button
                        key={i}
                        className={`px-2 font-medium text-base py-[13px] text-gray-500 ${
                            window.location.pathname === `/category/${category.name}` ? 'underline' : ''
                        }`}
                        onClick={() => navigate(`/category/${category.name}`)}
                    >
                        {category.nepaliName}
                    </button>
                ))}
        </div>
    );
};

export default Categories;

