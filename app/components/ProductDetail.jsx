"use client";
import { Fragment, useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import { Tag, Button, Dropdown, Menu, message, Breadcrumb, Table } from "antd";
import {
  CheckOutlined,
  CheckSquareOutlined,
  LockOutlined,
  CarOutlined,
  ShareAltOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import {
  getProductImages,
  getRelatedProduct,
  getProductInfos,
} from "../../services/productService";
import useCartStore from "../store/zustand";
import "./NumberButton.css";

const ProductDetail = ({ product }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productInfos, setProductInfos] = useState([]);

  const { cart, addToCart, removeFromCart, updateCart } = useCartStore();
  const itemInCart = cart.filter((item) => item.id === product.id);
  const cartItem = cart.find((cartItem) => cartItem.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  console.log(quantity);

  useEffect(() => {
    if (product) {
      fetchImages();
      fetchRelatedProducts();
      fetchProductInfos();
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

  const fetchRelatedProducts = () => {
    setLoading(true);
    getRelatedProduct(product.category_id)
      .then((res) => {
        setRelatedProducts(res.products);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setRelatedProducts([]);
      });
  };

  const fetchProductInfos = async () => {
    try {
      setLoading(true);
      const res = await getProductInfos(product.id);
      setProductInfos(
        res.product_descriptions.map((item, key) => ({
          key: key,
          label: item.label,
          value: item.values,
        }))
      );
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  const tagStyle = {
    backgroundColor: "#dd1d84",
    color: "white",
    borderColor: "#dd1d84",
    margin: "10px 0px 15px 0px",
  };

  const handleViewCart = () => {
    window.location.href = "/cart"; // Replace with your desired URL
  };

  const ShareButton = () => {
    const handleCopyLink = () => {
      navigator.clipboard.writeText(window.location.href);
      message.success("Link copied to clipboard");
    };

    const menu = (
      <Menu>
        <Menu.Item key="copy" onClick={handleCopyLink}>
          <CopyOutlined />
          Click to Copy
        </Menu.Item>
      </Menu>
    );

    return (
      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Button icon={<ShareAltOutlined />} className="share-button">
          Share
        </Button>
      </Dropdown>
    );
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

  const PickupLocation = () => {
    return (
      <div style={{ display: "flex" }}>
        <CheckOutlined style={{ color: "#0E1B4D", marginRight: "8px" }} />
        <span style={{ color: "#0E1B4D", fontWeight: "400" }}>
          Pickup available at Sango, Poly RD, Ibadan, Oyo State Nigeria.
          <b style={{ display: "block" }}>contact: 08037586863</b>
        </span>
      </div>
    );
  };

  const productDescription = () => {};

  const AdditionalInfo = () => {
    const columns = [
      {
        title: "Information",
        dataIndex: "label",
        key: "label",
      },
      {
        title: "Properties",
        dataIndex: "value",
        key: "value",
      },
    ];

    return (
      <Table
        dataSource={productInfos}
        columns={columns}
        pagination={false}
        bordered
        size="small"
        style={{ marginBottom: "20px" }}
      />
    );
  };

  const CustomBreadcrumb = () => {
    return (
      <Breadcrumb separator="/">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/shop">Shop</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  return (
    <section class="py-12 sm:py-16">
      <div class="container mx-auto px-4">
        <nav class="flex pb-10">
          <CustomBreadcrumb />
        </nav>

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
              />
              <div style={{ marginTop: 20 }} className="mobile-filter">
                <h3
                  style={{
                    color: "#0E1B4D",
                    fontWeight: 600,
                    fontFamily: "Archivo, serif",
                    fontSize: 30,
                  }}
                >
                  Additional Information
                </h3>
                <AdditionalInfo />
              </div>
            </div>

            <div class="lg:col-span-5 lg:row-span-2 lg:row-end-2  ">
              {/* lg:max-h-400 overflow-hidden hover:overflow-y-scroll */}
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
              <h5
                class="font-bold text-gray-900 text-sm leading-7 lg:text-3xl"
                style={{
                  color: "#0E1B4D",

                  fontFamily: "Archivo, serif",
                }}
              >
                {product.name}
              </h5>
              <div
                style={{
                  color: "#0E1B4D",
                  fontFamily: "Archivo, serif",
                }}
                className="pt-5 lg:max-h-200 overflow-hidden hover:overflow-y-scroll"
              >
                <div
                  className="description leading-7"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>
              <h2 class="mt-8 text-base text-gray-900">Specifications</h2>
              <div class="mt-3 flex select-none flex-wrap items-center gap-1">
                <label class="">
                  <p class="bg-white text-black rounded-lg border border-black px-3 py-2 font-medium">
                    {product.storage !== "null" && product.storage} Storage
                  </p>
                </label>
                <label class="">
                  <p class="bg-white text-black rounded-lg border border-black px-3 py-2 font-medium">
                    {product.processor !== "null" && product.processor}{" "}
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
                  {itemInCart.length > 0 ? "View Cart" : "Add Cart"}
                </button>
              </div>

              <div className="mt-3">
                <BuyNow />
              </div>
              <div style={{ marginTop: 30 }}>
                <PickupLocation />
                <div
                  style={{
                    color: "#0E1B4D",
                    padding: "20px",
                    fontSize: 15,
                  }}
                >
                  Usually ready in 24 hours{" "}
                </div>
                <div>
                  <a
                    style={{
                      color: "#0E1B4D",
                      padding: "20px",
                      fontSize: 15,
                      fontWeight: 300,
                      textDecoration: "underlined",
                    }}
                    href="#"
                  >
                    View store information
                  </a>
                </div>
              </div>

              <div>
                <ShareButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
