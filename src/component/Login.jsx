import React, { useState } from "react";
import Logo from "../assets/Logo.svg";
import PL from "../assets/PL.svg";
import eye from "../assets/eye.svg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useFormik } from "formik";
import { ColorRing } from "react-loader-spinner";
import { loginSchema } from "./schema/schema";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { showErrorToast } from "../utils/toasts";
const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useDispatch();
  //  const dispatch = useDispatch();
  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const Formik = useFormik({
    initialValues: loginSchema.initialValues,
    validationSchema: loginSchema.validationSchema,
    validateOnChange: true,
    validateOnBlur: false,

    onSubmit: async ({ email, password }, { setSubmitting }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        const adminRef = collection(db, "admin");
        const adminSnapshot = await getDocs(
          query(adminRef, where("email", "==", email))
        );
        console.log(adminSnapshot.empty && "trueee", "cechk this one ");

        if (adminSnapshot.empty) {
          throw new Error("Access denied. You must be an admin to log in.");
        }

        console.log("Authenticated user:", user);
        const token = await user.getIdToken();
        localStorage.setItem("token", token);
        console.log(token, "tokennn");
        setSubmitting(false);
        navigate("/Dashboard");
        // dispatch();
      } catch (error) {
        console.log("Authentication error:", error);
        showErrorToast(error.message);
      }
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isSubmitting,
  } = Formik;
  return (
    <>
      <div
        // to="/"
        className="bg-[#3B9F9A]  min-h-screen relative flex items-center justify-center"
      >
        <section className="bg-[#FFFFFF] rounded-lg flex flex-col">
          <div className="flex justify-center items-center mt-14 mb-6">
            <img src={Logo} alt="Logo" srcset="" className="w-[18%]" />{" "}
          </div>
          <div className="mx-10 flex flex-col gap-6">
            <p className="text-[32px] font-bold">Login to Account</p>
            <p className="w-[82%] font-semibold text-[18px]">
              Please enter your email and password to continue
            </p>
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="w-full border pl-3 p-2 mb-0  placeholder:text-14px outline-none rounded-lg"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="font-semibold text-sm text-red-600 m-1 ">
                    {errors.email}
                  </p>
                ) : null}
                <img
                  src={PL}
                  alt=""
                  srcset=""
                  className="absolute right-4 top-3 h-5"
                />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  className=" w-full border pl-3 p-2 mt-2 rounded-lg placeholder:14px outline-none "
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="font-semibold text-sm text-red-600 m-1 ">
                    {errors.password}
                  </p>
                ) : null}
                <span onClick={togglePassword}>
                  {showPassword ? (
                    <img
                      src={eye}
                      alt=""
                      srcset=""
                      className="absolute right-4 top-5 h-5"
                    />
                  ) : (
                    <FaEyeSlash className="absolute right-4 top-5 h-5 text-gray-400 " />
                  )}
                </span>
              </div>

              {/* <Link to="/Dashboard"> */}
              <button
                className="bg-[#3B9F9A] w-full rounded-lg p-2 text-white mt-8 mb-10"
                type="submit"
              >
                {isSubmitting ? (
                  <div className="flex w-full justify-center   ">
                    <ColorRing
                      visible={true}
                      height="30"
                      width="40"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={[
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#ffffff",
                        "#849b87",
                      ]}
                    />
                  </div>
                ) : (
                  <p className="font-semibold text-[20px]">Sign In</p>
                )}
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
