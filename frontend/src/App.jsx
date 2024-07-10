import { useEffect } from "react";
import "./App.css";
import AOS from "aos";
import Hero from "./components/Hero";

import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
}

export default App;
