import React, { useState, useEffect } from "react";
import forgotPassword from "../../assests/Login-Signup/forgot-password.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Extract query parameters
  const token = queryParams.get("token");
  console.log("Token from useParams:", token);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { success, error } = useSelector((state) => state.auth);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });
  
  return (
    <div className="relative flex items-center justify-center w-full pb-12">
      <div className="relative w-full container-margin">
        <div className="w-full mt-12">
          <figure>
            <img
              className="w-full max-w-[212px]"
              src="/icon.png"
              alt="App Icon"
            />
          </figure>
        </div>

        <div className="flex gap-[104px] items-center justify-between w-full ">
          <div className="flex flex-col w-1/2 max-w-[514px]">
            <div className="space-y-3">
              <h1 className="text-[40px] font-semibold text-[#313131]">
                {" "}
                Set a password
              </h1>
              <p className=" text-base opacity-75 text-[#313131]">
                Your previous password has been reset. Please set a new password
                for your account.
              </p>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="mt-[52px]">
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Create Password
                      </label>
                      <div className="relative">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder=""
                          className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 cursor-pointer w-5 h-5"
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>

                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Re-enter Password
                      </label>
                      <div className="relative">
                        <Field
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder=""
                          className="w-full px-4 py-3 border border-[#D0D5DD] rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                        />
                        <FontAwesomeIcon
                          icon={showConfirmPassword ? faEyeSlash : faEye}
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-3 cursor-pointer w-5 h-5"
                        />
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="text-red-500 text-sm mt-2"
                      />
                    </div>

                    {error && (
                      <div className="text-red-500 text-sm mt-2">{error}</div>
                    )}

                    <div className="mt-6 space-y-4">
                      <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold tracking-[1px] text-[#F3F3F3] transition-colors duration-100 bg-[#615EF0] rounded hover:bg-[#6e6cf0]"
                      >
                        Set Password
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <figure className="w-full max-w-[550px] 2xl:max-w-[600px]  h-full">
            <img
              className="object-contain w-full h-auto"
              src={forgotPassword}
              alt="Forgot Password"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}