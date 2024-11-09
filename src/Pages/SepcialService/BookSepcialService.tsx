import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuth from "./../../Hooks/useAuth";
import workPositionsData from './workpostion.json';

interface FormData {
  name: string;
  email: string;
  uid: string;
  serviceId: string;
  serviceName: string;
  paid: boolean;
  price: number;
  address: string;
  city: string;
  date: string;
}

const BookSpecialService = () => {
  const [serviceData, setServiceData] = useState<any>([]);
  const [formData, setFormData] = useState<any>([]);
  const [booked, setBooked] = useState<any>(false);
  const { user } = useAuth();
  const { serviceId } = useParams();
  const minDate = new Date().toISOString().slice(0, 16);
  // const maxDate = tomo_date.toISOString().slice(0, 16);

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    setServiceData(workPositionsData[3])
  }, [serviceId]);

  const handleOnChange = (e: any) => {
    const field = e.target.name;
    const value = e.target.value;
    const data = { ...formData };
    data[field] = value;
    setFormData(data);
  };

  const handleBookService = (e: any) => {
    e.preventDefault();
    formData.name = user.displayName;
    formData.email = user.email;
    formData.uid = user.uid;
    formData.serviceId = null;
    formData.serviceName = "SpecalService";
    formData.paid = true;
    formData.price = 80;
    axios
      .post("https://homeservice-ixli.onrender.com/bookingservice", formData)
      .then(function (res: any) {
        setBooked(true);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  return (
    <div>
      {/* <BookedServiceNotification /> */}
      <div className="mt-10 sm:mt-0 mx-8 my-8">
        <div>
          <div className="mt-5 md:mt-0 md:col-span-3">
            <form onSubmit={handleBookService}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <h2 className="text-2xl font-bold text-center mb-6">Book Special Service</h2>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={user.displayName}
                        disabled
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>

                    <div className="col-span-6 ">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Contact Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email-address"
                        // value={user.email}
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        
                        onChange={handleOnChange}
                        pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                        required
                        title="Please enter a valid email address, like name@domain.com"
                        />
                    </div>

                    <div className="col-span-6 ">
                    <label>
                    <input
                          type="checkbox"
                          name="vaccinated"
                          onChange={handleOnChange}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                          required
                        />{" "}
                        Have you been vaccinated?
                      </label>
                    </div>

                    

                    {/* date picker */}
                    <div className="col-span-6 sm:col-span-5 lg:col-span-4">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Date
                      </label>
                      <input
                        type="datetime-local"
                        required
                        name="date"
                        onChange={handleOnChange}
                        id="date"
                        min={minDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <Link
                        type="button"
                        to="/pay"
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={() => setBooked(false)}
                     >
                    Pay A Deposite
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Transition.Root show={booked} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={() => setBooked(false)}
        >
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <CheckCircleIcon
                      className="text-green-600 mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10 animate-pulse"
                      aria-hidden="true"
                    />
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900 mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left"
                    >
                      Booked Successfully
                    </Dialog.Title>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Link
                    type="button"
                    to="/pay"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setBooked(false)}
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default BookSpecialService;

