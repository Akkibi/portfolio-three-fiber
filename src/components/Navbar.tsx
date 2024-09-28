import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="absolute z-10 flex gap-5 p-5 w-full justify-center ">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/elios-os">Projects</Link>
    </nav>
  );
};

export default Navbar;
