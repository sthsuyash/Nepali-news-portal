import React, { useState } from "react";
import { hero } from "../../../dummyData";
import Card from "./Card";

const Hero = () => {
  const [items, setItems] = useState(hero);

  return (
    <section className="hero my-8">
      <div className="container mx-auto flex flex-wrap gap-4">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          {/* Large Featured Card */}
          <div className="w-full lg:w-2/3 h-[60vh]">
            <Card item={items[0]} />
          </div>

          {/* Right Section with 3 Cards */}
          <div className="flex flex-col gap-4 w-full lg:w-1/3">
            {/* Top Two Smaller Cards */}

            {/* Bottom Larger Card */}
            <div className="w-full h-[30vh]">
              <Card item={items[1]} />
            </div>
            <div className="flex gap-4 h-[28vh]">
              <div className="w-1/2">
                <Card item={items[2]} />
              </div>
              <div className="w-1/2">
                <Card item={items[3]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
