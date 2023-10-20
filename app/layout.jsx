import "./globals.css";
import "antd/dist/reset.css";
// import "bootstrap/dist/css/bootstrap.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Rubik } from "next/font/google";

// components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "#1 UK used Laptops and mobile phones",
  description:
    "We sell affordable uk used laptops | Iphones | samsungs | Apple",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="google-site-verification"
          content="4Zkz1j8swUUwJUJrRx2wsqs4YwJy6ru1Xb-9WmFnjek"
        />
        {/* Google Tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0GV6L3CK6F"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-0GV6L3CK6F');
            `,
          }}
        />
      </Head>
      <body className={rubik.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
