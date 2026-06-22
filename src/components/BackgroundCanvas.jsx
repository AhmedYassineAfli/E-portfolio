import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";

function SparkleBackground({ color }) {
  const ref = useRef();
  const { size, camera } = useThree();
  const count = 1500;

  // Mouse tracking state
  const [mouse, setMouse] = useState(new THREE.Vector2());

  const baseColor = new THREE.Color(color);
  const hoverColor = new THREE.Color("white");

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      sizes[i] = 0.12;
      baseColor.toArray(colors, i * 3);
    }

    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
    return geo;
  }, [count, color]);

  useFrame((state, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.05;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const pos = geometry.attributes.position;
    const size = geometry.attributes.size;
    const colorAttr = geometry.attributes.customColor;

    for (let i = 0; i < count; i++) {
      const point = new THREE.Vector3(
        pos.array[i * 3],
        pos.array[i * 3 + 1],
        pos.array[i * 3 + 2]
      );

      const distance = camera.position.distanceTo(point);
      const projected = point.clone().project(camera);
      const screenX = projected.x;
      const screenY = projected.y;

      const dx = screenX - mouse.x;
      const dy = screenY - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const isHovered = dist < 0.15;

      // Size interpolation
      const newSize = THREE.MathUtils.lerp(
        size.array[i],
        isHovered ? 0.4 : 0.12,
        0.1
      );
      size.array[i] = newSize;

      // Color interpolation
      const current = new THREE.Color(
        colorAttr.array[i * 3],
        colorAttr.array[i * 3 + 1],
        colorAttr.array[i * 3 + 2]
      );
      const target = isHovered ? hoverColor : baseColor;
      current.lerp(target, 0.1).toArray(colorAttr.array, i * 3);
    }

    size.needsUpdate = true;
    colorAttr.needsUpdate = true;
  });

  const handleMouseMove = (event) => {
    const x = (event.clientX / size.width) * 2 - 1;
    const y = -(event.clientY / size.height) * 2 + 1;
    setMouse(new THREE.Vector2(x, y));
  };

  useEffect(() => {
    window.addEventListener("pointermove", handleMouseMove);
    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, [size]);

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        vertexShader={`
          attribute float size;
          attribute vec3 customColor;
          varying vec3 vColor;
          void main() {
            vColor = customColor;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            gl_FragColor = vec4(vColor, 1.0);
          }
        `}
        transparent
        depthWrite={false}
      />
    </points>
  );
}

export default function BackgroundCanvas({ currentSection }) {
  const colorMap = {
    home: "#CC00CC",
    projects: "#2FFB07",
    skills: "#FFD700",
    contact: "#4FBCF8",
  };

  const color = colorMap[currentSection] || "#ffffff";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <SparkleBackground color={color} />
      </Canvas>
    </div>
  );
}
