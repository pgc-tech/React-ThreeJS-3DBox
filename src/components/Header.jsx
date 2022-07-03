import { Box, Image, Heading, Flex } from "@chakra-ui/react";
import "../App.css";
import ReactLogo from "../assets/ReactLogo.png";

const Header = () => {
  return (
    <div className="Header">
      <Box padding="6">
        <Flex>
          <Box width="45px" pr="2">
            <Image src={ReactLogo} />
          </Box>
          <Heading as="h1" size="lg">
            React-ThreeJS
          </Heading>
        </Flex>
      </Box>
    </div>
  );
};

export default Header;
