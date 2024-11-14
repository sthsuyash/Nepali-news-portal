import React from "react";
import { discover } from "../../../dummyData";
import Heading from "../../common/heading/Heading";

const Discover = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <Heading title="Discover" />
        <div className="grid grid-cols-6 gap-8 md:grid-cols-3">
          {discover.map((val) => (
            <div key={val.title} className="bg-white shadow-md">
              <div className="w-38 h-25">
                <img
                  src={val.cover}
                  alt={val.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="p-2 text-center uppercase m-0">{val.title}</h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Discover;
