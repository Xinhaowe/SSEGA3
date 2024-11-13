import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../../../Components/Cards/ServiceCard/ServiceCard";
import Spinner from "../../../Components/Spinner/Spinner";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://home-service-api-g19g.onrender.com/services";
    axios.get(url).then((data: any) => {
      setLoading(false);
      setServices(data.data);
    });
  }, []);

  // Separate services into common and package services
  const commonServices = services.filter((service: any) => !service.serviceType);
  const packageServices = services.filter((service: any) => service.serviceType === "package");

  return (
    <div id="services">
      <div className="w-full bg-white dark:bg-gray-800 p-12">
        <div className="header flex items-end justify-between mb-12">
          <div className="title">
            <p className="text-4xl font-bold text-gray-800 mb-4">
              Available Services
            </p>
            <p className="text-2xl font-light text-blue-400">
              Book now 
            </p>
          </div>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <Spinner />
        ) : (
          <>
            {/* Display common services */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
              {commonServices.map((service: any) => (
                <ServiceCard key={service._id} serviceDetails={service} />
              ))}
            </div>

            {/* Display package services */}
            <div className="mt-8">
              <div className="header mb-6">
                <p className="text-3xl font-bold text-gray-800 mb-4">
                  Service Packages
                </p>
              </div>
              <div className= "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
                {packageServices.map((service: any) => (
                  <ServiceCard key={service._id} serviceDetails={service} />
                ))}
              </div>
            </div>
            
            <div className="header mb-6 justify-between mb-12 gap-12">
                <p className="text-3xl font-bold text-gray-800 mb-4 mt-16">
                  Special Service
                </p>
                <p className="text-xl text-gray-800 mb-4 mt-6">
                  Sereach your address to booking a nearby service
                </p>
              </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Services;