"use client";
import {useState, useEffect } from "react";
import ProductGallery from "./ProductGallery";
import { Tag, Button, Dropdown, Menu, message, Breadcrumb } from "antd";
import {
  CheckOutlined,
  ShareAltOutlined,
  CopyOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import {
  TruckIcon,
  MapPinIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import TrustBadges from "./TrustBadges";
import {
  getProductImages,
  getRelatedProduct,
} from "/app/services/productService";
import { getProductSpecs } from "/app/lib/productSpecs";
import useCartStore from "/app/store/zustand";
import { OFFICES as offices } from "/app/lib/business";
import "./NumberButton.css";
import Link from "next/link";
import CarouselDetailHolder from "./CarouselDetailHolder";
import ReferralBadge from "./ReferralBadge";
import { useRouter } from "next/navigation";

const ProductDetail = ({ product }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showSpecs, setShowSpecs] = useState(true);

  const { cart, addToCart, removeFromCart, updateCart } = useCartStore();
  const itemInCart = cart.filter((item) => item.id === product.id);
  const cartItem = cart.find((cartItem) => cartItem.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const router = useRouter();

  useEffect(() => {
    if (product) {
      fetchImages();
      fetchRelatedProducts();
    }
  }, [product]);

  const fetchImages = () => {
    setLoading(true);
    getProductImages(product.id)
      .then((res) => {
        setImages(res.product_images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
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
        console.error("Error fetching related products:", error);
        setLoading(false);
        setRelatedProducts([]);
      });
  };

  const tagStyle = {
    backgroundColor: "#dd1d84",
    color: "white",
    borderColor: "#dd1d84",
    margin: "10px 0px 15px 0px",
  };

  const handleViewCart = () => {
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    addToCart(product);
    router.push("/checkout");
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
    const buttonStyle = {
      width: '40px',
      height: '40px',
      borderRadius: '8px',
      border: '1px solid #d9d9d9',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#0E1B4D',
    };

    const minusButtonStyle = {
      ...buttonStyle,
      borderColor: '#ff4d4f',
      color: '#ff4d4f',
    };

    const plusButtonStyle = {
      ...buttonStyle,
      borderColor: '#52c41a',
      color: '#52c41a',
    };

    const quantityStyle = {
      fontSize: '18px',
      fontWeight: '600',
      color: '#0E1B4D',
      minWidth: '40px',
      textAlign: 'center',
      margin: '0 12px',
    };

    const handleMinusClick = () => {
      if (quantity > 1) {
        updateCart(product.id, quantity - 1);
      } else {
        removeFromCart(product.id);
      }
    };

    const handlePlusClick = () => {
      updateCart(product.id, quantity + 1);
    };

    const handleMouseEnter = (e, isPlus = false) => {
      if (isPlus) {
        e.target.style.backgroundColor = '#52c41a';
        e.target.style.color = '#fff';
      } else {
        e.target.style.backgroundColor = '#ff4d4f';
        e.target.style.color = '#fff';
      }
    };

    const handleMouseLeave = (e, isPlus = false) => {
      e.target.style.backgroundColor = '#fff';
      if (isPlus) {
        e.target.style.color = '#52c41a';
      } else {
        e.target.style.color = '#ff4d4f';
      }
    };

    return (
      cartItem && (
        <div className="flex items-center justify-center bg-gray-50 rounded-lg p-3 border">
          <button
            style={minusButtonStyle}
            onClick={handleMinusClick}
            onMouseEnter={(e) => handleMouseEnter(e, false)}
            onMouseLeave={(e) => handleMouseLeave(e, false)}
          >
            <MinusOutlined />
          </button>
          
          <span style={quantityStyle}>
            {cartItem.quantity}
          </span>
          
          <button
            style={plusButtonStyle}
            onClick={handlePlusClick}
            onMouseEnter={(e) => handleMouseEnter(e, true)}
            onMouseLeave={(e) => handleMouseLeave(e, true)}
          >
            <PlusOutlined />
          </button>
        </div>
      )
    );
  };

  const BuyNow = () => {
    return (
      <button
        type="button"
        className="inline-flex w-full items-center justify-center rounded-lg bg-accent px-12 py-3.5 text-center text-base font-bold text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-accent-600 hover:shadow-md active:scale-[0.98]"
        onClick={handleAddToCart}
      >
        Buy Now
      </button>
    );
  };

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const PickupLocation = () => {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card">
        <div className="flex items-center gap-2">
          <MapPinIcon className="h-5 w-5 text-accent" />
          <h3 className="text-sm font-bold text-primary">Pickup & Delivery</h3>
        </div>
        <ul className="mt-4 space-y-3">
          {offices.map((o) => (
            <li key={o.name} className="flex gap-3 text-sm">
              <CheckOutlined style={{ color: "#16a34a", marginTop: 4 }} />
              <span className="text-gray-600">
                <span className="block font-semibold text-primary">{o.name}</span>
                {o.address}
                <span className="mt-0.5 block font-medium text-gray-500">{o.phone}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-50 px-3 py-2.5 text-sm font-medium text-primary">
          <TruckIcon className="h-4 w-4 flex-shrink-0 text-accent" />
          Nationwide delivery available • Usually ready in 24 hours
        </div>
      </div>
    );
  };

  const CustomBreadcrumb = () => {
    return (
      <Breadcrumb separator="/">
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/products">Shop</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  // Full spec list from the product's own columns (Model, Subtype, Condition,
  // Number of Cores, Storage Type, Display Size, Graphics Card, etc.)
  const specs = getProductSpecs(product);

  return (
    <section className="bg-gray-50 py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {loading && <CarouselDetailHolder />}

        {!loading && (
          <>
            <nav className="mb-6">
              <CustomBreadcrumb />
            </nav>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Gallery */}
              <div className="lg:col-span-3">
                <div className="rounded-2xl border border-gray-100 bg-white p-3 shadow-card sm:p-4 lg:sticky lg:top-24">
                  <ProductGallery images={images} />
                </div>
              </div>

              {/* Details */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-card sm:p-6">
                  {product.product_type && (
                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                      {product.product_type}
                    </span>
                  )}

                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
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
                  </div>

                  <h1 className="mt-3 text-xl font-extrabold leading-snug text-primary sm:text-2xl lg:text-[28px]">
                    {product.name}
                  </h1>

                  {/* Price */}
                  <div className="mt-5 rounded-xl bg-primary-50 p-4">
                    <span className="text-3xl font-extrabold text-primary">
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

                  {/* Specifications — full table built from the product columns */}
                  {specs.length > 0 && (
                    <section aria-labelledby="specifications-heading" className="mt-5">
                      <h2
                        id="specifications-heading"
                        className="mb-3 text-sm font-bold text-gray-700"
                      >
                        Specifications
                      </h2>

                      {showSpecs && (
                        <dl className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
                          {specs.map((spec) => (
                            <div
                              key={spec.label}
                              className="flex flex-col-reverse gap-0.5 border-b border-gray-100 py-2.5"
                            >
                              <dt className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                                {spec.label}
                              </dt>
                              <dd className="text-sm font-semibold text-gray-900">
                                {spec.value}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}

                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setShowSpecs((prev) => !prev)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-600 transition hover:text-green-700"
                          aria-expanded={showSpecs}
                        >
                          {showSpecs ? "Hide options" : "Show options"}
                          {showSpecs ? (
                            <ChevronUpIcon className="h-4 w-4" />
                          ) : (
                            <ChevronDownIcon className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </section>
                  )}

                  {/* Description */}
                  {product.description && (
                    <div className="mt-5">
                      <p className="mb-2 text-sm font-bold text-gray-700">Description</p>
                      <div
                        className="description max-h-52 overflow-hidden leading-7 text-gray-600 hover:overflow-y-auto"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                      />
                    </div>
                  )}

                  {/* Quantity */}
                  {itemInCart.length > 0 && (
                    <div className="mt-5">
                      <p className="mb-2 text-sm font-bold text-gray-700">Quantity</p>
                      <NumberButton />
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-center text-base font-bold text-white transition-all duration-200 hover:bg-primary-500 active:scale-[0.98]"
                      onClick={
                        itemInCart.length === 0
                          ? () => addToCart(product)
                          : handleViewCart
                      }
                    >
                      {itemInCart.length > 0 ? (
                        <Link href="/checkout">View Cart</Link>
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                    <BuyNow />
                  </div>

                  {/* Trust badges */}
                  <TrustBadges
                    variant="compact"
                    className="mt-6 border-t border-gray-100 pt-5"
                  />

                  {/* Warranty */}
                  <Link
                    href="/warranty"
                    className="mt-4 flex items-center gap-3 rounded-xl border border-gray-100 bg-primary-50 px-4 py-3 transition hover:border-primary-200"
                  >
                    <ShieldCheckIcon className="h-5 w-5 flex-shrink-0 text-accent" />
                    <span className="text-sm text-gray-600">
                      <span className="font-semibold text-primary">
                        30-day warranty
                      </span>{" "}
                      on this device.{" "}
                      <span className="font-semibold text-accent underline">
                        Read our warranty policy
                      </span>
                    </span>
                  </Link>

                  {/* Share */}
                  <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                    <span className="text-sm text-gray-500">Share this product</span>
                    <ShareButton />
                  </div>
                </div>

                {/* Pickup */}
                <div className="mt-6">
                  <PickupLocation />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <ReferralBadge />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetail;