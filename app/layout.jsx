import "./globals.css";
import "antd/dist/reset.css";
// import "bootstrap/dist/css/bootstrap.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Rubik } from "next/font/google";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { Facebook } from "/app/components/Facebook";
import WhatsAppButton from "/app/components/WhatsAppButton";
import Loading from "./loading";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "#1 US used / Uk used Laptops and mobile phones",
  description:
    "We sell affordable US used / Uk used laptops | Iphones | samsungs | Apple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Loading />
        {children}
        <Facebook />
        <WhatsAppButton
          phoneNumber="2348092777906"
          message="Hello! I need a gadget"
        />

        <Footer />
      </body>
    </html>
  );
}
