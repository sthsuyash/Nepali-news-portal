import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useRef } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import VerifyIllustration from "../../assests/Login-Signup/verify.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const VerifySchema = Yup.object().shape({
  verificationCode: Yup.string().required("Code is required"),
});

export default function Verify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const verifyCodeInputRef = useRef(null);

  useEffect(() => {
    // Focus on the username input field when the component mounts
    verifyCodeInputRef.current?.focus();
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
          <figure>
            <img
              className="w-full max-w-[212px]"
              src="/icon.png"
              alt="App Icon"
            />
          </figure>
        </div>

        <div className="flex gap-[104px] justify-between w-full ">
          <div className="flex flex-col mt-24 w-1/2 max-w-[512px]">
            <div className="space-y-3">
              <a
                className="font-medium text-[#313131] flex items-center gap-2"
                href="/login"
              >
                <FontAwesomeIcon className="text-lg" icon={faChevronLeft} />
                <span>Back to login</span>
              </a>
              <h1 className="text-[40px]  font-semibold text-[#313131]">
                Verify code
              </h1>
              <p className=" text-base opacity-75 text-[#313131]">
                An authentication code has been sent to your email.
              </p>
            </div>
            <Formik
              initialValues={{ verificationCode: "" }}
              validationSchema={VerifySchema}
              validateOnChange={false} // Disable validation on field change
              validateOnBlur={false} // Disable validation on field blur
              onSubmit={handleVerification}
            >
              {(formik) => (
                <Form
                  className="mt-[52px]"
                  onKeyDown={(e) => handleKeyPress(e, formik)}
                >
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Enter Code
                      </label>
                      <Field name="verificationCode">
                        {({ field }) => (
                          <input
                            {...field}
                            ref={verifyCodeInputRef} // Attach ref directly here
                            className={`appearance-none text-[#1C1B1F] h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                              formik.errors.verificationCode &&
                              formik.touched.verificationCode
                                ? "border-[#F04438]"
                                : "border-[#D0D5DD]"
                            }`}
                          />
                        )}
                      </Field>
                      <ErrorMessage
                        name="verificationCode"
                        component="div"
                        className="mt-2 text-sm text-[#F04438]"
                      />
                      {error && (
                        <div className="mt-2 text-sm text-[#F04438]">
                          {error}
                        </div>
                      )}
                    </div>

                    <div className="mt-2 space-y-4">
                      <button
                        type="submit"
                        className="w-full font-semibold tracking-[1px] px-4 py-3 text-white transition-colors duration-100 bg-[#615EF0] rounded hover:bg-[#6e6cf0]"
                      >
                        {loading ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="mr-2 text-white"
                          />
                        ) : (
                          "Verify"
                        )}
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <figure className="w-full max-w-[550px] 2xl:max-w-[590px] h-full">
            <img
              className="object-contain w-full h-auto"
              src={VerifyIllustration}
              alt="Login Illustration"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}