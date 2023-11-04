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
import Loading from "./loading";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "#1 UK used Laptops and mobile phones",
  description:
    "We sell affordable uk used laptops | Iphones | samsungs | Apple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <Loading />
        {children}
        <Facebook />
        <Footer />
      </body>
    </html>
  );
}
