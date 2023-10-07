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
import { getAllBrands, getAllCategories } from "../../services/productService";
import CarouselHolder from "../products/CarouselHolder";

const CategorySlider = ({ brand, category }) => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState(6);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, [rows]);

  const fetchCategories = () => {
    setLoading(true);
    getAllCategories({ rows }).then(
      (res) => {
        setCategories(res.categories.data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  const fetchBrands = () => {
    setLoading(true);
    getAllBrands({ rows }).then(
      (res) => {
        setBrands(res.brands.data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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
          variableWidth: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="container mx-auto py-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="col-span-12">
            {brand == "brand" && (
              <h2 className="text-2xl font-medium leading-4 tracking-tight text-gray-900 mt-5 mb-5">
                Brands
              </h2>
            )}
            {category == "category" && (
              <h2 className="text-2xl font-medium leading-4 tracking-tight text-gray-900 mt-5 mb-5">
                Categories
              </h2>
            )}
            {!loading ? (
              <Slider {...settings}>
                {/* Add your carousel slides here */}
                {category === "category" &&
                  categories.map((category, key) => (
                    <div>
                      <a
                        href={`/category/${category.slug}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <img
                          className="slide-item"
                          src={category.image_url}
                          style={{ borderRadius: 5, height: 200, width: 200 }}
                          alt=""
                        />
                        <div
                          style={{
                            marginLeft: "70px",
                            paddingTop: 20,
                            fontWeight: "bold",
                            fontFamily:
                              '"Montserrat", Arial, Helvetica, sans-serif',
                          }}
                        >
                          {category.name}
                        </div>
                      </a>
                    </div>
                  ))}
                {brand === "brand" &&
                  brands.map((brand, key) => (
                    <div>
                      <a
                        href={`/brand/${brand.slug}`}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        <img
                          className="slide-item"
                          src={brand.image_url}
                          style={{ borderRadius: 5, height: 200, width: 200 }}
                          alt=""
                        />
                        <div
                          style={{
                            marginLeft: "70px",
                            paddingTop: 20,
                            fontWeight: "bold",
                            fontFamily:
                              '"Montserrat", Arial, Helvetica, sans-serif',
                          }}
                        >
                          {brand.name}
                        </div>
                      </a>
                    </div>
                  ))}
              </Slider>
            ) : (
              <CarouselHolder />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategorySlider;
