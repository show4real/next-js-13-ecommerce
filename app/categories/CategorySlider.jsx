"use client";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faClock,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { getOtherSales } from "../services/productService";
import "./styles.css";
import Loading from "app/loading";
import Link from "next/link";
import ProductCard from "app/components/ProductCard";

// Custom Arrow Components
const CustomPrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group"
    style={{ zIndex: 2 }}
  >
    <FontAwesomeIcon 
      icon={faChevronLeft} 
      className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
    />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-900 rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 group"
    style={{ zIndex: 2 }}
  >
    <FontAwesomeIcon 
      icon={faChevronRight} 
      className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" 
    />
  </button>
);

// Reuse the shared, mobile-responsive ProductCard so the slider matches the
// rest of the site. The px-2 wrapper keeps the slick slide gutters; h-full lets
// cards stretch to equal height within the track.
const FlashSaleCard = ({ product }) => (
  <div className="h-full px-2">
    <ProductCard product={product} />
  </div>
);

const CategorySlider = ({ sale_type }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const settings = {
    dots: true,
    infinite: products.length > 5,
    speed: 500,
    slidesToShow: Math.min(products.length, 5),
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
    customPaging: (i) => (
      <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
        i === currentSlide ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
      }`} />
    ),
    dotsClass: "slick-dots custom-dots",
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: Math.min(products.length, 4),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(products.length, 3),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(products.length, 2),
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-200 border-t-red-500 mx-auto"></div>
              <FontAwesomeIcon 
                icon={faFire} 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 w-6 h-6" 
              />
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading Flash Sale Products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-gray-50 rounded-3xl p-12 text-center">
          <FontAwesomeIcon icon={faClock} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Flash Sale Products</h3>
          <p className="text-gray-500">Check back later for amazing deals!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
      <div className="relative overflow-hidden rounded-3xl p-4 sm:p-6 lg:p-8">
        {/* Background decoration */}
        {/* <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/20 to-yellow-200/20 rounded-full translate-y-24 -translate-x-24"></div> */}
        
        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center space-x-3">
              <div className="flex-shrink-0 bg-gradient-to-r from-red-500 to-pink-500 p-2.5 sm:p-3 rounded-2xl">
                <FontAwesomeIcon icon={faFire} className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="truncate text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                  Flash Sales
                </h2>
                <p className="hidden sm:mt-1 sm:block text-gray-600 text-sm">
                  Limited time offers • Hurry up!
                </p>
              </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2 sm:gap-3">
              {/* Timer (optional - you can add actual countdown logic) */}
              <div className="hidden md:flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium text-gray-700">Ends Soon</span>
              </div>

              {/* View all */}
              <Link
                href="/flash-sales"
                aria-label="View all flash sale products"
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-red-600 hover:to-pink-600 active:scale-95 sm:px-4"
              >
                <span>View all</span>
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Tablet / desktop slider */}
        <div className="relative z-10 hidden md:block">
          <Slider {...settings}>
            {products.map((product, key) => (
              <FlashSaleCard key={key} product={product} />
            ))}
          </Slider>
        </div>

        {/* Mobile swipe rail */}
        <div className="relative z-10 md:hidden">
          <div className="no-scrollbar -mx-2 flex snap-x snap-mandatory overflow-x-auto px-2 pb-1">
            {products.map((product, key) => (
              <div
                key={key}
                className="w-[78%] flex-shrink-0 snap-start sm:w-[48%]"
              >
                <FlashSaleCard product={product} />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs font-medium text-gray-400">
            Swipe for more deals →
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;