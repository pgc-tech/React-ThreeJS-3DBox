import "./App.css";
import {
  Box,
  IconButton,
  Heading,
  Grid,
  FormLabel,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import React, { useState, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { AddIcon } from "@chakra-ui/icons";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import Header from "./components/Header";
import InputBox from "./components/InputBox";

export default function App() {
  const [box, setBox] = useState([]);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [positionX, setPositionX] = useState("");
  const [positionY, setPositionY] = useState("");
  const [positionZ, setPositionZ] = useState("");
  const positionXInput = (e) => {
    setPositionX(e.target.value);
  };
  const positionYInput = (e) => {
    setPositionY(e.target.value);
  };
  const positionZInput = (e) => {
    setPositionZ(e.target.value);
  };
  const heightInput = (e) => {
    setHeight(e.target.value);
  };
  const widthInput = (e) => {
    setWidth(e.target.value);
  };
  const lengthInput = (e) => {
    setLength(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    addBox(
      Number(height, width, length, positionX, positionY, positionZ),
    );
    setHeight("");
    setWidth("");
    setLength("");
    setPositionX("");
    setPositionY("");
    setPositionZ("");
  };

  const NewBox = (props) => {
    const [colorMap, normalMap, roughnessMap] = useLoader(TextureLoader, [
      "../src/assets/Wood066_1K_Color.jpg",
      "../src/assets/Wood066_1K_NormalGL.jpg",
      "../src/assets/Wood066_1K_Roughness.jpg",
    ]);

    return (
      <mesh {...props}>
        <boxBufferGeometry attach="geometry" args={[height, width, length]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
        />
      </mesh>
    );
  };

  const addBox = (e) => {
    const boxCount = box.length;
    setBox([
      ...box,
      <NewBox
        key={boxCount}
        position={[positionX, positionY, positionZ]}
        dimension={[height, width, length]}
      />,
    ]);
  };

  return (
    <div className="App">
      <Header />
      <div className="Canvas">
        <Canvas style={{ background: "#2B2E33" }}>
          <Suspense fallback={null}>
            <gridHelper args={[20, 20]} />
            <OrbitControls />
            <ambientLight intensity={0.6} />
            <pointLight intensity={1.0} position={[1, 1, 1]} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            {[...box]}
          </Suspense>
        </Canvas>
      </div>
      <div className="Footer">
        <form onSubmit={handleSubmit}>
          <Box
            width="400px"
            borderWidth="2px"
            borderColor="gray.400"
            borderRadius="lg"
            p="3"
          >
            <Box pb="4">
              <Heading size="lg">Add 3D Box</Heading>
            </Box>

            <Grid
              pl="2"
              h="70px"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(5, 1fr)"
              gap={5}
            >
              <GridItem colSpan={2}>
                <FormLabel htmlFor="email">Dimension:</FormLabel>
                <SimpleGrid columns={3} spacing={1}>
                  <InputBox
                    placeholder="H"
                    value={height}
                    valueInput={heightInput}
                  />
                  <InputBox
                    placeholder="W"
                    value={width}
                    valueInput={widthInput}
                  />
                  <InputBox
                    placeholder="L"
                    value={length}
                    valueInput={lengthInput}
                  />
                </SimpleGrid>
              </GridItem>
              <GridItem colSpan={2}>
                <FormLabel htmlFor="email">Position:</FormLabel>
                <SimpleGrid columns={3} spacing={1}>
                  <InputBox
                    placeholder="X"
                    value={positionX}
                    valueInput={positionXInput}
                  />
                  <InputBox
                    placeholder="Y"
                    value={positionY}
                    valueInput={positionYInput}
                  />
                  <InputBox
                    placeholder="Z"
                    value={positionZ}
                    valueInput={positionZInput}
                  />
                </SimpleGrid>
              </GridItem>
              <GridItem rowSpan={2} colSpan={1}>
                <IconButton
                  type="submit"
                  colorScheme="blue"
                  icon={<AddIcon />}
                />
              </GridItem>
            </Grid>
          </Box>
        </form>
      </div>
    </div>
  );
}
