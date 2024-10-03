import { Texture, Vector2 } from "three";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import imageCoverVertexShader from "./shaders/vertex.glsl";
import imageCoverFragmentShader from "./shaders/fragment.glsl";
import { Suspense, useEffect, useMemo } from "react";
import { useRef } from "react";

const calculateScaleFactors = (texture: Texture, containerSize: Vector2) => {
  const containerAspectRatio = containerSize.x / containerSize.y;
  const imageAspectRatio = texture.image.width / texture.image.height;
  //   console.log("containerAspectRatio", containerAspectRatio);
  //   console.log("imageAspectRatio", imageAspectRatio);
  let scaleFactorX = 1;
  let scaleFactorY = 1;

  const landscapeFactor = imageAspectRatio / containerAspectRatio;
  const portraitFactor = containerAspectRatio / imageAspectRatio;

  const isLandscapeModeContainer = containerAspectRatio >= 1;
  const isContainerRatioStronger = containerAspectRatio >= imageAspectRatio;
  //   console.log("isContainerRatioStronger", isContainerRatioStronger);
  //   console.log("isLandscapeModeContainer", isLandscapeModeContainer);
  if (isContainerRatioStronger) {
    scaleFactorX = isLandscapeModeContainer
      ? 1 / landscapeFactor
      : portraitFactor;
  } else {
    scaleFactorY = isLandscapeModeContainer
      ? 1 / landscapeFactor
      : portraitFactor;
  }

  return { scaleFactorX, scaleFactorY };
};

interface ThumbNailShaderProps {
  name: string;
  grayscale: number;
  planeScale: { x: number; y: number };
}

const ThumbNailShader: React.FC<ThumbNailShaderProps> = ({
  name,
  grayscale,
  planeScale,
}) => {
  const shaderMaterial = useRef<THREE.ShaderMaterial>(null!);
  const texture = useLoader(
    THREE.TextureLoader,
    `/assets/${name}/thumbnail.png`
  );

  const { scaleFactorX, scaleFactorY } = useMemo(
    () =>
      calculateScaleFactors(texture, new Vector2(planeScale.x, planeScale.y)),
    [texture, planeScale]
  );

  //   console.log("scaleFactorX", scaleFactorX, "scaleFactorY", scaleFactorY);

  const uniforms = useMemo(
    () => ({
      uGrayscale: {
        value: grayscale,
      },
      uTexture: {
        value: texture,
      },
      uScaleFactorX: {
        value: scaleFactorY,
      },
      uScaleFactorY: {
        value: scaleFactorX,
      },
    }),
    []
  );

  useEffect(() => {
    shaderMaterial.current.uniforms.uGrayscale.value = grayscale;
  }, [grayscale, shaderMaterial]);

  return (
    <Suspense fallback={null}>
      <shaderMaterial
        ref={shaderMaterial}
        vertexShader={imageCoverVertexShader}
        fragmentShader={imageCoverFragmentShader}
        uniforms={uniforms}
      />
    </Suspense>
  );
};

export default ThumbNailShader;
