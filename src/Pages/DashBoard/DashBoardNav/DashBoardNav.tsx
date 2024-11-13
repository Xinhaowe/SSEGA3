import {
  FilterIcon,
  IdentificationIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import { Link, LinkProps, useMatch, useResolvedPath } from "react-router-dom";
import Spinner from "../../../Components/Spinner/Spinner";
import useAuth from "../../../Hooks/useAuth";

const DashBoardNav = () => {
  const { admin, isLoading } = useAuth();
  const userLinks = [
    {
      name: "My Bookings",
      url: "/dashboard/bookings",
      icon: <ViewListIcon className="text-green-500" width="20" height="20" />,
    },
  ];
  const dataLinks = [
    {
      name: "Booked Services",
      url: "/dashboard/admin/bookedservices",
      icon: <ViewListIcon className="text-green-500" width="20" height="20" />,
    },
  ];
  const CustomLink = ({ children, to, ...props }: LinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <Link
        className={
          match
            ? "w-full text-gray-800 dark:text-black flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-green-500 bg-gradient-to-l from-white to-green-100 border-l-4 "
            : "w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start"
        }
        to={to}
        {...props}
      >
        {children}
      </Link>
    );
  };
  return (
    <>
      <div className="hidden md:flex flex-col sm:flex-row sm:justify-around  bg-white dark:bg-gray-800">
        <div className="w-72 h-screen">
          <nav className="mt-10 px-6">

            {admin.admin ? (
              <div>
                <div>
                  <p className="text-gray-300 ml-2 w-full border-b-2 pb-2 border-gray-100 mb-4 text-md font-normal">
                    Data Visualization
                  </p>
                  {dataLinks.map((link) => (
                    <CustomLink to={link.url} key={link.url}>
                      {link.icon}
                      <span className="mx-4 text-md font-normal">
                        {link.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                {" "}
                <div>
                  <p className="text-gray-300 ml-2 w-full border-b-2 pb-2 border-gray-100 mb-4 text-md font-normal">
                    Users Services
                  </p>
                  {userLinks.map((link) => (
                    <CustomLink to={link.url} key={link.url}>
                      {link.icon}
                      <span className="mx-4 text-md font-normal">
                        {link.name}
                      </span>
                    </CustomLink>
                  ))}
                </div>
                <div>
                  <p className="text-gray-300 ml-2 w-full border-b-2 pb-2 border-gray-100 mb-4 text-md font-normal">
                    STATISTIQUES
                  </p>

                  <CustomLink to="/dashboard/review">
                    <ShieldCheckIcon
                      className="text-green-500"
                      width="20"
                      height="20"
                    />
                    <span className="mx-4 text-md font-normal">Reviews</span>
                  </CustomLink>
                </div>
              </div>
            )}
          </nav>
          <div className="absolute bottom-0 my-10">
            <CustomLink
              className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200 flex items-center py-2 px-8"
              to="/dashboard"
            >
              <QuestionMarkCircleIcon
                width="20"
                height="20"
                className="h-5 w-5"
              />

              <span className="mx-4 font-medium">Log out</span>
            </CustomLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardNav;
