import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SignupIllutration from "../../assests/Login-Signup/signup.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import * as Yup from "yup";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";


const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
});

export default function SignUpPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const firstNameInputRef = useRef(null);
  const navigate = useNavigate();
  const [showTooltip, setShowTooltip] = useState(false);
  const error = useSelector((state) => state.auth.error);

  useEffect(() => {
    // Focus on the firstname input field when the component mounts
    firstNameInputRef.current?.focus();
  }, []);

  const handleKeyPress = (event, formik) => {
    if (event.key === "Enter") {
      formik.submitForm(); // Submit the form on Enter key press
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full pb-12">
      <div className="relative w-full container-margin">
        <div className="w-full mt-12">
          <figure className="float-right">
            <img
              className="w-full max-w-[212px]"
              src="/icon.png"
              alt="App Icon"
            />
          </figure>
        </div>
        <div className="flex gap-[70px] items-center justify-between w-full  ">
          <figure className="w-full lg:max-w-[400px] self-start xl:max-w-[460px] 2xl:max-w-[470px] ">
            <img
              className="w-full"
              src={SignupIllutration}
              alt="SignUp Illustration"
            />
          </figure>

          <div className="flex flex-col w-[55%] max-w-[640px]">
            <div className="self-start space-y-4">
              <h1 className="text-[40px] font-semibold text-[#313131]">
                Sign Up
              </h1>
              <p className="mb-4 text-base opacity-75 text-[#313131]">
                Let’s get you all set up so you can access your personal
                account.
              </p>
            </div>
            <Formik
              initialValues={{
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                terms: false,
              }}
              onSubmit={handleSignup}
              validationSchema={SignupSchema}
              validateOnChange={false} // Disable validation on field change
              validateOnBlur={false} // Disable validation on field blur
            >
              {(formik) => (
                <Form
                  className="mt-12"
                  onKeyDown={(e) => {
                    handleKeyPress(e, formik);
                  }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex w-full gap-6">
                      <div className="w-1/2">
                        <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                          First Name
                        </label>
                        <Field name="firstname">
                          {({ field }) => (
                            <input
                              {...field}
                              ref={firstNameInputRef} // Attach ref directly here
                              className={`appearance-none field-shadow  text-[#262F45] h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                                formik.errors.firstname &&
                                formik.touched.firstname
                                  ? "border-[#F04438]"
                                  : "border-[#D0D5DD]"
                              }`}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name="firstname"
                          component="div"
                          className="mt-2 text-sm text-[#F04438]"
                        />
                      </div>

                      <div className="w-1/2">
                        <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                          Last Name
                        </label>
                        <Field
                          name="lastname"
                          type="text"
                          className={`appearance-none field-shadow  text-[#262F45]  h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                            formik.errors.lastname && formik.touched.lastname
                              ? "border-[#F04438]"
                              : "border-[#D0D5DD]"
                          }`}
                        />
                        <ErrorMessage
                          name="lastname"
                          component="div"
                          className="mt-2 text-sm text-[#F04438]"
                        />
                      </div>
                    </div>

                    <div className="flex w-full gap-6">
                      <div className="w-1/2">
                        <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                          Email
                        </label>
                        <Field
                          name="email"
                          type="email"
                          className={`appearance-none field-shadow text-[#262F45]  h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                            (formik.errors.email && formik.touched.email) ||
                            error == "Email already exists."
                              ? "border-[#F04438]"
                              : "border-[#D0D5DD]"
                          }`}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="mt-2 text-sm text-[#F04438]"
                        />
                        {error == "Email already exists." && (
                          <div className="mt-2 text-sm text-[#F04438]">
                            {error}
                          </div>
                        )}
                      </div>
                      <div className="w-1/2">
                        <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                          Phone Number
                        </label>
                        <Field
                          name="phone"
                          type="text"
                          className={`appearance-none field-shadow text-[#262F45]  h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                            formik.errors.phone && formik.touched.phone
                              ? "border-[#F04438]"
                              : "border-[#D0D5DD]"
                          }`}
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="mt-2 text-sm text-[#F04438]"
                        />
                        {error == "Phone already exists." && (
                          <div className="mt-2 text-sm text-[#F04438]">
                            {error}
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Password
                      </label>
                      <div className="relative">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className={`appearance-none field-shadow text-[#262F45]  h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                            formik.errors.password && formik.touched.password
                              ? "border-[#F04438]"
                              : "border-[#D0D5DD]"
                          }`}
                          style={{
                            WebkitAppearance: "none",
                            appearance: "none",
                          }}
                        />
                        <span
                          className="absolute inset-y-0 right-0 flex items-center pr-[14px] cursor-pointer"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          <FontAwesomeIcon
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </span>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-2 text-sm text-[#F04438]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Field
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className={`appearance-none field-shadow text-[#262F45]  h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                            formik.errors.confirmPassword &&
                            formik.touched.confirmPassword
                              ? "border-[#F04438]"
                              : "border-[#D0D5DD]"
                          }`}
                          style={{
                            WebkitAppearance: "none",
                            appearance: "none",
                          }}
                        />
                        <span
                          className="absolute inset-y-0 right-0 flex items-center pr-[14px] cursor-pointer"
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                        >
                          <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                          />
                        </span>
                      </div>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="mt-2 text-sm text-[#F04438]"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Tippy
                        content="Please accept the terms and conditions"
                        visible={showTooltip}
                        placement="bottom"
                        theme="light"
                      >
                        <div className="flex items-center">
                          <Field
                            onChange={(e) => {
                              formik.setFieldValue("terms", e.target.checked);
                              setShowTooltip(!e.target.checked);
                            }}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded field-shadow focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-blue-700 dark:border-gray-600"
                            type="checkbox"
                            name="terms"
                          />
                        </div>
                      </Tippy>
                      <p className="text-sm font-medium text-[#313131]">
                        I agree to all the{" "}
                        <a className="font-semibold text-[#FF8682]" href="#">
                          Terms
                        </a>{" "}
                        and{" "}
                        <a className="font-semibold text-[#FF8682]" href="#">
                          Privacy Policies
                        </a>
                      </p>
                    </div>
                    <div className="mt-8 space-y-4">
                      <button
                        type="submit"
                        className="w-full tracking-[1px] px-4 py-3 font-semibold text-[#F3F3F3]  transition-colors duration-100 bg-[#615EF0] rounded hover:bg-[#6e6cf0]"
                      >
                        {loading ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="mr-2 text-white"
                          />
                        ) : (
                          "Create Account"
                        )}
                      </button>
                      <p className="text-sm w-full text-center font-medium text-[#313131]">
                        Already have an account?{" "}
                        <a className="text-[#FF8682]" href="/login">
                          Login
                        </a>
                      </p>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flex items-center justify-center gap-4 my-10">
              <hr className="w-full h-px opacity-25 bg-[#313131] border-0 dark:bg-gray-700" />
              <p className="whitespace-nowrap opacity-50 text-sm text-[#313131]">
                Or Sign up with
              </p>
              <hr className="w-full opacity-25 h-px bg-[#313131] border-0 dark:bg-gray-700" />
            </div>
            <div>
              <div className="flex items-center justify-between gap-4">
                <button className="w-full h-[56px] rounded-[4px] bg-transparent border-solid border-[#515DEF] border-[1px] flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faFacebook}
                    className="text-[#1877F2] text-lg"
                  />
                </button>
                <button className="w-full h-[56px] rounded-[4px] bg-transparent border-solid border-[#515DEF] border-[1px] flex items-center justify-center">
                  <img
                    className="w-[20px]"
                    src="/flat-color-icons_google.png"
                    alt="Google Icon"
                  />
                </button>

                <button className="w-full h-[56px] rounded-[4px] bg-transparent border-solid border-[#515DEF] border-[1px] flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faApple}
                    className="text-[#313131] text-xl"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}