import { useRef, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import projectsData from "../data.json";
import { useNavigate, useLocation } from "react-router-dom";
import ThumbNailShader from "./ThumbnailShader";
import { progressScale, progressPosition, isOpenFunction } from "./Utils";
interface ThumbnailProps {
  index: number;
  progress: number;
  setProgress: (progress: number) => void;
  isMobile: boolean;
  isHome: boolean;
}

const Thumbnail: React.FC<ThumbnailProps> = ({
  index,
  progress,
  setProgress,
  isMobile,
  isHome,
}) => {
  const location = useLocation();
  const isOpen: boolean = useMemo(
    () => isOpenFunction(location, projectsData[index].name),
    [location, index]
  );
  const viewport = useThree((state) => state.viewport);

  const navigate = useNavigate();
  const planeRef = useRef<THREE.Mesh>(null!);
  const { invalidate } = useThree();

  useGSAP(() => {
    if (isHome) {
      //to kill the initial stutter
      invalidate();
      gsap.set(planeRef.current.position, {
        z: progressPosition(progress - index * (isMobile ? 1 : 2)),
      });
    } else {
      gsap.set(planeRef.current.position, {
        z: progressPosition(-1 * index * (isMobile ? 1 : 2)),
      });
      // console.log("first load", isOpen, index);
    }
    gsap.set(planeRef.current.scale, {
      x:
        window.innerHeight *
        0.004 *
        progressScale(progress - index * (isMobile ? 1 : 2)),
      y:
        window.innerHeight *
        0.004 *
        progressScale(progress - index * (isMobile ? 1 : 2)),
    });
  }, []);

  useGSAP(() => {
    gsap.to(planeRef.current.position, {
      onUpdate: () => {
        invalidate();
      },
      z: progressPosition(progress - index * (isMobile ? 1 : 2)),
      duration: 1,
      ease: "expo.out",
    });
    if (!isHome) return;
    if (!isOpen) {
      gsap.to(planeRef.current.scale, {
        onUpdate: () => {
          invalidate();
        },
        x:
          window.innerHeight *
          0.004 *
          progressScale(progress - index * (isMobile ? 1 : 2)),
        y:
          window.innerHeight *
          0.004 *
          progressScale(progress - index * (isMobile ? 1 : 2)),
        duration: 1,
        ease: "expo.out",
      });
      gsap.to(planeRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "expo.out",
      });
    } else {
      gsap.to(planeRef.current.scale, {
        onUpdate: () => {
          invalidate();
        },
        x: 0,
        y: 0,
        duration: 1,
        ease: "expo.out",
      });
    }
  }, [progress, isHome]);

  useGSAP(() => {
    if (isHome) return;
    // console.log("scale?", isOpen, index);
    if (!isOpen) {
      // console.log("no, ok :", isOpen, index);
      gsap.to(planeRef.current.scale, {
        onUpdate: () => {
          invalidate();
        },
        x: 0,
        y: 0,
        duration: 1,
        ease: "expo.out",
      });
      gsap.to(planeRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: "expo.out",
      });
    } else {
      setProgress(index * (isMobile ? 1 : 2));
      console.log("rotatetocam", isOpen, index);
      gsap.to(planeRef.current.rotation, {
        onUpdate: () => {
          invalidate();
        },
        x: -0.8308799419382282,
        y: 0.5148495139047413,
        z: 0.4946398262521617,
        duration: 1,
        ease: "expo.out",
      });
      gsap.to(planeRef.current.scale, {
        x: isMobile ? viewport.width - 1 : viewport.width - 3,
        y: isMobile ? viewport.width - 1 : viewport.height - 3,
        duration: 1,
        ease: "expo.out",
      });
      gsap.to("#canvas", {
        backgroundColor: projectsData[index].colors[1],
        duration: 1,
        ease: "expo.out",
      });
      // console.log("viewport", viewport.width, viewport.height);
    }
  }, [isOpen, viewport]);

  return (
    <mesh
      key={index}
      ref={planeRef}
      onClick={(e) => {
        // setProgress(index * (isMobile ? 1 : 2));
        e.stopPropagation();
        navigate(`/${e.eventObject.name}`);
      }}
      name={projectsData[index].name}
    >
      <planeGeometry />
      {/* <meshBasicMaterial attach="material" toneMapped={false} /> */}
      <ThumbNailShader
        index={index}
        planeScale={{
          x: isMobile ? viewport.width - 1 : viewport.width - 3,
          y: isMobile ? viewport.width - 1 : viewport.height - 3,
        }}
      />
      {/* <meshBasicMaterial color={`hsl(${index * 10},100%,50%)`} /> */}
    </mesh>
  );
};

export default Thumbnail;
