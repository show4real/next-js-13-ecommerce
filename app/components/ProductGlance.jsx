import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ImageGallery from "react-image-gallery";
import { Tag, Button, Dropdown, Menu, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { getProductImages } from "/app/services/productService";
import useCartStore from "/app/store/zustand";
import "./NumberButton.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductGlance({ product, toggle, show }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart, addToCart, removeFromCart, updateCart } = useCartStore();
  const itemInCart = cart.filter((item) => item.id === product.id);
  const cartItem = cart.find((cartItem) => cartItem.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const router = useRouter();

  useEffect(() => {
    if (toggle) {
      fetchImages();
    }
  }, []);

  const fetchImages = () => {
    setLoading(true);
    getProductImages(product.id)
      .then((res) => {
        setImages(res.product_images);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const tagStyle = {
    backgroundColor: "#dd1d84",
    color: "white",
    borderColor: "#dd1d84",
    margin: "8px 0px 12px 0px",
    fontSize: "12px",
    padding: "2px 8px"
  };

  const handleViewCart = () => {
    return <Link href="/checkout">View Cart</Link>;
  };

  const NumberButton = () => {
    return (
      cartItem !== 0 && (
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-2">
          <Button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 border-0"
            onClick={() => {
              if (quantity > 1) {
                updateCart(product.id, quantity - 1);
              } else {
                removeFromCart(product.id);
              }
            }}
          >
            <span className="text-lg font-bold">-</span>
          </Button>
          <span className="mx-4 text-lg font-semibold min-w-[24px] text-center">
            {cartItem.quantity}
          </span>
          <Button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 border-0"
            onClick={() => updateCart(product.id, quantity + 1)}
          >
            <span className="text-lg font-bold">+</span>
          </Button>
        </div>
      )
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    router.push("/checkout");
  };

  const BuyNow = () => {
    return (
      <button
        type="button"
        className="w-full rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleAddToCart}
      >
        Buy Now
      </button>
    );
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={toggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-xl bg-white shadow-2xl">
                {/* Close Button */}
                <button
                  type="button"
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/80 p-2 text-gray-400 hover:text-gray-600 hover:bg-white transition-colors"
                  onClick={toggle}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[90vh] overflow-y-auto">
                  {/* Image Gallery */}
                  <div className="bg-gray-50 p-6">
                    <div className="aspect-square">
                      <ImageGallery
                        showPlayButton={false}
                        showNav={true}
                        showThumbnails={images.length > 1}
                        items={images.map((image) => ({
                          original: image,
                          thumbnail: image,
                        }))}
                        additionalClass="rounded-lg overflow-hidden"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-6 flex flex-col">
                    {/* Product Type */}
                    <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">
                      {product.product_type}
                    </div>

                    {/* Availability Tag */}
                    <Tag style={tagStyle}>
                      {product.availability ? "In Stock" : "Sold Out"}
                    </Tag>

                    {/* Product Name */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {product.name}
                    </h1>

                    {/* Price */}
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-gray-900">
                        &#8358;{formatNumber(product.price)}
                      </span>
                      <div className="mt-2">
                        <div className="text-sm text-gray-800 font-semibold">
                        VAT: &#8358;{formatNumber(Math.round(product.price * 0.075))}  (Total: &#8358;{formatNumber(Math.round(product.price + Math.round(product.price * 0.075)))})
                      </div>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Specifications</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.storage && product.storage !== "null" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {product.storage} Storage
                          </span>
                        )}
                        {product.processor && product.processor !== "null" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {product.processor} Processor
                          </span>
                        )}
                        {product.ram && product.ram !== "null" && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {product.ram} RAM
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Controls (if item is in cart) */}
                    {itemInCart.length > 0 && (
                      <div className="mb-4">
                        <NumberButton />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="space-y-3 mt-auto">
                      {/* Add to Cart / View Cart */}
                      <button
                        type="button"
                        className="w-full rounded-lg bg-gray-900 hover:bg-gray-800 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        onClick={
                          itemInCart.length === 0
                            ? () => addToCart(product)
                            : handleViewCart
                        }
                      >
                        {itemInCart.length > 0 ? (
                          <Link href="/checkout" className="block">View Cart</Link>
                        ) : (
                          "Add to Cart"
                        )}
                      </button>

                      {/* Buy Now */}
                      <BuyNow />

                      {/* See Details */}
                      <Link href={`/products/${product.slug}`} className="block">
                        <button
                          type="button"
                          className="w-full rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-50 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        >
                          See Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}