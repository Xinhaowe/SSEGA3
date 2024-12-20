import { LocationMarkerIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import HeroImage from "../../../Assets/homepage.jpg";


const Hero = () => {
  return (
    <div className="relative bg-white dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-800 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-800 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          <main className="mx-auto max-w-7xl px-4 sm:px-6 z-10 lg:px-8 pt-10 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                {/* <span className="block xl:inline">The absolute best </span>{" "} */}
                <span className="block text-green-600 xl:inline">
                  Your Home Service
                </span>{" "}
                <span className="block xl:inline">On the way</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Always providing the best home service with specialized{" "}
                <span className="text-green-600">
                  designer, cleaner, plumber and so on.
                </span>{" "}
              </p>
              
             

            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <button>
          
        </button>
      </div>
    </div>
  );
};

export default Hero;
