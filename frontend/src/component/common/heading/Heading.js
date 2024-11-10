import React from "react";
// import titlePattern from "../../../../public/images/title_pattern.png";

const Heading = ({ title }) => {
  return (
    <div
      className="my-8 h-9 bg-center"
      style={{ backgroundImage: `url('./images/title_pattern.png')` }}
    >
      <h6 className="font-normal bg-[#fb4c35] text-white h-9 w-32 text-center flex items-center justify-center text-sm">
        {title}
      </h6>
    </div>
  );
};

export default Heading;
