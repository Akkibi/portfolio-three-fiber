import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import projectsData from "../data.json";
import { useEffect, useState, useMemo } from "react";
import Thumbnail from "./Thumbnail";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { LocationState } from "../Types";
import Navbar from "./Navbar";

const sliderLength = (mobile: boolean) => {
  return (projectsData.length - 1) * (mobile ? 1 : 2);
};
const isHomeFunction = (location: LocationState) => {
  return location.pathname.split("/")[1].length == 0;
};

const toRad = (deg: number) => {
  return (deg * Math.PI) / 180;
};

const Slider = () => {
  const [progress, setProgress] = useState(0);
  const location = useLocation();
  const isHome: boolean = useMemo(() => isHomeFunction(location), [location]);
  const isMobile = window.innerWidth < 768;
  // const isMobile = true;

  const handleScroll = (e: WheelEvent) => {
    if (!isHome) return;
    const delta = e.deltaY * 0.005;
    setProgress((prev) =>
      Math.max(Math.min(prev + delta, sliderLength(isMobile)), 0)
    );
  };

  useGSAP(() => {
    if (isHome) {
      gsap.to("#canvas", {
        backgroundColor: "#111111",
        duration: 1,
        ease: "expo.out",
      });
    }
  }, [isHome]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, true);
    return () => {
      window.removeEventListener("wheel", handleScroll, true);
    };
  });

  return (
    <>
      <Navbar progress={progress} isMobile={isMobile} isHome={isHome} />
      <div className="h-[100svh] w-full" id="canvas">
        <Canvas frameloop="demand">
          <OrthographicCamera
            makeDefault
            zoom={40}
            near={1}
            far={200}
            position={[0, 0, 100]}
          />
          <group rotation={[toRad(40), toRad(-40), 0]}>
            {[...Array(projectsData.length)].map((_, i) => (
              <Thumbnail
                key={i}
                index={i}
                progress={progress}
                setProgress={setProgress}
                isMobile={isMobile}
                isHome={isHome}
              />
            ))}
          </group>
        </Canvas>
      </div>
    </>
  );
};

export default Slider;
