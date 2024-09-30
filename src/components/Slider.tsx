import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import projectsData from "../data.json";
import { useEffect, useState, useRef, useMemo } from "react";
import { Plane } from "three";
import Thumbnail from "./Thumbnail";
import { useLocation } from "react-router-dom";

const toRad = (deg: number) => (deg * Math.PI) / 180.0;

const sliderLength = (mobile: boolean) => {
  return (projectsData.length - 1) * (mobile ? 1 : 2);
};
const isHomeFunction = (location) => {
  console.log("update");
  return location.pathname.split("/")[1].length == 0;
};

const Slider = () => {
  const location = useLocation();
  const isHome: boolean = useMemo(() => isHomeFunction(location), [location]);

  const isMobile = window.innerWidth < 768;
  const [progress, setProgress] = useState(0);

  const handleScroll = (e: WheelEvent) => {
    if (!isHome) return;
    const delta = e.deltaY * 0.003;
    setProgress((prev) =>
      Math.max(Math.min(prev + delta, sliderLength(isMobile)), 0)
    );
  };

  useEffect(() => {}, [isHome]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, true);
    return () => {
      window.removeEventListener("wheel", handleScroll, true);
    };
  });

  return (
    <div className="h-screen w-full" id="canvas">
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
  );
};

export default Slider;
