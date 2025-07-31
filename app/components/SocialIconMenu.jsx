import React, { useState } from "react";
import { SocialIcon } from "react-social-icons";
import CategorySlider from "/app/categories/CategorySlider";
import "./social.css";

const SocialIconMenu = ({ brandslug, categoryslug, flash_sale, notice }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Empty column for layout balance */}
          <div className="flex justify-center text-center"></div>
          
          {/* Social Icons Section */}
          <div className="flex justify-center text-center md:pt-0 lg:pt-0 pt-10">
            <div className="flex space-x-2">
              <span className="social-icon">
                <SocialIcon 
                  url="https://twitter.com/hayzeeonline?t=CXwigiNkx0AZymf_uUwVwg&s=09" 
                  className="hover:scale-110 transition-transform duration-200"
                />
              </span>
              <span className="social-icon">
                <SocialIcon 
                  url="https://instagram.com/hayzee_computer_resources?utm_source=qr&igshid=OGIxMTE0OTdkZA==" 
                  className="hover:scale-110 transition-transform duration-200"
                />
              </span>
              <span className="social-icon">
                <SocialIcon 
                  url="https://www.tiktok.com/@hayzeecomputerresources?_t=8fZAlidBCxq&_r=1" 
                  className="hover:scale-110 transition-transform duration-200"
                />
              </span>
              <span className="social-icon">
                <SocialIcon 
                  url="https://www.facebook.com/Hayzeeonline?mibextid=cejktS" 
                  className="hover:scale-110 transition-transform duration-200"
                />
              </span>
            </div>
          </div>

          {/* Notice Section */}
         
        </div>
      </div>

      {/* Flash Sale Section */}
      {flash_sale && (
        <div className="mt-8">
          <CategorySlider sale_type={"flash sales"} />
        </div>
      )}

      {/* Quick Navigation Section */}
      {/* <div className="col-span-5 md:col-span-12 pt-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-bold text-3xl md:text-5xl text-primary mb-4 tracking-tight">
            Quick Navigation
          </h3>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
            Without further ado, let's help you find a device that fits your budget.
            <br className="hidden md:block" />
            <span className="block mt-2">
              Select a Brand, then use the price slider, Processor, and RAM filters to access your preferred products.
            </span>
          </p>
        </div>
      </div> */}
    </>
  );
};

export default SocialIconMenu;