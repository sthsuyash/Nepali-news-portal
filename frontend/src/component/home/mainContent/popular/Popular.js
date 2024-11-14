import React from "react";
import Slider from "react-slick";
import { popular } from "../../../../dummyData";
import Heading from "../../../common/heading/Heading";

// Importing slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Popular = () => {
  const settings = {
    className: "center",
    centerMode: false,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 2,
    speed: 500,
    rows: 4,
    slidesPerRow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          rows: 4,
        },
      },
    ],
  };

  return (
    <section className="popular my-8">
      <Heading title="Popular" />
      <div className="content">
        <Slider {...settings}>
          {popular.map((val, index) => (
            <div key={index} className="items">
              <div className="box shadow-lg flex flex-col sm:flex-row m-3 bg-white">
                <div className="images relative w-full sm:w-1/3 h-36 sm:h-40">
                  <img
                    src={val.cover}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="category absolute top-2 left-2 bg-primary px-2 py-1 text-white rounded">
                    <span>{val.catgeory}</span>
                  </div>
                </div>
                <div className="text flex flex-col justify-between p-4 sm:p-6 w-full sm:w-2/3">
                  <h1 className="title text-xl font-semibold mb-2">{val.title.slice(0, 40)}...</h1>
                  <div className="date text-sm text-gray-500 flex items-center mb-2">
                    <i className="fas fa-calendar-days mr-2"></i>
                    <label>{val.date}</label>
                  </div>
                  <div className="comment text-sm text-gray-500 flex items-center">
                    <i className="fas fa-comments mr-2"></i>
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

export default Popular;
