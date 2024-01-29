import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  Stack,
  Center,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
// import AuthenticationForm from "../components/AuthenticationForm";
import { FaCheckCircle } from "react-icons/fa";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Define the document content
// const documentDefinition = {
//   content: [
//     "This is an example text for the PDF.", // Replace this with your text
//   ],
// };

type AuthPageProps = {
  signIn: () => void;
};

const AuthPage = ({ signIn }: AuthPageProps) => {
  // const [isLargerThan768] = useMediaQuery("(min-width: 1050px)");
  // const scale = isLargerThan768 ? "scale(0.9)" : "scale(1.5)";
  // const rightMargin = isLargerThan768 ? "7%" : "0%";

  return (
    <Box bgGradient="linear(to-tl, #189972, #ffffff)">
      <Flex
        as="header"
        align="center"
        justifyContent="space-between"
        p={4}
        bg="transparent"
        borderColor="transparent"
        position="relative"
      >
        <Stack direction={"row"} spacing={1} justify="center">
          <Image
            src="src/assets/crop-1567050825830.png" // Replace with the path to your logo image
            alt="DigiGrama Logo"
            htmlWidth="50px" // Adjust size as needed
          />
          <Heading as="h1" size="lg" marginTop={1.5}>
            DigiGrama
          </Heading>
        </Stack>
      </Flex>
      <Center height="calc(100vh - 82px)" transform={"scale(0.8)"}>
        {" "}
        {/* Subtract the header height */}
        <Center
          paddingX="10%"
          paddingY="2%"
          bgGradient="linear(to-br, #ffffff, #78fff6)"
          borderRadius={30}
          boxShadow="20px 20px 80px rgba(0, 210, 200, 0.4)" // This creates a glow effect
        >
          <VStack spacing={2}>
            <Text fontSize="6xl">
              <b> - W E L C O M E - </b>
            </Text>
            <Box
              border="2px" // Thickness of the border
              borderColor="rgba(0, 200, 200, 0)" // Color of the border
              borderRadius={29} // Border radius to make the corners rounded
              padding={5}
            >
              <VStack spacing={0.1}>
                <Text fontSize="4xl">
                  <b>Get your Grama Certificate</b>
                </Text>
                <Text
                  fontSize="3xl"
                  color={useColorModeValue("green.600", "white")}
                >
                  <b>Without any Hassle</b>
                </Text>
              </VStack>
            </Box>
            <Box
              width="200px"
              height="150px"
              overflow="hidden"
              position="relative"
              transform="scale(1.8)"
              margin={20}
            >
              <Image
                src="src/assets/interview.png"
                alt="Authentication"
                objectFit="cover"
                width="100%"
                height="100%"
                position="absolute"
                top="50%" // Adjust the positioning as needed
                left="50%" // Adjust the positioning as needed
                transform="translate(-50%, -50%)" // Centers the image within the Box
              />
            </Box>
            <Button
              size="lg"
              onClick={() => {
                signIn();
                // pdfMake.createPdf(documentDefinition).download("example.pdf");
              }}
              rightIcon={<FaCheckCircle />}
              margin={5}
              paddingX="32px"
              paddingY="8px"
              fontSize="2xl"
              bgGradient="linear(to-r, green.400, teal.500)" // Applying the gradient
              color="white" // Text color for better contrast
              _hover={{
                bgGradient: "linear(to-r, green.500, teal.600)", // Gradient on hover for a slight effect
              }}
              _active={{
                bgGradient: "linear(to-r, green.600, teal.700)", // Gradient when the button is clicked
              }}
              boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.2), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)" // Optional: adding shadow for depth
            >
              Sign In
            </Button>
          </VStack>
        </Center>
      </Center>
    </Box>
  );
};

export default AuthPage;
