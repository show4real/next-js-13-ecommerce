import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import ProductGlance from "./ProductGlance";
import Link from "next/link";

const ProductCard = ({ product, key }) => {
  const [productView, setProduct] = useState(null);

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const limitProductName = (str) => {
    const stringWithoutPipe = str.replace(/\|/g, "");
    const words = stringWithoutPipe.trim().split(/\s+/);
    const first10Words = words.slice(0, 18).join(" ");
    return first10Words;
  };

  const toggle = () => {
    setProduct(!productView);
    // fetchProducts();
  };

  const productQuickView = (productView) => {
    setProduct(productView);
  };

  return (
    <>
      {productView && (
        <ProductGlance product={productView} toggle={toggle} show={true} />
      )}

      <div className="group my-10 mx-auto w-full max-w-xs flex flex-col overflow-hidden rounded-lg border-gray-100 bg-white shadow-md">
        <div className="relative mx-3 mt-3 flex h-72 overflow-hidden rounded-sm">
          <img
            className="peer absolute top-0 right-0 h-full w-full object-contain"
            src={product.image}
            alt="product image"
          />
          <img
            className="peer absolute top-0 -right-96 h-full w-full object-contain transition-all delay-100 duration-1000 hover:right-0 peer-hover:right-0"
            src={product.image_hover}
            alt="product image"
          />

          <button onClick={() => productQuickView(product)}>
            <span className="absolute bottom-0 p-2 px-20 left-5 m-2 rounded-sm bg-black text-center text-sm font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <EyeOutlined color="white" />
              <span className="">View</span>
            </span>
          </button>

          <span className="absolute top-0 right-0 p-2 m-2 rounded-sm text-center text-sm  text-white bg-blue-400 font-medium ">
            <button>
              <span> {product.availability == 1 ? "Stock" : "Sold"}</span>
            </button>
          </span>
        </div>
        <Link href={`/products/${product.slug}`}>
          <div className="mt-4 px-5 pb-2">
            <h5 className="text-sm tracking-tight text-slate-900">
              {limitProductName(product.name)}
            </h5>
            <div className="mt-2 flex items-center justify-between">
              <p>
                <span className="text-sm font-bold text-slate-900">
                  &#8358;{formatNumber(product.price)}
                </span>
              </p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
