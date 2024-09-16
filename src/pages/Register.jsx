import React, { useEffect, useState } from "react";
import BackgroundImage from "../assets/6764486_3433814.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../schema/validationSchema";
import { BsEye } from "react-icons/bs";
import { BsEyeSlash } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authAction";
import { toast, ToastContainer } from "react-toastify";
import { resetState } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmitHandler = (data) => {
    data.email = data.email.toLowerCase();
    dispatch(registerUser(data));
    reset();
  };

  useEffect(() => {
    if (success) {
      toast.success("Register successful!");
      dispatch(resetState());
    } else if (error) {
      toast.error(error);
      dispatch(resetState());
    }
  }, [success, error]);

  return (
    <div
      className="h-screen w-screen bg-cover flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <h1 className="font-bold text-[40px] text-[#495057] mb-3 leading-[1.2]">
        Sign up
      </h1>
      <p className="text-[#343a40] mb-6 text-[14px]">
        We are Different, We Make You Different.
      </p>

      {/* Biểu mẫu */}
      <form
        className="mb-6 min-w-[360px] text-[14px] text-[#495057]"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {/* username field */}
        <input
          {...register("username")}
          className="w-full h-[42px] py-[6px] px-[12px] leading-[1.5] border border-[#ced4da] rounded bg-[#fff] outline-none"
          type="text"
          placeholder="Enter your name"
        />
        {errors.username && (
          <p className="px-2 text-left text-xs italic text-red-500">
            {errors.username.message}
          </p>
        )}

        {/* email field */}
        <input
          {...register("email")}
          className="w-full h-[42px] py-[6px] px-[12px] mt-4 leading-[1.5] border border-[#ced4da] rounded bg-[#fff] outline-none"
          type="text"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="px-2 text-left text-xs italic text-red-500">
            {errors.email.message}
          </p>
        )}

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

        <button
          className="w-full flex justify-center items-center text-[14px] text-[#fff] bg-[#665dfe] hover:bg-[#4237fe] leading-[1.5] font-semibold py-[14px] px-9 mt-4 mb-6 outline-none rounded"
          disabled={loading}
        >
          {loading ? (
            <ImSpinner className="animate-spin h-[18px] w-[18px]" />
          ) : (
            "SIGN UP"
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
  );
};

export default Register;
