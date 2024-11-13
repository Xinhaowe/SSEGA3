import React from "react";
import {
  FaAmazon,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 w-full py-8">
      <div className="max-w-screen-xl mx-auto px-4">
      <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                <span className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                If you need customer service, click to call:{" "}
                </span>{" "}
                <a
                  href="tel:+61403352321"
                  className="text-teal-500 font-bold"
                >
                  +61403352321
                </a>
              </p>
        <div className="text-center text-gray-500 dark:text-gray-200 pt-10 sm:pt-12 font-light flex items-center justify-center">
          All CopyRight Reserved 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
