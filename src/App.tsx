import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import ProjectPage from "./components/ProjectPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Slider />
      <Routes>
        <Route path="/*" element={<ProjectPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
