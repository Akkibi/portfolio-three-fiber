import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "Akira à propos";
  }, []);
  return (
    <div>
      <h1>About</h1>
    </div>
  );
};

export default About;
