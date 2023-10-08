import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ImageGallery from "react-image-gallery";
import { Tag, Button, Dropdown, Menu, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { getProductImages } from "../services/productService";
import useCartStore from "../store/zustand";
import "./NumberButton.css";

export default function ProductGlance({ product, toggle, show }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { cart, addToCart, removeFromCart, updateCart } = useCartStore();
  const itemInCart = cart.filter((item) => item.id === product.id);
  const cartItem = cart.find((cartItem) => cartItem.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  console.log(quantity);

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
    margin: "10px 0px 15px 0px",
  };

  const handleViewCart = () => {
    window.location.href = "/checkout"; // Replace with your desired URL
  };

  const NumberButton = () => {
    return (
      cartItem !== 0 && (
        <div className="number-button">
          <div style={{ marginLeft: 10 }}>
            <Button
              className="minus-button"
              //  onClick={() =>
              //    updateItemQuantity(cartItem.id, cartItem.quantity - 1)
              //  }
              onClick={() => {
                if (quantity > 1) {
                  updateCart(product.id, quantity - 1);
                } else {
                  removeFromCart(product.id);
                }
              }}
            >
              <span style={{ fontSize: 20 }}>-</span>
            </Button>
            <span style={{ paddingLeft: 10, fontSize: 20 }}>
              {cartItem.quantity}
            </span>
            <Button
              className="plus-button"
              onClick={() => updateCart(product.id, quantity + 1)}
              style={{ paddingLeft: 20 }}
            >
              <span style={{ fontSize: 20 }}>+</span>
            </Button>
          </div>
        </div>
      )
    );
  };

  const BuyNow = () => {
    const handleCopyLink = () => {
      navigator.clipboard.writeText(
        window.location.href + `product/${product.slug}`
      );
      message.success("Link copied to clipboard");
    };

    const menu = (
      <Menu>
        <Menu.Item key="copy" onClick={handleCopyLink}>
          <CopyOutlined /> {"  "}
          <span
            style={{ paddingLeft: 10, fontWeight: "bold", color: "#0E1B4D" }}
          >
            Click to Copy Link
            <br />
            Then click on the Messenger Button to paste
          </span>
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <div class="flex flex-col justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
          <button
            type="button"
            // style={{ width: "400px" }}
            class="inline-flex items-center w-full justify-center rounded-md border-2  bg-blue-500 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 hover:text-white border-blue-500"
          >
            Buy Now
          </button>
        </div>
      </Dropdown>
    );
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={toggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                    onClick={toggle}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <section class=" sm:py-16">
                    <div class="container mx-auto px-4">
                      <div class="lg:col-gap-12 xl:col-gap-16  grid grid-cols-1 gap-12  lg:grid-cols-5 lg:gap-16">
                        <div class="lg:col-span-3 lg:row-end-1">
                          <ImageGallery
                            showPlayButton={false}
                            showNav={true}
                            items={images.map((image) => ({
                              original: image,
                              thumbnail: image,
                            }))}
                            originalHeight={"800px"}
                          />
                        </div>

                        <div class="lg:col-span-5 lg:row-span-2 lg:row-end-2">
                          <h5
                            style={{
                              color: "#0E1B4D",
                              textTransform: "uppercase",
                            }}
                          >
                            {product.product_type}
                          </h5>
                          <span>
                            {" "}
                            <Tag style={tagStyle}>
                              {product.availability ? "Stock" : "Sold"}
                            </Tag>
                          </span>
                          <h1 class="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                            {product.name}
                          </h1>
                          <h2 class="mt-8 text-base text-gray-900">
                            Specifications
                          </h2>
                          <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                            <label class="">
                              <p class="bg-white text-black rounded-lg border border-black px-3 py-2 font-medium">
                                {product.storage !== "null" && product.storage}{" "}
                                Storage
                              </p>
                            </label>
                            <label class="">
                              <p class="bg-white text-black rounded-lg border border-black px-3 py-2 font-medium">
                                {product.processor !== "null" &&
                                  product.processor}{" "}
                                Processor
                              </p>
                            </label>
                            <label class="">
                              <p class="bg-white text-black rounded-lg border border-black px-3 py-2 font-medium">
                                {product.ram !== "null" && product.ram} RAM
                              </p>
                            </label>
                          </div>
                          <div class="mt-5 flex select-none flex-wrap items-center gap-1">
                            <span
                              style={{
                                fontSize: 30,
                                paddingLeft: 10,
                                color: "#0E1B4D",
                                fontWeight: 800,
                                fontFamily: "Archivo, serif",
                              }}
                            >
                              &#8358;{formatNumber(product.price)}
                            </span>{" "}
                          </div>
                          {itemInCart.length > 0 && (
                            <div class="mt-3 flex flex-col justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                              <NumberButton />
                            </div>
                          )}

                          <div class="mt-3 flex flex-col justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                            <button
                              type="button"
                              class="inline-flex w-full items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                              onClick={
                                itemInCart.length === 0
                                  ? () => addToCart(product)
                                  : handleViewCart
                              }
                            >
                              {itemInCart.length > 0 ? "Check Out" : "Add Cart"}
                            </button>
                          </div>

                          <div class="mt-3 flex flex-col justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                            <button
                              type="button"
                              class="inline-flex items-center w-full justify-center rounded-md border-2  bg-white bg-none px-12 py-3 text-center text-base font-bold text-black transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800 hover:text-white border-black"
                            >
                              <a href={`/products/${product.slug}`}>
                                See Details
                              </a>
                            </button>
                          </div>
                          <div className="mt-3">
                            <BuyNow />
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
