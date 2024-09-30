import { useRef, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useThree } from "@react-three/fiber";
import projectsData from "../data.json";
import { useNavigate, useLocation } from "react-router-dom";

interface ThumbnailProps {
  index: number;
  progress: number;
  setProgress: (progress: number) => void;
  isMobile: boolean;
  isHome: boolean;
}

const progressPosition = (progress: number) => {
  return Math.atan(progress) * 8 + progress * 0.5;
};

const progressScale = (progress: number) => {
  return Math.atan(-1 * progress ** 2) * 0.5 + 2.5;
};

const isOpenFunction = (location, name: string) => {
  return location.pathname.split("/")[1] == name;
};

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
      gsap.set(planeRef.current.position, {
        z: progressPosition(progress - index * (isMobile ? 1 : 2)),
      });
    } else {
      gsap.set(planeRef.current.position, {
        z: progressPosition(-1 * index * (isMobile ? 1 : 2)),
      });
      console.log("first load", isOpen, index);
    }
    gsap.set(planeRef.current.scale, {
      x: 3 * progressScale(progress - index * (isMobile ? 1 : 2)),
      y: 2.5 * progressScale(progress - index * (isMobile ? 1 : 2)),
    });
  }, []);

  useGSAP(() => {
    if (!isHome) return;
    gsap.to(planeRef.current.position, {
      onUpdate: () => {
        invalidate();
      },
      z: progressPosition(progress - index * (isMobile ? 1 : 2)),
      duration: 1,
      ease: "expo.out",
    });
    if (isOpen) return;
    gsap.to(planeRef.current.scale, {
      onUpdate: () => {
        invalidate();
      },
      x: 3 * progressScale(progress - index * (isMobile ? 1 : 2)),
      y: 2.5 * progressScale(progress - index * (isMobile ? 1 : 2)),
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
  }, [progress, isHome]);

  useGSAP(() => {
    if (isHome) return;
    gsap.to(planeRef.current.position, {
      onUpdate: () => {
        invalidate();
      },
      z: progressPosition(progress - index * (isMobile ? 1 : 2)),
      duration: 1,
      ease: "expo.out",
    });
    if (!isOpen) {
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
      console.log("isfired2", isOpen, index);
      gsap.to(planeRef.current.rotation, {
        x: -0.8308799419382282,
        y: 0.5148495139047413,
        z: 0.4946398262521617,
        duration: 1,
        ease: "expo.out",
      });
      gsap.to(planeRef.current.scale, {
        onUpdate: () => {
          invalidate();
        },
        x: viewport.width,
        y: viewport.height,
        duration: 1,
        ease: "expo.out",
      });
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
      <meshBasicMaterial color={`hsl(${index * 10},100%,50%)`} />
    </mesh>
  );
};

export default Thumbnail;
