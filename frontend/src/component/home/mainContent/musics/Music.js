import React from "react";
import Slider from "react-slick";
import Heading from "../../../common/heading/Heading";
import { popular } from "../../../../dummyData";

const Music = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 1,
  };

  return (
    <section className="music my-8">
      <Heading title="Music News" />
      <div className="content">
        <Slider {...settings}>
          {popular
            .filter((val) => val.catgeory === "fun")
            .map((val, index) => (
              <div key={index} className="items">
                <div className="box shadow-lg mb-8 flex flex-col sm:flex-row">
                  <div className="images w-full sm:w-80 sm:h-56 relative">
                    <img
                      src={val.cover}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className="category absolute top-2 left-2 bg-primary px-2 py-1 text-white rounded">
                      <span>{val.catgeory}</span>
                    </div>
                  </div>
                  <div className="text p-5 flex flex-col justify-between">
                    <h1 className="title text-xl font-semibold mb-3">
                      {val.title.slice(0, 40)}...
                    </h1>
                    <div className="date text-gray-500 text-sm mb-2 flex items-center">
                      <i className="fas fa-calendar-days mr-2"></i>
                      <label>{val.date}</label>
                    </div>
                    <p className="desc text-gray-700 text-sm mb-3">
                      {val.desc.slice(0, 250)}...
                    </p>
                    <div className="comment text-gray-600 text-sm flex items-center">
                      <i className="fas fa-share mr-2"></i>
                      <label>Share / </label>
                      <i className="fas fa-comments ml-2 mr-2"></i>
                      <label>{val.comments}</label>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </Slider>
      </div>
    </section>
  );
};

export default Music;
