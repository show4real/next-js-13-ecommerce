"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Tabs, Button } from "antd";
import { getCategories } from "../services/productService";
import CarouselHolder from "../products/CarouselHolder";
import ProductCard from "app/components/ProductCard";
import { ArrowRightIcon, PlayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const { TabPane } = Tabs;

const Category = ({}) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const YouTubeChannel = () => {
    return (
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
          <div className="flex items-center">
            <PlayIcon className="h-6 w-6 text-white mr-3" />
            <h3 className="text-xl font-semibold text-white">Featured Video</h3>
          </div>
        </div>
        <div className="relative pb-[56.25%] h-0">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${youtube}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
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
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching categories:", error);
      });
  };

  const handleViewAllCategory = () => {
    window.location.href = "/categories";
  };

  const handleViewAll = (slug) => {
    window.location.href = `/categories/${slug}`;
  };

  const ViewAllButton = () => (
    <Button 
      type="primary"
      size="large"
      onClick={handleViewAllCategory}
      className="bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 rounded-lg font-medium shadow-sm"
      icon={<ArrowRightIcon className="h-4 w-4" />}
      iconPosition="end"
    >
      View All Categories
    </Button>
  );

  const CategoryViewAllButton = ({ category }) => (
    <button
      onClick={() => handleViewAll(category.slug)}
      className="group inline-flex items-center px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white font-medium rounded-full hover:from-slate-700 hover:to-slate-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
    >
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        View All {category.name}
      </span>
      <ArrowRightIcon className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
    </button>
  );

  const EmptyState = ({ categoryName }) => (
    <div className="text-center py-16">
      <div className="text-gray-400 text-6xl mb-4">📦</div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">No Products Available</h3>
      <p className="text-gray-500">
        We are working on adding products to the {categoryName} category
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <CarouselHolder />
          <CarouselHolder />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our wide range of products organized by categories
        </p>
      </div>

      {/* Categories Tabs Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <Tabs 
            tabBarExtraContent={<ViewAllButton />}
            size="large"
            className="category-tabs"
            tabBarStyle={{
              margin: 0,
              padding: '0 24px',
              backgroundColor: '#f8fafc',
              borderBottom: '1px solid #e2e8f0'
            }}
          >
            {categories.map((category, key) => (
              <TabPane 
                tab={
                  <span className="font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200">
                    {category.name}
                  </span>
                } 
                key={key}
              >
                <div className="p-6">
                  {category.products.length > 0 ? (
                    <>
                      {/* Products Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-6 mb-8">
                        {category.products.map((product, productKey) => (
                          <div
                            key={productKey}
                            className="transform hover:scale-105 transition-transform duration-300"
                          >
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>

                      {/* View All Button for Category */}
                      <div className="text-center pt-8 border-t border-gray-100">
                        <CategoryViewAllButton category={category} />
                      </div>
                    </>
                  ) : (
                    <EmptyState categoryName={category.name} />
                  )}
                </div>
              </TabPane>
            ))}
          </Tabs>
        </div>

        {/* YouTube Section */}
        {youtube && (
          <div className="mb-8">
            <YouTubeChannel />
          </div>
        )}
      </div>
      
  );
};

export default Category;