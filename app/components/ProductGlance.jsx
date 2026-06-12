import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ProductGallery from "./ProductGallery";
import { Tag, Button, Dropdown, Menu, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { getProductImages } from "/app/services/productService";
import useCartStore from "/app/store/zustand";
import useHasMounted from "/app/hooks/useHasMounted";
import "./NumberButton.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductGlance({ product, toggle, show }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart: persistedCart, addToCart, removeFromCart, updateCart } =
    useCartStore();
  const hasMounted = useHasMounted();
  const cart = hasMounted ? persistedCart : [];
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

  const NumberButton = () =>
    cartItem ? (
      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-700">Quantity</span>
        <div className="inline-flex items-center rounded-lg border border-gray-200">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:text-primary"
            onClick={() => {
              if (quantity > 1) {
                updateCart(product.id, quantity - 1);
              } else {
                removeFromCart(product.id);
              }
            }}
          >
            <span className="text-lg font-bold">−</span>
          </button>
          <span className="w-10 text-center text-base font-bold text-primary">
            {cartItem.quantity}
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="flex h-9 w-9 items-center justify-center text-gray-600 transition hover:text-primary"
            onClick={() => updateCart(product.id, quantity + 1)}
          >
            <span className="text-lg font-bold">+</span>
          </button>
        </div>
      </div>
    ) : null;

  const handleAddToCart = () => {
    addToCart(product);
    router.push("/checkout");
  };

  const BuyNow = () => {
    return (
      <button
        type="button"
        className="w-full rounded-lg bg-accent px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-accent-600 active:scale-[0.99]"
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
                  <div className="bg-white p-5 sm:p-6">
                    <ProductGallery images={images} />
                  </div>

                  {/* Product Details */}
                  <div className="flex flex-col p-5 sm:p-6">
                    {/* Product Type */}
                    {product.product_type && (
                      <div className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">
                        {product.product_type}
                      </div>
                    )}

                    {/* Availability pill */}
                    <span
                      className={`mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        product.availability
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          product.availability ? "bg-green-500" : "bg-red-500"
                        }`}
                      />
                      {product.availability ? "In Stock" : "Sold Out"}
                    </span>

                    {/* Product Name */}
                    <h1 className="mb-4 text-xl font-extrabold leading-snug text-primary sm:text-2xl">
                      {product.name}
                    </h1>

                    {/* Price */}
                    <div className="mb-6 rounded-xl bg-primary-50 p-4">
                      <span className="text-2xl font-extrabold text-primary sm:text-3xl">
                        &#8358;{formatNumber(product.price)}
                      </span>
                      <p className="mt-1 text-sm text-gray-600">
                        Incl. VAT &#8358;{formatNumber(Math.round(product.price * 0.075))}
                        <span className="mx-1.5 text-gray-300">•</span>
                        Total{" "}
                        <span className="font-semibold text-primary">
                          &#8358;{formatNumber(Math.round(product.price + Math.round(product.price * 0.075)))}
                        </span>
                      </p>
                    </div>

                    {/* Specifications */}
                    {(product.storage || product.processor || product.ram) && (
                      <div className="mb-6">
                        <h3 className="mb-2 text-sm font-bold text-gray-700">Specifications</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.storage && product.storage !== "null" && (
                            <span className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary">
                              {product.storage} Storage
                            </span>
                          )}
                          {product.processor && product.processor !== "null" && (
                            <span className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary">
                              {product.processor} Processor
                            </span>
                          )}
                          {product.ram && product.ram !== "null" && (
                            <span className="rounded-lg border border-primary-100 bg-primary-50 px-3 py-1.5 text-xs font-semibold text-primary">
                              {product.ram} RAM
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Description */}
                    {product.description && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                        <div
                          className="description leading-7 text-sm text-gray-600 max-h-32 overflow-y-auto"
                          dangerouslySetInnerHTML={{ __html: product.description }}
                        />
                      </div>
                    )}

                    {/* Quantity Controls (if item is in cart) */}
                    {itemInCart.length > 0 && (
                      <div className="mb-4">
                        <NumberButton />
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="mt-auto space-y-2.5 pt-2">
                      {/* Add to Cart / View Cart */}
                      <button
                        type="button"
                        className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-primary-500 active:scale-[0.99]"
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
                          className="w-full rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary-50"
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