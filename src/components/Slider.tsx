import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import projectsData from "../data.json";
import { ProjectType } from "../Types";
import { useEffect, useState } from "react";
const rad = (deg: number) => (deg * Math.PI) / 180.0;

const progressPosition = (progress: number) => {
  return Math.atan(progress) * 8 + progress * 0.5;
  // if (progress < -2.18) {
  //   return progress * 0.5 - 12;
  // } else if (progress < 2.18) {
  //   return progress * 6;
  // } else {
  //   return progress * 0.5 + 12;
  // }
};

const progressScale = (progress: number) => {
  return Math.atan(-1 * progress ** 2) * 0.5 + 2.5;
};

const Slider = () => {
  const mobile = window.innerWidth < 768;
  const [progress, setProgress] = useState(0);
  console.log(progress, projectsData.length);

  // on scroll event increase or decrease progress
  const handleScroll = (e: WheelEvent) => {
    const delta = e.deltaY * 0.001;
    setProgress((prev) => prev + delta);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll, true);
    return () => {
      window.removeEventListener("wheel", handleScroll, true);
    };
  }, []);

  return (
    <div className="h-screen w-full">
      <Canvas frameloop="demand">
        <OrthographicCamera
          makeDefault
          zoom={40}
          near={1}
          far={200}
          position={[0, 0, 100]}
        />
        <group rotation={[rad(40), rad(-40), 0]}>
          {[...Array(projectsData.length)].map((_, i) => (
            <mesh
              key={i}
              position={[
                0,
                0,
                progressPosition(progress - i * (mobile ? 1 : 2)),
              ]}
              scale={[
                3 * progressScale(progress - i * (mobile ? 1 : 2)),
                2.5 * progressScale(progress - i * (mobile ? 1 : 2)),
                1,
              ]}
            >
              <planeGeometry />
              <meshBasicMaterial color={`hsl(${i * 10},100%,50%)`} />
            </mesh>
          ))}
        </group>
      </Canvas>
    </div>
  );
};

export default Slider;
