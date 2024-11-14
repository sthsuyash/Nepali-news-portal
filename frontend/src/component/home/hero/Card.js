import React from "react";
import { Link } from "react-router-dom";

const Card = ({
  item: { id, cover, category, title, authorName, time },
  coverStyle = "h-full",
}) => {
  return (
    <div className="relative bg-white shadow-md rounded-md overflow-hidden flex flex-col justify-end p-4 text-white h-full">
      <div className="absolute inset-0">
        <img
          src={cover}
          alt={title}
          className={`w-full ${coverStyle} object-cover`}
        />
      </div>
      <div className="relative z-10">
        <span
          className={`category text-xs font-bold py-1 px-2 rounded ${
            category === "Featured"
              ? "bg-red-600"
              : category === "Sport"
              ? "bg-green-600"
              : category === "Fashion"
              ? "bg-yellow-600"
              : "bg-gray-500"
          }`}
        >
          {category}
        </span>
        <Link to={`/SinglePage/${id}`} className="block mt-2">
          <h1 className="titleBg text-lg font-semibold hover:text-red-400 transition-colors duration-200">
            {title}
          </h1>
        </Link>
        <div className="author flex justify-between items-center text-sm mt-3">
          <span>by {authorName}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
