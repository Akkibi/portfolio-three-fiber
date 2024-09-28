import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import Redirection from "./components/Redirection";

function App() {
  return (
    <Router>
      <Navbar />
      <Slider />
      <Routes>
        <Route path="/*" element={<Redirection />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
