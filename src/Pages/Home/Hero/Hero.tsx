import { LocationMarkerIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";
import HeroImage from "../../../Assets/homepage.jpg";
import { APIProvider,Map } from "@vis.gl/react-google-maps";


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
                <span className="block text-indigo-600 xl:inline">
                  Your Home Service
                </span>{" "}
                <span className="block xl:inline">On the way</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Always providing the best home service with specialized{" "}
                <span className="text-indigo-600">
                  designer, cleaner, plumber and so on.
                </span>{" "}
              </p>
              <APIProvider apiKey={"AIzaSyDgicFQQLNsNJsh_Tajqhds2UIwFGdLzNE"} onLoad={() => console.log("maps working")}>
                <Map
                style={{width: '100vw', height: '100vh'}}
                defaultCenter={{lat: 22.54992, lng: 0}}
                defaultZoom={3}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
                />
              </APIProvider>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                <span className="text-gray-800 dark:text-white">
                  Click to call:{" "}
                </span>{" "}
                <a
                  href="tel:+61403352321"
                  className="text-teal-500 font-bold"
                >
                  +61403352321
                </a>
              </p>

            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src={HeroImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;
