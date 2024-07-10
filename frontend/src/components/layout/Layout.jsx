import Footer from "./Footer";
import Navbar from "./Navbar";

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
