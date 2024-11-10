import React from "react";
import Slider from "react-slick";
import { ppost } from "../../../../dummyData";
import Heading from "../../../common/heading/Heading";

// Importing slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Ppost = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
  };

  return (
    <section className="popularPost my-8">
      <Heading title="Popular Posts" />
      <div className="content">
        <Slider {...settings}>
          {ppost.map((val, index) => (
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
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Ppost;
