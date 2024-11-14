import React from "react";
import Slider from "react-slick";
import Heading from "../../../common/heading/Heading";
import { gallery } from "../../../../dummyData";
import Tpost from "../Tpost/Tpost";
import SocialMedia from "../social/SocialMedia";

// Importing slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Side = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const catgeory = [
    "world",
    "travel",
    "sport",
    "fun",
    "health",
    "fashion",
    "business",
    "technology",
  ];

  return (
    <>
      <Heading title="Stay Connected" />
      <SocialMedia />

      <Heading title="Subscribe" />

      <section className="subscribe border p-5 text-center">
        <h1 className="text-lg text-left mb-4">Subscribe to our New Stories</h1>
        <form action="" className="space-y-4">
          <input
            type="email"
            placeholder="Email Address..."
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-3 bg-red-600 text-white font-semibold rounded"
          >
            <i className="fa fa-paper-plane mr-2"></i> SUBMIT
          </button>
        </form>
      </section>

      <section className="banner my-8">
        <img
          src="./images/sidebar-banner-new.jpg"
          alt="banner"
          className="w-full h-80 object-cover"
        />
      </section>

      <Tpost />

      <section className="catgorys">
        <Heading title="Categories" />
        <div className="space-y-4">
          {catgeory.map((val, index) => (
            <div
              key={index}
              className="category bg-gray-100 p-4 rounded-md shadow-md text-center"
            >
              <span className="font-medium text-gray-700">{val}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="gallery my-8">
        <Heading title="Gallery" />
        <Slider {...settings}>
          {gallery.map((val, index) => (
            <div key={index} className="img">
              <img
                src={val.cover}
                alt={`gallery-image-${index}`}
                className="w-80 h-52 object-cover rounded-md"
              />
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
};

export default Side;
