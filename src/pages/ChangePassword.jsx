import { yupResolver } from "@hookform/resolvers/yup";
import BackgroundImage from "../assets/6764486_3433814.jpg";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { changePassSchema } from "../schema/validationSchema";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ImSpinner } from "react-icons/im";

const ChangePassword = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [isValidToken, setIsValidToken] = useState(false);

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(changePassSchema),
  });

  const onSubmitHandler = async (data) => {
    console.log({ data });
    try {
      setLoading(true);
      const response = await axios.put(
        `http://localhost:8080/auth/change-pass/${token}`,
        {
          password: data.password,
        },
        null
      );
      if ((await response.data) > 1) {
        toast.success("Successfully! You can login with this password!");
        setLoading(false);
      } else {
        throw new Error("Cannot change password!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response ? err.response.data : err.message);
      setLoading(false);
    }
    reset();
  };

  useEffect(() => {
    const checkTokenInResetLink = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/auth/check-token/${token}`
        );
        if (response.data && Object.keys(response.data).length > 0) {
          setIsValidToken(true);
        }
      } catch (err) {
        console.log(err);
        toast.error(err?.response ? err.response.data : err.message);
      }
    };

    checkTokenInResetLink();
  }, [token]);

  return (
    <>
      {!token && !isValidToken ? (
        <div>Token not found in URL.</div>
      ) : (
        <div
          className="h-screen w-screen bg-cover flex flex-col justify-center items-center text-center"
          style={{ backgroundImage: `url(${BackgroundImage})` }}
        >
          <h1 className="font-bold text-[40px] text-[#495057] mb-3 leading-[1.2]">
            Password Reset
          </h1>
          <p className="text-[#343a40] mb-6 text-[14px]">
            Enter your email address to reset password.
          </p>

          {/* Form */}
          <form
            className="mb-6 min-w-[360px] text-[14px] text-[#495057]"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            {/* password field */}
            <div className="relative mt-4">
              <input
                {...register("password")}
                className="w-full h-[42px] py-[6px] px-[12px] leading-[1.5] border border-[#ced4da] rounded bg-[#fff] outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors.password && (
              <p className="px-2 text-left text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}

            {/* repeat password field */}
            <div className="relative mt-4">
              <input
                {...register("repeatPassword")}
                className="w-full h-[42px] py-[6px] px-[12px] leading-[1.5] border border-[#ced4da] rounded bg-[#fff] outline-none"
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Enter repeat password"
              />
              <button
                type="button"
                onClick={toggleRepeatPasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3"
              >
                {showRepeatPassword ? <BsEyeSlash /> : <BsEye />}
              </button>
            </div>
            {errors.repeatPassword && (
              <p className="px-2 text-left text-xs italic text-red-500">
                {errors.repeatPassword.message}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full flex justify-center items-center text-[14px] text-[#fff] bg-[#665dfe] hover:bg-[#4237fe] leading-[1.5] font-semibold py-[14px] px-9 mt-4 mb-6 outline-none rounded"
            >
              {loading ? (
                <ImSpinner className="animate-spin h-[18px] w-[18px]" />
              ) : (
                "CONFIRM"
              )}
            </button>

            <p className="text-[14px]">
              Already have an account?{" "}
              <Link
                className="text-[14px] text-[#665def] hover:text-[#4237fe] no-underline font-medium"
                to="/login"
              >
                Sign in.
              </Link>
            </p>
          </form>
          <ToastContainer position="top-center" />
        </div>
      )}
    </>
  );
};

export default ChangePassword;
