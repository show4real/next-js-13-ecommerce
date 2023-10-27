import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import CategorySlider from "/app/categories/CategorySlider";
import "./social.css";

const SocialIconMenu = () => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      {/* <div className="flex justify-center pb-10 md:pb-0 lg:pb-0 md:justify-end lg:justify-end xl:justify-end">
        <div
          class="bg-blue-100 border-t w-64 border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p class="font-bold">Informational message</p>
          <p class="text-sm">Some additional text to explain said message.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 ">
        <div className="col-span-5 md:col-span-12 text-center">
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
            <SocialIcon url="https://www.facebook.com/Hayzeeonline?mibextid=cejktS" />
          </span>
        </div>
      </div> */}

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="justify-center text-center"></div>
        <div class="justify-center text-center md:pt-0 lg:pt-0 pt-16">
          {" "}
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
            <SocialIcon url="https://www.facebook.com/Hayzeeonline?mibextid=cejktS" />
          </span>
        </div>
        <div class="justify-self-center md:justify-self-end lg:justify-self-end md:pt-0 lg:pt-0 pt-5">
          {" "}
          <div
            class="bg-orange-100 border-t w-64 border-b border-orange-500 text-orange-700 px-4 py-3"
            role="alert"
          >
            <p class="font-bold">Notice</p>
            <p
              className="text-sm"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: showFullText ? "unset" : 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              The Exchange Rate volatility has indeed Negatively impact the
              fluctuation of stock market Price. Which in turn render all price
              on our different Platform invalid. Please kindly ask for current
              price before making a final pick. Also of Note is that, the price
              giving at an instant in time is only valid for that time. THANK
              YOU Signed Hayzee Computer Resources
              <br />
            </p>
            <button onClick={toggleText} className="text-gray-600 text-sm">
              {showFullText ? "Hide" : "Show More"}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1">
        <CategorySlider sale_type={"flash sales"} />
      </div>

      <div className="col-span-5 md:col-span-12 pt-7 text-center md:pt-0 lg:pt-0">
        <h3 className="font-semibold text-2xl md:text-4xl text-primary">
          Quick Navigation
        </h3>
        <p className="pt-2 pl-3 text-justify text-sm text-primary md:pl-0 md:text-center md:text-xl">
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
