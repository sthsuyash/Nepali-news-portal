import {
    Facebook,
    YoutubeIcon,
    InstagramIcon,
    TwitterIcon
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-white text-gray-600 py-12">
      <div className="container mx-auto px-6">
        {/* Footer Content - Flex Layout */}
        <div className="flex flex-wrap justify-between gap-8 space-y-5 md:space-y-0">
          {/* About Us Section */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <h2 className="text-lg font-semibold mb-4">हाम्रो बारेमा</h2>
            <p className="text-sm text-gray-500 text-justify">
              यो वेबसाइट राष्ट्रिय दैनिकको आधिकारिक न्युज पोर्टल हो। नेपाली भाषाको यो पोर्टलले समाचार, विचार, मनोरञ्जन, खेल,
              विश्व, सूचना प्रविधि तथा जीवनका विभिन्न आयामका समाचार र विश्लेषणलाई समेट्छ।
            </p>
            <br />
            <a href="/about-us" className="text-blue-600 hover:underline text-sm">पूरा पढ्नुहोस् »</a>
          </div>

          {/* Useful Links Section */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <h2 className="text-lg font-semibold mb-4">उपयोगी लिंकहरु</h2>
            <ul className="list-none space-y-0">
              <li><a href="/advertise" className="text-sm text-gray-500 hover:text-gray-700">विज्ञापन - पत्रिका</a></li>
              <li><a href="/faq" className="text-sm text-gray-500 hover:text-gray-700">सल्लाह सुझाव</a></li>
              <li><a href="/contact-us" className="text-sm text-gray-500 hover:text-gray-700">सम्पर्क गर्नुहोस्</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full sm:w-1/3 lg:w-1/4">
            <h2 className="text-lg font-semibold mb-4">सम्पर्क ठेगाना</h2>
            <address className="text-sm text-gray-500 not-italic">
              नेपाली न्यूज पोर्टल प्रा. लि.<br />
              काठमाडौं, नेपाल <br /><br />
              +977-01-5432132<br />
              +977-01-5432133
            </address>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-6 mt-6 justify-center">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 transition-all duration-300">
            <Facebook className="text-2xl" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-all duration-300">
            <TwitterIcon className="text-2xl" />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:text-red-500 transition-all duration-300">
            <YoutubeIcon className="text-2xl" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-pink-700 hover:text-pink-500 transition-all duration-300">
            <InstagramIcon className="text-2xl" />
          </a>
        </div>

        {/* App Links Section */}
        <div className="mt-10 flex space-x-6 justify-center">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <img
              src="https://jcss-cdn.ekantipur.com/kantipurdaily/images/play-store.png"
              alt="Play Store"
              className="w-32"
            />
          </a>
          <a href="https://itunes.apple.com/np/app/kantipur-daily/id1247241220?mt=8" target="_blank" rel="noopener noreferrer">
            <img
              src="https://jcss-cdn.ekantipur.com/kantipurdaily/images/app-store.png"
              alt="App Store"
              className="w-32"
            />
          </a>
        </div>

        <hr className='my-8 bg-gray-200 border-0 dark:bg-gray-700' />

        {/* Copyright section */}
        <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; 2024 Nepali News Portal Pvt. Ltd. All Rights Reserved.
          <br />
          Developed by <a href="https://www.suyashshrestha.com.np" className="text-blue-500 hover:text-blue-700">Suyash Shrestha</a> | <a href="https://github.com/amishb7" className="text-blue-500 hover:text-blue-700">Amish Bajracharya</a> | <a href="https://github.com/prashannastha7" className="text-blue-500 hover:text-blue-700">Prashanna B. Shrestha</a>
          <br />
          <a href="/privacy-policy" className="text-blue-500 hover:text-blue-700">Privacy Policy</a> | <a href="/terms-of-use" className="text-blue-500 hover:text-blue-700">Terms of Use</a>
          <br />
          <a href="/cookie-policy" className="text-blue-500 hover:text-blue-700">Cookie Policy</a> | <a href="/contact" className="text-blue-500 hover:text-blue-700">Contact Us</a>
          <br />
          <a href="/advertise" className="text-blue-500 hover:text-blue-700">Advertise</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
