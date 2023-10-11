"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Tabs, Button } from "antd";
import { getCategories } from "../services/productService";
import CarouselHolder from "../products/CarouselHolder";
import ProductCard from "app/components/ProductCard";

const { TabPane } = Tabs;

const Category = ({}) => {
  const [options] = useState({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 5,
      },
    },
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const YouTubeChannel = () => {
    return (
      <div>
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtube}`}
        ></iframe>
      </div>
    );
  };

  const getData = () => {
    setLoading(true);
    getCategories({})
      .then((res) => {
        setCategories(res.categories);
        setYoutube(res.youtube);
        setLoading(false);
        waitforme(5000);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const waitforme = (milisec) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, milisec);
      setLoading(false);
    });
  };

  const handleViewAllCategory = () => {
    window.location.href = "/categories"; // Replace with your desired URL
  };
  const handleViewAll = (slug) => {
    window.location.href = `/categories/${slug}`; // Replace with your desired URL
  };

  const operations = <Button onClick={handleViewAllCategory}>View All</Button>;

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="col-span-12">
          {loading === false ? (
            <Tabs tabBarExtraContent={operations}>
              {categories.map((category, key) => (
                <TabPane tab={category.name} key={key}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {category.products.length &&
                      category.products.map((product, key) => (
                        <div
                          key={key}
                          className={`sm:ml-10 md:ml-0 lg:ml-0 xl:ml-0 ml-5`}
                          style={{
                            marginBottom: 20,
                            transition: "opacity 0.5s ease-in-out",
                            // border: "solid 1px #EEEEEE",
                          }}
                        >
                          <ProductCard product={product} />
                        </div>
                      ))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className={`md:col-span-3 col-span-12`}></div>
                    <div
                      className={`md:col-span-5 col-span-12 flex justify-center`}
                      style={{ marginBottom: 30 }}
                    >
                      <div>
                        <button
                          onClick={() => handleViewAll(category.slug)}
                          style={{
                            border: "1px solid #0E1B4D",
                            borderRadius: 5,
                            padding: "5px 10px",
                            color: "#0E1B4D",
                            background: "transparent",
                            cursor: "pointer",
                            textTransform: "capitalize",
                          }}
                        >
                          View all {category.name}
                        </button>
                      </div>
                    </div>
                  </div>
                </TabPane>
              ))}
            </Tabs>
          ) : (
            <CarouselHolder />
          )}
        </div>
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-12 gap-4"
        style={{ marginBottom: 30 }}
      >
        <div className="col-span-12">
          {!loading ? <YouTubeChannel /> : <CarouselHolder />}
        </div>
      </div>
    </div>
  );
};

export default Category;
