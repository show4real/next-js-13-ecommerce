"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { getOtherSales } from "../services/productService";
import "./styles.css";

const CategorySlider = ({ sale_type }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const res = await getOtherSales({ sale_type });
      setProducts(res.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const limitStringToThreeWords = (str) => {
    const words = str.trim().split(/\s+/);
    if (words.length > 3) {
      return words.slice(0, 3).join(" ");
    }
    return str;
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true, // Turn on auto-scroll
    autoplaySpeed: 2000,
    prevArrow: (
      <button type="button" className="slick-prev">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
    ),
    nextArrow: (
      <button type="button" className="slick-next">
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          variableWidth: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="mx-auto max-w-2xl px-2 mb-24 sm:px-3  lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-bold leading-4 tracking-tight text-gray-900 mt-10 mb-5">
              Flash Sales
            </h2>

            {!loading ? (
              <Slider {...settings}>
                {/* Add your carousel slides here */}
                {products.map((product, key) => (
                  <div key={key}>
                    <a
                      href={`/products/${product.slug}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <img
                        className="slide-item"
                        src={product.image}
                        style={{ borderRadius: 5, height: 200, width: 200 }}
                        alt=""
                      />
                      <div
                        style={{
                          paddingTop: 20,
                          fontFamily:
                            '"Montserrat", Arial, Helvetica, sans-serif',
                        }}
                        className="text-xs font-medium pl-2"
                      >
                        {limitStringToThreeWords(product.name)}
                      </div>
                    </a>
                    <p>
                      <span className="text-sm font-bold text-slate-900 pl-2">
                        &#8358;{formatNumber(product.price)}
                      </span>
                    </p>
                  </div>
                ))}
              </Slider>
            ) : (
              <>Loading...</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySlider;
