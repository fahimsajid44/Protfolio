import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";    // ← add this import

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Works from "./pages/Works";
import Services from "./pages/Services";
import Journal from "./pages/Journal";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Resume from "./pages/Resume";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />    {/* ← add this line */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Works />} />
        <Route path="/services" element={<Services />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;