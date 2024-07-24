import { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import Hero from "./components/Hero";
import Item from "./components/item/Item";

import "aos/dist/aos.css";
import Newsletter from "./components/newsletter/Newsletter";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <>
      <div>
        <Hero />
      </div>
      <div>
        <Item />
      </div>
      <div>
        <Newsletter />
      </div>
    </>
  );
}

export default App;
