import React from "react";
import { SocialIcon } from "react-social-icons";
import "./social.css";

const SocialIconMenu = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
        <div className="col-span-5 md:col-span-12 pt-7 text-center">
          <span className="social-icon">
            <SocialIcon url="https://twitter.com/hayzeeonline?t=CXwigiNkx0AZymf_uUwVwg&s=09" />
          </span>
          <span className="social-icon">
            <SocialIcon url="https://instagram.com/hayzee_computer_resources?utm_source=qr&igshid=OGIxMTE0OTdkZA==" />
          </span>
          <span className="social-icon">
            <SocialIcon url="https://www.tiktok.com/@hayzeecomputerresources?_t=8fZAlidBCxq&_r=1" />
          </span>
          <span className="social-icon">
            <SocialIcon url="https://t.me/HayzeeComputerResources" />
          </span>
          <span className="social-icon">
            <SocialIcon url="https://www.facebook.com/Hayzeeonline?mibextid=cejktS" />
          </span>
        </div>
      </div>

      <div className="col-span-5 md:col-span-12 pt-7 text-center">
        <h3 className="font-semibold text-2xl md:text-4xl text-primary">
          Quick Navigation
        </h3>
        <p className="pt-2 text-lg text-primary text-center md:text-center">
          Without further ado, let’s help you find a device that fits your
          budget.
          <br />
          Select a Brand and then use the price slider, Processor, RAM to access
          preferred products
        </p>
      </div>
    </>
  );
};

export default SocialIconMenu;
