import React from "react";
import LoginBanner from "../../../Assets/clean.png";
import useAuth from "../../../Hooks/useAuth";
import LoginForm from "./../../Forms/LoginForm/LoginForm";
import RegisterForm from "./../../Forms/RegisterForm/RegisterForm";
const LoginRegisterRoot = () => {
  const { isLogin, setIsLogin, socialSignIn, error } = useAuth();
  if (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
  const changeForm = () => {
    if (isLogin) {
      setIsLogin(false);
    } else if (!isLogin) {
      setIsLogin(true);
    }
  };
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
      <div className="relative ">
        <img
          src={LoginBanner}
          style={{
            // filter: "blur(70px)",
            position: "absolute",
            width: "100%",
          }}
          className="blur-xl brightness-110 drop-shadow-lg contrast-125"
          alt="LoginBanner"
          loading="lazy"
        />
        <img
          src={LoginBanner}
          style={{ width: "100%", position: "relative" }}
          alt="LoginBanner"
          loading="lazy"
        />
      </div>
      <div className=" min-h-full flex flex-col justify-center items-center gap-4">
        <div className="text-center ">
          <span className="text-5xl ">Sign In</span>
        </div>
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            {isLogin ? "Login To" : "Create"} Your Account
          </div>
          <div className="flex gap-4 item-center">
            <button
              type="button"
              className="py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z"></path>
              </svg>
              Facebook
            </button>
            <button
              type="button"
              className="py-2 px-4 flex justify-center items-center  bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              onClick={() => socialSignIn("google")}
            >
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="mr-2"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z"></path>
              </svg>
              Google
            </button>
          </div>
          {isLogin ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterRoot;
