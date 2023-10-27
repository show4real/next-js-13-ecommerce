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
      <div class="container mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="flex justify-center text-center"></div>
          <div class="flex justify-center text-center md:pt-0 lg:pt-0 pt-3">
            <div class="flex">
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
          </div>
          <div class="flex justify-center md:justify-end lg:justify-end md:pt-0 lg:pt-0 pt-3">
            <div class="bg-orange-100 border-t border-b border-orange-500 text-orange-700 w-full md:w-64 px-4 py-3">
              <p class="font-bold">Notice</p>
              <p
                class="text-sm overflow-hidden"
                style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;"
              >
                The Exchange Rate volatility has indeed Negatively impact the
                fluctuation of stock market Price. Which in turn render all
                price on our different Platform invalid. Please kindly ask for
                current price before making a final pick. Also of Note is that,
                the price giving at an instant in time is only valid for that
                time. THANK YOU Signed Hayzee Computer Resources
              </p>
              <button onclick="toggleText()" class="text-gray-600 text-sm">
                Show More
              </button>
            </div>
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
