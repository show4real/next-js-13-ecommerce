import "./globals.css";
import "antd/dist/reset.css";
// import "bootstrap/dist/css/bootstrap.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Rubik } from "next/font/google";

// components
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "#1 UK laptop sales",
  description: "We sell affordable uk used laptops and Iphones",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
