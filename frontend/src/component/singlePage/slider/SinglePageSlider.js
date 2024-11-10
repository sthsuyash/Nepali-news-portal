import React from "react";
import Slider from "react-slick";
import { popular } from "../../../dummyData";

// same code of popular and change some part
const SinglePageSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="singlePopular overflow-hidden">
      <div className="content">
        <Slider {...settings}>
          {popular.map((val) => {
            return (
              <div className="items">
                <div className="box relative cursor-pointer">
                  <div className="images">
                    <img
                      src={val.cover}
                      alt={val.title}
                      className="w-[210px] h-[100px] rounded-[5px]"
                    />
                  </div>
                  <div className="text absolute bottom-[30px] left-0 p-[10px] text-white">
                    <h1 className="title text-[13px]">{val.title}</h1>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </section>
  );
};

export default SinglePageSlider;
