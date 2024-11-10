import React from "react";
import Slider from "react-slick";
import { lifestyle } from "../../../../dummyData";
import Heading from "../../../common/heading/Heading";

const Life = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="popularPost life my-8">
      <Heading title="Life Style" />
      <div className="content">
        <Slider {...settings}>
          {lifestyle.map((val, index) => (
            <div key={index} className="items">
              <div className="box shadow-lg m-4">
                <div className="images relative">
                  <div className="img overflow-hidden">
                    <img
                      src={val.cover}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="category absolute top-2 left-2 bg-primary px-2 py-1 text-white rounded">
                    <span>{val.category}</span>
                  </div>
                </div>
                <div className="text p-5">
                  <h1 className="title text-lg font-semibold mb-2">
                    {val.title.slice(0, 40)}...
                  </h1>
                  <div className="date text-gray-500 text-sm flex items-center">
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

export default Life;
