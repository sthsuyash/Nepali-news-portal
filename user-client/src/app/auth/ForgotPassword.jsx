import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import forgotPassword from "../../assests/Login-Signup/forgot-password.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword({}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetEmailSent, error } = useSelector((state) => state.auth);


  useEffect(() => {
    if (resetEmailSent) {
      navigate("/login");
    }
  }, [resetEmailSent, navigate]);

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
              <button
                className="flex items-center text-[#313131] text-md mb-6 "
                onClick={() => navigate("/login")}
              >
                <span> &lt; Back to login</span>
              </button>

              <h1 className="text-[40px] font-semibold text-[#313131]">
                {" "}
                Forgot your password?
              </h1>
              <p className=" text-base opacity-75 text-[#313131]">
                Don&apos;t worry, happens to all of us. Enter your email below
                to recover your password.
              </p>
            </div>

            <Formik
              initialValues={{ email: "" }}
              validationSchema={ForgotPasswordSchema}
            //   onSubmit={handleForgotPassword}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {(formik) => (
                <Form className="mt-[52px]">
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Email
                      </label>
                      <Field name="email">
                        {({ field }) => (
                          <input
                            {...field}
                            className={`appearance-none field-shadow text-[#262F45] h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                              formik.errors.email && formik.touched.email
                                ? "border-[#F04438]"
                                : "border-[#D0D5DD]"
                            }`}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="mt-2 text-sm text-[#F04438]"
                      />
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm mt-2">{error}</div>
                    )}
                    {/* {resetEmailSent && (
                      <div className="text-green-600 text-sm mt-2">
                        Reset email sent successfully.
                      </div>
                    )} */}

                    <div className="mt-6 space-y-4">
                      <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold tracking-[1px] text-[#F3F3F3] transition-colors duration-100 bg-[#615EF0] rounded hover:bg-[#6e6cf0]"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="flex items-center justify-center gap-4 my-10">
              <hr className="w-full h-px opacity-25 bg-[#313131] border-0 dark:bg-gray-700" />
              <p className="whitespace-nowrap opacity-50 text-sm text-[#313131]">
                Or login with
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