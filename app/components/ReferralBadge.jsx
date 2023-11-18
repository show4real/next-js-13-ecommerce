import React, { useState } from "react";
import settings from "/app/services/settings";
import { authService } from "../services/response";
import { notification } from "antd";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGift,
  faTimes,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

const ReferralBadge = () => {
  const [showBadge, setShowBadge] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [fields, setFields] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  const handleCloseBadge = () => {
    setShowBadge(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return !value ? "Your Name is required" : "";
      case "password":
        return value.length < 4
          ? "Password must be at least 4 characters long"
          : "";
      case "email":
        return !value
          ? "Email is required"
          : validateEmail(value)
          ? ""
          : "Please enter a valid email address";
      case "phone":
        return !value
          ? "Phone is required"
          : validatePhone(value)
          ? ""
          : "Please enter a valid phone Number";
      default:
        return "";
    }
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phoneNumber) => {
    // This regex matches a string with exactly 12 digits
    const re = /^\d{11}$/;
    return re.test(phoneNumber);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let validationErrors = {};
    Object.keys(fields).forEach((name) => {
      const error = validate(name, fields[name]);
      if (error && error.length > 0) {
        validationErrors[name] = error;
      }
    });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setSaving(true);
    const data = new FormData();

    data.set("email", fields.email);
    data.set("phone", fields.phone);
    data.set("password", fields.password);
    data.set("name", fields.name);
    data.set("referrer", 1);
    return axios
      .post(
        `${settings.API_URL}signup`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        },
        authService.handleResponse
      )
      .then((res) => {
        setSaving(false);
        setFields({
          email: "",
          password: "",
          name: "",
        });
        notification.success({
          message: "Registration Successful",
          description:
            "You have suucessfully registered. A Verification link has been sent to your email, Please confirm!",
        });

        setTimeout(() => {
          window.location.reload();
        }, 2000); // 10000ms = 10 seconds
      })
      .catch((err) => {
        setSaving(false);
        if (err) {
          notification.error({
            message: "Registration Failed",
            description: "Invalid Email",
          });
        }
      });
  };

  const handleCartInput = (e) => {
    const { name, value } = e.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validate(name, value),
    }));
  };

  return (
    <>
      {showBadge && (
        <div className="fixed bottom-5 left-3 z-50 bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center">
          <div className="mr-2">
            <FontAwesomeIcon icon={faGift} />
          </div>
          <button className="mr-2" onClick={handleOpenModal}>
            Refer and Earn
          </button>
          <div className="cursor-pointer" onClick={handleCloseBadge}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg p-8 rounded-lg w-11/12 md:max-w-md">
            <div className="text-right">
              <button onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <p className="text-lg font-semibold my-4">
              INVITE YOUR FRIENDS AND FAMILY AND EARN HAS HIGH AS 5% OF THEIR
              PURCHASE
              {/* INVITE &amp; GET A MINIMUM OF 2.5% COMMISSION FROM FRIEND&apos;S
              ORDERS You can earn as high as 5% */}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              {/* Send us your friends and earn on purchase. Once they make a
              purchase, you will earn has high as 5% commission on each order
              they make!  */}
              Unlock the potential of affiliate marketing by inviting your loved
              ones to join our platform. Earn generous commissions, as high as
              5%, on every purchase they make.
            </p>
            <input
              className="border-2 border-gray-300 rounded-md p-2 my-4 w-full"
              type="text"
              placeholder="Enter your full name"
              name="name"
              value={fields.name}
              onChange={handleCartInput}
            />
            <div>
              <span className="text-red-400 font-medium text-sm">
                {errors.name}
              </span>
            </div>

            <input
              className="border-2 border-gray-300 rounded-md p-2 my-4 w-full"
              type="text"
              placeholder="Enter your Phone number"
              name="phone"
              value={fields.phone}
              onChange={handleCartInput}
            />
            <div>
              <span className="text-red-400 font-medium text-sm">
                {errors.phone}
              </span>
            </div>

            <input
              className="border-2 border-gray-300 rounded-md p-2 my-4 w-full"
              type="text"
              placeholder="Enter your email"
              name="email"
              value={fields.email}
              onChange={handleCartInput}
            />
            <div>
              <span className="text-red-400 font-medium text-sm">
                {errors.email}
              </span>
            </div>
            <div className="relative">
              <input
                className="border-2 border-gray-300 rounded-md p-2 my-4 w-full pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                value={fields.password}
                onChange={handleCartInput}
              />
              <span
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={handlePasswordVisibility}
              >
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </span>
            </div>
            <div>
              <span className="text-red-400 font-medium text-sm">
                {errors.password}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Already have an account?{" "}
              <a
                href="https://hayzeeonline-referral.hayzeeonline.com/auth/login"
                className="text-blue-500 underline"
              >
                Sign in here
              </a>
            </p>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full flex items-center justify-center"
              onClick={handleSubmit}
            >
              {saving ? (
                <>
                  {" "}
                  <div className="mr-2 border-t-transparent border-solid animate-spin rounded-full border-white border-8 h-5 w-5" />
                  <span>saving...</span>
                </>
              ) : (
                <span className="text-lg font-bold"> Sign up</span>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default ReferralBadge;
