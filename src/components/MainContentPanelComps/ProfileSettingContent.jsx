import React, { useCallback, useState } from "react";
import HeaderOfProfileSetting from "./HeaderOfProfileSetting";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import FormSection from "./FormSection";
import InputField from "./InputField";
import { setUserInfo } from "../../features/auth/authSlice";

const ProfileSettingContent = () => {
  const jwt = sessionStorage.getItem("auth-tk-webchat");
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();

  const [accountData, setAccountData] = useState({
    userName: user?.info?.username ? user.info.username : "",
    birthDate: user?.info?.birthdate ? user.info.birthdate : "",
    mobileNumber: user?.info?.phone ? user.info.phone : "",
    emailAddress: user?.info?.email ? user.info.email : "",
    address: user?.info?.address ? user.info.address : "",
  });

  const [socialData, setSocialData] = useState({
    facebook: user?.info?.fbLink ? user.info.fbLink : "",
    twitter: user?.info?.twitterLink ? user.info.twitterLink : "",
    instagram: user?.info?.instaLink ? user.info.instaLink : "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [accountFormLoading, setAccountFormLoading] = useState(false);

  const [socialFormLoading, setSocialFormLoading] = useState(false);

  const [passwordFormLoading, setPasswordFormLoading] = useState(false);

  const handleChange = (setter) => (field, value) => {
    setter((prev) => ({ ...prev, [field]: value }));
  };

  const showNotification = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      containerId: "form-submit",
    });
  };

  const handleSubmitPersonalInfoForm = async (e) => {
    e.preventDefault();
    setAccountFormLoading(true);
    try {
      if (
        !accountData.birthDate &&
        !accountData.mobileNumber &&
        !accountData.address
      ) {
        throw new Error("Nothing to update!");
      }
      const updateInfo = {
        birthdate: accountData.birthDate,
        phone: accountData.mobileNumber,
        address: accountData.address,
      };
      const response = await axios.put(
        "http://localhost:8080/auth/update-personal-info",
        {
          userId: user.info.id,
          ...updateInfo,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (response.data >= 1) {
        showNotification("Update successful!");
        dispatch(setUserInfo(updateInfo));
      }
    } catch (e) {
      console.log(e);
      showNotification(e?.response?.data || e.message, "error");
    } finally {
      setAccountFormLoading(false);
    }
  };

  const handleSubmitSocialInfoForm = useCallback(
    async (e) => {
      e.preventDefault();
      setSocialFormLoading(true);
      try {
        if (
          !socialData.facebook &&
          !socialData.instagram &&
          !socialData.twitter
        ) {
          throw new Error("All fields are required.");
        }
        const updateInfo = {
          fbLink: socialData.facebook,
          instaLink: socialData.instagram,
          twitterLink: socialData.twitter,
        };
        const response = await axios.put(
          "http://localhost:8080/auth/update-social-info",
          {
            userId: user.info.id,
            ...updateInfo,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.data >= 1) {
          showNotification("Update successful!");
          dispatch(setUserInfo(updateInfo));
        }
      } catch (e) {
        console.log(e);
        showNotification(e?.response?.data || e.message, "error");
      } finally {
        setSocialFormLoading(false);
      }
    },
    [socialData, dispatch, jwt, user.info.id]
  );

  const handleSubmitPasswordForm = useCallback(
    async (e) => {
      e.preventDefault();
      setPasswordFormLoading(true);
      try {
        if (
          !passwordData.currentPassword ||
          !passwordData.newPassword ||
          !passwordData.repeatPassword
        ) {
          throw new Error("All fields are required!");
        } else if (passwordData.newPassword !== passwordData.repeatPassword) {
          throw new Error(
            "New password field doesn't match with repeat password field!"
          );
        } else if (
          passwordData.newPassword.length < 6 ||
          passwordData.newPassword.length > 32
        ) {
          throw new Error(
            "Password must be at least 6 characters and max length is 32 characters!"
          );
        }
        const response = await axios.put(
          "http://localhost:8080/auth/update-password",
          {
            userId: user.info.id,
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        );
        if (response.data >= 1) {
          showNotification("Update successful!");
          setPasswordData({
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
          });
        }
      } catch (e) {
        showNotification(e?.response?.data || e.message, "error");
      } finally {
        setPasswordFormLoading(false);
      }
    },
    [passwordData, dispatch, jwt, user.info.id]
  );

  const handleReset = (setter, initialData) => () => {
    setter(initialData);
  };

  return (
    <div className="flex flex-col w-full h-screen max-sm:h-[calc(100vh-64px)]">
      <ToastContainer containerId={"form-submit"} position="top-center" />
      <HeaderOfProfileSetting />
      <div className="px-4 overflow-y-scroll no-scrollbar">
        <FormSection
          loading={accountFormLoading}
          title="Account"
          description="Update personal & contact information"
          onSubmit={handleSubmitPersonalInfoForm}
          onReset={handleReset(setAccountData, {
            userName: user?.info?.username ? user.info.username : "",
            birthDate: user?.info?.birthdate ? user.info.birthdate : "",
            mobileNumber: user?.info?.phone ? user.info.phone : "",
            emailAddress: user?.info?.email ? user.info.email : "",
            address: user?.info?.address ? user.info.address : "",
          })}
        >
          <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 mb-3">
            {Object.entries(accountData).map(([key, value]) => (
              <InputField
                key={key}
                label={
                  key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                value={value}
                onChange={(value) => handleChange(setAccountData)(key, value)}
                type={
                  key === "emailAddress"
                    ? "email"
                    : key === "birthDate"
                    ? "date"
                    : key === "mobileNumber"
                    ? "tel"
                    : "text"
                }
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          loading={socialFormLoading}
          title="Social network profiles"
          description="Update social media information"
          onSubmit={handleSubmitSocialInfoForm}
          onReset={handleReset(setSocialData, {
            facebook: user?.info?.fbLink ? user.info.fbLink : "",
            twitter: user?.info?.twitterLink ? user.info.twitterLink : "",
            instagram: user?.info?.instaLink ? user.info.instaLink : "",
          })}
        >
          <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 mb-3">
            {Object.entries(socialData).map(([key, value]) => (
              <InputField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                value={value}
                onChange={(value) => handleChange(setSocialData)(key, value)}
              />
            ))}
          </div>
        </FormSection>

        <FormSection
          loading={passwordFormLoading}
          title="Password"
          description="Update your password"
          onSubmit={handleSubmitPasswordForm}
          onReset={handleReset(setPasswordData, {
            currentPassword: "",
            newPassword: "",
            repeatPassword: "",
          })}
        >
          <div className="grid grid-cols-1 gap-y-3 gap-x-6 sm:grid-cols-2 mb-3">
            {Object.entries(passwordData).map(([key, value]) => (
              <InputField
                key={key}
                type="password"
                label={
                  key.charAt(0).toUpperCase() +
                  key
                    .slice(1)
                    .replace(/([A-Z])/g, " $1")
                    .trim()
                }
                value={value}
                onChange={(value) => handleChange(setPasswordData)(key, value)}
              />
            ))}
          </div>
        </FormSection>
      </div>
    </div>
  );
};

export default ProfileSettingContent;
