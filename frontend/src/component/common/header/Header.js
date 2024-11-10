import React, { useState } from "react";
import Head from "./Head";
import { Link } from "react-router-dom";

const Header = () => {
  const [navbar, setNavbar] = useState(false);

  return (
    <>
      <Head />
      <header className="bg-black text-white">
        <div className="container mx-auto p-4">
          <nav className="flex justify-between items-center">
            <ul
              className={`${navbar ? "flex flex-col bg-red-500 w-full h-64 absolute top-20 left-0 z-10 p-10" : "hidden md:flex"} space-y-4 md:space-y-0 md:space-x-8`}
              onClick={() => setNavbar(false)}
            >
              <li>
                <Link to="/" className="hover:text-crimson transition duration-500">Home</Link>
              </li>
              <li>
                <Link to="/culture" className="hover:text-crimson transition duration-500">Culture</Link>
              </li>
              <li>
                <Link to="/politics" className="hover:text-crimson transition duration-500">Politics</Link>
              </li>
              <li>
                <Link to="/memes" className="hover:text-crimson transition duration-500">Memes</Link>
              </li>
              <li>
                <Link to="/sports" className="hover:text-crimson transition duration-500">Sports</Link>
              </li>
              <li>
                <Link to="/boxed" className="hover:text-crimson transition duration-500">Boxed</Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-crimson transition duration-500">Reviews</Link>
              </li>
            </ul>
            <button
              className="text-white text-2xl md:hidden"
              onClick={() => setNavbar(!navbar)}
            >
              {navbar ? <i className="fa fa-times"></i> : <i className="fa fa-bars"></i>}
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
