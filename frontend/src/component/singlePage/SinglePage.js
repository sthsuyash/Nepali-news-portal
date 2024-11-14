import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { hero } from "../../dummyData";
import Side from "../home/sideContent/side/Side";
import SinglePageSlider from "./slider/SinglePageSlider";

const SinglePage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const item = hero.find((item) => item.id === parseInt(id));
    window.scrollTo(0, 0);
    if (item) {
      setItem(item);
    }
  }, [id]);

  return (
    <>
      {item ? (
        <main className="mt-12">
          <SinglePageSlider />
          <div className="container flex justify-between">
            <section className="mainContent details pr-12">
              <h1 className="title text-4xl font-bold leading-snug">{item.title}</h1>

              <div className="author flex items-center font-medium my-5">
                <span>by</span>
                <img src={item.authorImg} alt="" className="w-12 h-12 object-cover rounded-full mx-4" />
                <p>{item.authorName} on</p>
                <label className="text-gray-500">{item.time}</label>
              </div>

              <div className="social flex mb-5">
                <div className="socBox bg-blue-600 p-3 mr-5 text-white flex items-center">
                  <i className="fab fa-facebook-f mr-4"></i>
                  <span>SHARE</span>
                </div>
                <div className="socBox bg-red-600 p-3 mr-5 text-white flex items-center">
                  <i className="fab fa-twitter mr-4"></i>
                  <span>TWITTER</span>
                </div>
                <div className="socBox bg-blue-500 p-3 mr-5 text-white flex items-center">
                  <i className="fab fa-pinterest mr-4"></i>
                </div>
                <div className="socBox bg-red-500 p-3 text-white flex items-center">
                  <i className="fa fa-envelope mr-4"></i>
                </div>
              </div>

              <div className="desctop">
                {item.desc.map((val, index) => (
                  <div key={index}>
                    <p className="my-5 leading-7">{val.para1}</p>
                    <p className="my-5 leading-7">{val.para2}</p>
                  </div>
                ))}
              </div>
              <img src={item.cover} alt="" className="my-8 w-full object-cover" />
              {item.desc.map((val, index) => (
                <p key={index} className="my-5 leading-7">{val.para3}</p>
              ))}

              <div className="descbot">
                {item.details.map((data, index) => (
                  <div key={index}>
                    <h1 className="font-semibold text-2xl my-6">{data.title}</h1>
                    <p className="leading-7">{data.para1}</p>
                  </div>
                ))}
              </div>

              <div className="quote pl-12 border-l-4 border-red-600">
                <i className="fa fa-quote-left text-5xl text-red-600 mb-5"></i>
                {item.details.map((data, index) => (
                  <p key={index} className="text-lg">{data.quote}</p>
                ))}
              </div>

              <div className="desctop">
                {item.details.map((data, index) => (
                  <div key={index}>
                    <p className="my-5 leading-7">{data.para2}</p>
                    <p className="my-5 leading-7">{data.para3}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="sideContent w-1/4">
              <Side />
            </section>
          </div>
        </main>
      ) : (
        <h1>Not found</h1>
      )}
    </>
  );
};

export default SinglePage;
