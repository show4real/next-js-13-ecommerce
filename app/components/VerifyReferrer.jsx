"use client";
import React, { useState } from "react";
import settings from "/app/services/settings";
import { notification } from "antd";
import axios from "axios";
import Link from "next/link";

const VerifyReferrer = ({ referrer_code }) => {
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const verify = async () => {
    try {
      setSaving(true);

      const data = new FormData();
      data.set("referrer_code", referrer_code);

      const response = await axios.post(`${settings.API_URL}verify`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      setSaving(false);
      setSuccess(true);

      notification.success({
        message: "Registration completed",
        description:
          "Your Registration is successfull, A mail has been sent to you for verification.",
      });
    } catch (error) {
      setSaving(false);
      // Handle error appropriately, e.g., show an error notification
      console.error("Error verifying referrer:", error);
      notification.error({
        message: "Verification Failed",
        description: "An error occurred while verifying the referrer.",
      });
    }
  };

  return (
    <>
      {!success ? (
        <div>
          <button
            onClick={verify}
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
            disabled={saving}
          >
            {saving ? (
              <>
                {" "}
                <div className="mr-2 border-t-transparent border-solid animate-spin rounded-full border-white border-8 h-5 w-5" />
                <span>verifying...</span>
              </>
            ) : (
              <span className="text-lg font-bold"> Verify Email</span>
            )}
          </button>
        </div>
      ) : (
        <div>
          <p>Email Verified Sucessfully Please</p>
          <Link
            href={"https://hayzeeonline-referral.hayzeeonline.com/login"}
            className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Sign In!
          </Link>
        </div>
      )}
    </>
  );
};

export default VerifyReferrer;
