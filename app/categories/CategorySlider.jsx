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

// Product Card Component
const FlashSaleCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const limitStringToThreeWords = (str) => {
    const words = str.trim().split(/\s+/);
    if (words.length > 3) {
      return words.slice(0, 3).join(" ") + "...";
    }
    return str;
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="px-2">
      <Link href={`/products/${product.slug}`}>
        <div
          className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Flash Sale Badge */}
          <div className="absolute top-3 left-3 z-10">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 animate-pulse">
              <FontAwesomeIcon icon={faFire} className="w-3 h-3" />
              <span>FLASH</span>
            </div>
          </div>

          {/* Discount Badge */}
          {product.old_price && product.old_price > product.price && (
            <div className="absolute top-3 right-3 z-10">
              <div className="bg-yellow-400 text-gray-900 px-2 py-1 rounded-lg text-xs font-bold">
                {Math.round(((product.old_price - product.price) / product.old_price) * 100)}% OFF
              </div>
            </div>
          )}

          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Product Info */}
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200 min-h-[2.5rem] flex items-center">
              {limitStringToThreeWords(product.name)}
            </h3>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  &#8358;{formatNumber(product.price)}
                </span>
                {product.old_price && product.old_price > product.price && (
                  <span className="text-sm text-gray-500 line-through">
                    &#8358;{formatNumber(product.old_price)}
                  </span>
                )}
              </div>
              
              {/* Stock status */}
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${product.availability ? 'bg-green-400' : 'bg-red-400'}`} />
                <span className={`text-xs font-medium ${product.availability ? 'text-green-600' : 'text-red-600'}`}>
                  {product.availability ? 'In Stock' : 'Sold Out'}
                </span>
              </div>
            </div>

            {/* Quick Action Button */}
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 transform group-hover:scale-105 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
              Quick View
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-gray-50 rounded-3xl p-12 text-center">
          <FontAwesomeIcon icon={faClock} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Flash Sale Products</h3>
          <p className="text-gray-500">Check back later for amazing deals!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
      <div className=" rounded-3xl p-8 relative overflow-hidden">
        {/* Background decoration */}
        {/* <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-200/20 to-pink-200/20 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-200/20 to-yellow-200/20 rounded-full translate-y-24 -translate-x-24"></div> */}
        
        {/* Header */}
        <div className="relative z-10 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-red-500 to-pink-500 p-3 rounded-2xl">
                <FontAwesomeIcon icon={faFire} className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Flash Sales
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Limited time offers • Hurry up!
                </p>
              </div>
            </div>
            
            {/* Timer (optional - you can add actual countdown logic) */}
            <div className="hidden md:flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
              <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700">Ends Soon</span>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="relative z-10">
          <Slider {...settings}>
            {products.map((product, key) => (
              <FlashSaleCard key={key} product={product} />
            ))}
          </Slider>
        </div>

        {/* View All Button */}
        
      </div>
    </div>
  );
};

export default CategorySlider;