import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { BASE_API_URL } from "../../config";

const Category = ({ titleStyle }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${BASE_API_URL}/category`);
      const data = await res.json();
      setCategories(data.data);
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div
        className={`text-xl font-bold ${titleStyle} relative before:absolute before:w-[4px] before:bg-[#c80000] before:h-full before:-left-0 pl-3`}
      >
        प्रकार
      </div>
      <div
        className={`flex flex-col justify-start items-start text-sm gap-y-3 ${titleStyle} pt-3 font-medium`}
      >
        {categories && categories.length > 0 ? (
          categories.map((item, i) => (
            <li className="list-none" key={i}>
              <Link to={`/category/${item.name}`}>
                {item.nepaliName} ({item._count.posts})
              </Link>
            </li>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>
    </div>
  );
};

export default Category;
