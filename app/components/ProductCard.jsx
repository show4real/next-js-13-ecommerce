import React, { useState } from "react";
import { EyeOutlined, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import ProductGlance from "./ProductGlance";
import Link from "next/link";

const ProductCard = ({ product, key }) => {
  const [productView, setProduct] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const limitProductName = (str) => {
    const stringWithoutPipe = str.replace(/\|/g, "");
    const words = stringWithoutPipe.trim().split(/\s+/);
    const first10Words = words.slice(0, 12).join(" ");
    return first10Words + (words.length > 12 ? "..." : "");
  };

  const toggle = () => {
    setProduct(!productView);
  };

  const productQuickView = (productView) => {
    setProduct(productView);
  };

  return (
    <>
      {productView && (
        <ProductGlance product={productView} toggle={toggle} show={true} />
      )}

      <div 
        className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-50 rounded-t-2xl">
          <img
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
          
          {/* Hover Image */}
          {product.image_hover && (
            <img
              className={`absolute inset-0 h-full w-full object-contain transition-all duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              src={product.image_hover}
              alt={product.name}
              loading="lazy"
            />
          )}

          {/* Stock Badge */}
          <div className="absolute top-3 right-3">
            <span
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                product.availability == 1
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.availability == 1 ? "In Stock" : "Sold Out"}
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300">
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <button
                onClick={() => productQuickView(product)}
                className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                title="Quick View"
              >
                <EyeOutlined className="text-sm" />
              </button>
              <button
                className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                title="Add to Wishlist"
              >
                <HeartOutlined className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <Link href={`/products/${product.slug}`}>
          <div className="p-4 space-y-3">
            {/* Product Name */}
            <h3 className="text-sm font-medium text-gray-900 leading-relaxed hover:text-blue-600 transition-colors duration-200 line-clamp-2">
              {limitProductName(product.name)}
            </h3>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  &#8358;{formatNumber(product.price)}
                </span>
                    <span className="text-xs text-gray-800 mt-1">
                       VAT: &#8358;{formatNumber(Math.round(product.price * 0.075))} (Total: &#8358;{formatNumber(Math.round(product.price + Math.round(product.price * 0.075)))})
                    </span>
                   
              </div>
              
              {/* Add to Cart Button - Desktop Only */}
              <button
                className="hidden sm:flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                title="Add to Cart"
                disabled={product.availability != 1}
              >
                <ShoppingCartOutlined className="text-sm" />
              </button>
            </div>

            {/* Discount Badge */}
            {product.old_price && product.old_price > product.price && (
              <div className="absolute top-3 left-3">
                <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-md">
                  {Math.round(((product.old_price - product.price) / product.old_price) * 100)}% OFF
                </span>
              </div>
            )}
          </div>
        </Link>

       
      </div>
    </>
  );
};

export default ProductCard;