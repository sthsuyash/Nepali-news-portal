import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import LoginIllustration from "../../assests/Login-Signup/login.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faApple } from "@fortawesome/free-brands-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// Validation schema for Formik using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameInputRef = useRef(null); // Ref for the username input

  useEffect(() => {
    // Focus on the username input field when the component mounts
    usernameInputRef.current?.focus();
  }, []);

  const usernameError = useSelector((state) => state.auth.usernameError);
  const passwordError = useSelector((state) => state.auth.passwordError);
  const loading = useSelector((state) => state.auth.loading);


  const handleKeyPress = (event, formik) => {
    if (event.key === "Enter") {
      formik.submitForm(); // Submit the form on Enter key press
    }
  };

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
                Login
              </h1>
              <p className=" text-base opacity-75 text-[#313131]">
                Login to access your travelwise account
              </p>
            </div>

            {/* Formik wrapper */}
            <Formik
              initialValues={{ email: "", password: "", rememberMe: false }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
              validateOnChange={false} // Disable validation on field change
              validateOnBlur={false} // Disable validation on field blur
            >
              {(formik) => (
                <Form
                  className="mt-[52px]"
                  onKeyDown={(e) => handleKeyPress(e, formik)}
                >
                  <div className="flex flex-col gap-6">
                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Email
                      </label>
                      <Field name="email">
                        {({ field }) => (
                          <input
                            {...field}
                            ref={usernameInputRef} // Attach ref directly here
                            className={`appearance-none field-shadow text-[#262F45] h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                              (formik.errors.email && formik.touched.email) ||
                              usernameError
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
                      {usernameError && (
                        <div className="mt-2 text-sm text-[#F04438]">
                          {usernameError}
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[#344054] text-sm font-medium mb-[6px]">
                        Password
                      </label>
                      <Field
                        name="password"
                        type="password"
                        className={`appearance-none field-shadow text-[#262F45] h-11 px-[14px] py-[10px] w-full rounded-lg border-[1px] ${
                          (formik.errors.password && formik.touched.password) ||
                          passwordError
                            ? "border-[#F04438]"
                            : "border-[#D0D5DD]"
                        }`}
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mt-2 text-sm text-[#F04438]"
                      />
                      {passwordError && (
                        <div className="mt-2 text-sm text-[#F04438]">
                          {passwordError}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <Field
                          className="w-4 h-4 border-[2px] text-blue-600 bg-gray-100 rounded border-[#313131] focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-[#313131]"
                          type="checkbox"
                          name="rememberMe"
                        />
                        <p className="text-[#313131] font-medium text-sm">
                          Remember me
                        </p>
                      </div>
                      <a
                        className="font-medium text-sm text-[#FF8682] hover:text-[#eb716d]"
                        href="/forgot-password"
                      >
                        Forgot Password
                      </a>
                    </div>
                    <div className="mt-6 space-y-4">
                      <button
                        type="submit"
                        className="w-full px-4 py-3 font-semibold tracking-[1px] text-[#F3F3F3] transition-colors duration-100 bg-[#615EF0] rounded hover:bg-[#6e6cf0]"
                      >
                        {loading ? (
                          <FontAwesomeIcon
                            icon={faSpinner}
                            spin
                            className="mr-2 text-white"
                          />
                        ) : (
                          "Login"
                        )}
                      </button>
                      <p className="text-sm w-full text-center font-medium text-[#313131]">
                        Don't have an account?{" "}
                        <a
                          className="text-[#FF8682] hover:text-[#eb716d] font-semibold"
                          href="/signup"
                        >
                          Sign up
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
              src={LoginIllustration}
              alt="Login Illustration"
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;