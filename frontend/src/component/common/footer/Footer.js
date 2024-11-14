import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-white py-12 mt-12">
        <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-4">
          {/* Logo and Contact Info */}
          <div className="space-y-4">
            <img src="../images/tech-logo-footer.png" alt="Tech Logo" />
            <p>
              Busan is an amazing magazine Blogger theme that is easy to
              customize for your needs.
            </p>
            <div className="flex items-center">
              <i className="fa fa-envelope mr-2"></i>
              <span>News@khabar.com</span>
            </div>
            <div className="flex items-center">
              <i className="fa fa-headphones mr-2"></i>
              <span>+91 60521488</span>
            </div>
          </div>

          {/* Sport Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">SPORT</h3>
            <div className="flex items-start mb-4">
              <img
                src="../images/hero/hero1.jpg"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <p className="ml-4">
                Google To Boost Android Security In Few Days
              </p>
            </div>
            <div className="flex items-start">
              <img
                src="../images/hero/hero2.jpg"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <p className="ml-4">Cespedes play the winning Baseball Game</p>
            </div>
          </div>

          {/* Cricket Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">CRICKET</h3>
            <div className="flex items-start mb-4">
              <img
                src="../images/hero/hero3.jpg"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <p className="ml-4">
                US Promises to give Intel aid to locate the soldiers
              </p>
            </div>
            <div className="flex items-start">
              <img
                src="../images/hero/hero1.jpg"
                alt=""
                className="w-20 h-20 object-cover"
              />
              <p className="ml-4">
                Renewable energy dead as industry waits for Policy
              </p>
            </div>
          </div>

          {/* Labels Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-4">LABELS</h3>
            <ul className="space-y-3">
              <li className="flex justify-between items-center border-b border-white/30 pb-1">
                <span>Boxing</span> <label>(5)</label>
              </li>
              <li className="flex justify-between items-center border-b border-white/30 pb-1">
                <span>Fashion</span> <label>(6)</label>
              </li>
              <li className="flex justify-between items-center border-b border-white/30 pb-1">
                <span>Health</span> <label>(7)</label>
              </li>
              <li className="flex justify-between items-center">
                <span>Nature</span> <label>(9)</label>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Legal Section */}
      <div className="bg-black text-gray-500 py-4 border-t border-white/30">
        <div className="container mx-auto flex justify-between items-center px-4">
          <p>© all rights reserved</p>
          <p>
            made with <i className="fa fa-heart text-red-500"></i> by Suyash ,
            Amish & Prashanna
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
