import React from "react";
import Discover from "../../discover/Discover";
import Side from "../../sideContent/side/Side";
import Life from "../life/Life";
import Music from "../musics/Music";
import Popular from "../popular/Popular";
import Ppost from "../Ppost/Ppost";

const Homes = () => {
  return (
    <main className="flex flex-col">
      <div className="container mx-auto flex flex-col md:flex-row gap-4 md:justify-between">
        <section className="mainContent md:w-3/4">
          <Popular />
          <Ppost />
          <Life />
          <Music />
        </section>
        <section className="sideContent md:w-[23%]">
          <Side />
        </section>
      </div>
    </main>
  );
};

export default Homes;
