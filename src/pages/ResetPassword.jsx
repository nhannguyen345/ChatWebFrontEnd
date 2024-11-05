import React, { useState } from "react";
import BackgroundImage from "../assets/6764486_3433814.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPassSchema } from "../schema/validationSchema";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { ImSpinner } from "react-icons/im";
const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPassSchema),
  });

  const onSubmitHandler = async (data) => {
    console.log({ data });
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/auth/confirm-email",
        {
          email: data.email,
        },
        null
      );
      if (await response.data) {
        toast.success(
          "Successfully! Please Check your email to get reset link!"
        );
        setLoading(false);
      } else {
        throw new Error("Cannot send reset link to this email!");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.response ? err.response.data : err.message);
      setLoading(false);
    }
    reset();
  };
  return (
    <div
      className="h-screen w-screen bg-cover flex flex-col justify-center items-center text-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <h1 className="font-bold text-[40px] text-[#495057] mb-3 leading-[1.2]">
        Password Reset
      </h1>
      <p className="text-[#343a40] mb-4 text-[14px]">
        Enter your email address to reset password.
      </p>
      <p className="text-[#343a40] mb-6 text-[12px] italic">
        &#40;Please enter the exact email address you used to register, and
        ensure it is a valid, active email.&#41;
      </p>

      {/* Form */}
      <form
        className="mb-6 min-w-[360px] text-[14px] text-[#495057]"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {/* email field */}
        <input
          {...register("email")}
          className="w-full h-[42px] py-[6px] px-[12px] leading-[1.5] border border-[#ced4da] rounded bg-[#fff] outline-none"
          type="text"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="px-2 text-left text-xs italic text-red-500">
            {errors.email.message}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full flex justify-center items-center text-[14px] text-[#fff] bg-[#665dfe] hover:bg-[#4237fe] leading-[1.5] font-semibold py-[14px] px-9 mt-4 mb-6 outline-none rounded"
        >
          {loading ? (
            <ImSpinner className="animate-spin h-[18px] w-[18px]" />
          ) : (
            "SEND RESET LINK"
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

export default ResetPassword;
