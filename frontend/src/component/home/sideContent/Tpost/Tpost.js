import React from "react";
import { tpost } from "../../../../dummyData";
import Heading from "../../../common/heading/Heading";

const Tpost = () => {
  return (
    <section className="tpost">
      <Heading title="Tiktok post" />
      {tpost.map((val, index) => (
        <div key={index} className="box flex items-center mb-5">
          <div className="img">
            <img
              src={val.cover}
              alt={`tiktok-post-${index}`}
              className="w-24 h-20 object-cover"
            />
          </div>
          <div className="text ml-4">
            <h1 className="title text-base font-medium">{val.title.slice(0, 35)}...</h1>
            <span className="text-sm text-gray-500">a year ago</span>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Tpost;
