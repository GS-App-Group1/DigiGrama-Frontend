import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  useColorModeValue,
  VStack,
  Stack,
  useMediaQuery,
  Button,
  HStack,
  Icon,
} from "@chakra-ui/react";
// import AuthenticationForm from "../components/AuthenticationForm";
import { FaCheckCircle } from "react-icons/fa";

type AuthPageProps = {
  signIn: () => void;
};

const AuthPage = ({ signIn }: AuthPageProps) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 1050px)");
  const scale = isLargerThan768 ? "scale(0.9)" : "scale(1.5)";
  const rightMargin = isLargerThan768 ? "7%" : "0%";

  return (
    <Box minH={isLargerThan768 ? "100vh" : "100vh"}>
      <Flex
        as="header"
        width="full"
        align="center"
        justifyContent="space-between"
        p={4}
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        position="relative"
      >
        <Stack direction={"row"} spacing={1} justify="center">
          <Image
            src="src\assets\crop-1567050825830.png" // Replace with the path to your logo image
            alt="DigiGrama Logo"
            htmlWidth="50px" // Adjust size as needed
          />
          <Heading as="h1" size="lg" marginTop={1.5}>
            DigiGrama
          </Heading>
        </Stack>
      </Flex>

      <Flex
        direction={isLargerThan768 ? "row" : "column"}
        minHeight="70vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <VStack flex={1} justifyContent="center" p={4}>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            lineHeight="shorter"
            color={useColorModeValue("gray.500", "white")}
            textAlign="center"
          >
            Get your Grama Sevaka Certificate
          </Text>
          <Text
            fontSize="5xl"
            fontWeight="bold"
            lineHeight="shorter"
            color={useColorModeValue("gray.700", "white")}
            textAlign="center"
          >
            Without Any Hassle
          </Text>
          <Image
            src="src\assets\interview.png" // Make sure this path is correct
            alt="DigiGrama Branding"
            boxSize="410px"
            objectFit="contain"
          />
        </VStack>
        <Box
          px={1}
          width="full"
          flex={1}
          maxWidth="700px"
          borderRadius={20}
          textAlign="center"
          marginRight={rightMargin}
          marginBottom="3%"
          marginTop={isLargerThan768 ? "5%" : "15%"}
          transform={scale}
          _hover={{ transform: scale }}
        >
          <Box paddingLeft="7%" transform={"scale(1.3)"}>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              lineHeight="shorter"
              color={useColorModeValue("gray.500", "white")}
              textAlign="center"
            >
              Recieve your Grama Sevaka Certificate
            </Text>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              lineHeight="shorter"
              color={useColorModeValue("gray.700", "white")}
              textAlign="center"
            >
              At the comfort of your Home
            </Text>
            <VStack
              margin={10}
              paddingLeft="14%"
              spacing={5}
              alignItems="flex-start"
            >
              <HStack>
                <Icon
                  as={FaCheckCircle}
                  color="green.500"
                  boxSize={8}
                  margin={2}
                />
                <Text fontSize={30}>
                  <b>Convenient Access</b>
                </Text>
              </HStack>
              <HStack>
                <Icon
                  as={FaCheckCircle}
                  color="green.500"
                  boxSize={8}
                  margin={2}
                />
                <Text fontSize={30}>
                  <b>Faster Service</b>
                </Text>
              </HStack>
              <HStack>
                <Icon
                  as={FaCheckCircle}
                  color="green.500"
                  boxSize={8}
                  margin={2}
                />
                <Text fontSize={30}>
                  <b>Get Help Anytime</b>
                </Text>
              </HStack>
            </VStack>
          </Box>
          <Button
            colorScheme="green"
            onClick={() => signIn()}
            fontSize="5xl"
            padding={10}
            margin={10}
            marginLeft="13%"
            marginTop="8%"
            borderRadius={20}
          >
            Sign In
          </Button>
          {/* <AuthenticationForm signIn={signIn} /> */}
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthPage;
