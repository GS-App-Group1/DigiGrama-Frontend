import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Button,
  VStack,
  useColorModeValue,
  Stack,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import FormComponent from "../components/UserApply";
import UserStatus from "../components/UserStatus";
import { useEffect, useState } from "react";
import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";

type UserHomePageProps = {
  signOut: () => void;
  username: string;
  nic: string;
};

interface ApiResponse {
  gsDivision: string;
}

const UserHomePage = ({ signOut, username, nic }: UserHomePageProps) => {
  const { getAccessToken } = useAuthContext();

  // useEffect(() => {
  //   getAccessToken()
  //     .then((accessToken) => {
  //       console.log(accessToken);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const [isLargerThan768] = useMediaQuery("(min-width: 1050px)");
  const [isApply, setIsApply] = useState(true);
  const [isStatus, setIsStatus] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [gs, setGs] = useState("");

  useEffect(() => {
    const fetchGS = async () => {
      const API_KEY: string =
        "eyJraWQiOiJnYXRld2F5X2NlcnRpZmljYXRlX2FsaWFzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJiNGI1ZGFmMC1jZThjLTRiODktODFjZC1jMmMyNjNiYzMyODBAY2FyYm9uLnN1cGVyIiwiYXVkIjoiY2hvcmVvOmRlcGxveW1lbnQ6c2FuZGJveCIsImlzcyI6Imh0dHBzOlwvXC9zdHMuY2hvcmVvLmRldjo0NDNcL2FwaVwvYW1cL3B1Ymxpc2hlclwvdjJcL2FwaXNcL2ludGVybmFsLWtleSIsImtleXR5cGUiOiJTQU5EQk9YIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOm51bGwsIm5hbWUiOiJJZGVudGl0eUFQSSAtIElkZW50aXR5QVBJIiwiY29udGV4dCI6IlwvYmZjNDNlMmItZDJjZi00NTE0LWIwZjQtZmI0OWQ5MzkxNjQzXC9jcWhnXC9pZGVudGl0eWFwaVwvaWRlbnRpdHlhcGktYjNjXC92MS4wIiwicHVibGlzaGVyIjoiY2hvcmVvX3Byb2RfYXBpbV9hZG1pbiIsInZlcnNpb24iOiJ2MS4wIiwic3Vic2NyaXB0aW9uVGllciI6bnVsbH1dLCJleHAiOjE3MDIzNTgwMDYsInRva2VuX3R5cGUiOiJJbnRlcm5hbEtleSIsImlhdCI6MTcwMjM1NzQwNiwianRpIjoiNDcyMjhjMjctMmEyMi00N2RlLTgzMWQtMjg0MGI1YTg4OGU4In0.eijyc6D68TlDe2D8kGwOFQmWbPcAeVUPnvWe8TpWYB2lNlfjYjqKCIBatemvS5d4zalLxWvjXjFD-Fnz9baHKd2h64x3wtZjhKfLKTxuH-XwuAWArgXVBFxLZPkfassRfeBA4QJs5Gw6Uuaz2EcuX873MF8Rzdk0xY03t2ij1IM-hcC7v27FkrA-ohfeN_wtpd6G4kE7LfGyJjTa-qhOSH8mCEdcnxfsAH1fR9u3glq6jP4I3hgorDAQmKptHKvXQl3cXffboteJ9kNU-JyD3Rtp4X09dh1F-MKKZCddVcOBz7WSdOy2A_kD_RbolcaN1ujxbBHjXkmegpb9jecFXvI5zHXZdlYHs8oaqzJU7jOotLiGdZ08FN0tI3dOMDSoFS3Q9r37xflqdK8GmOm0A0rybDhksSSIqxfWMvKEYvgZkS4419xgu7Z8aqmn3JpOsY9YldNR7iOZ3dw9Vs5Au2buBo_q8jEepdXfu2LBrwi1D27akXjDVHNAozaPfNJYSZN_Iq_1qsHkWPj3QcN55So7WuLe_7QwYD6AfYyS9AqQaZ8ySf5bbj59NP7d3lpJLAiwyO_Ww3VJJj9F4SVD4zmD7n6uZijHi5j1oINCFp6LaHnyQfhiip4QuyWLvyggjxwBPJSFkbB1z8V2TSgfyDvIvh7sEe6GzR9vuPAHYys";
      const url: string =
        "https://bfc43e2b-d2cf-4514-b0f4-fb49d9391643-dev.e1-us-east-azure.choreoapis.dev/cqhg/identityapi/identityapi-b3c/v1.0/getIdentityFromNIC/";

      try {
        const response = await axios.get<ApiResponse[]>(url, {
          headers: {
            accept: "application/json",
            "API-Key": API_KEY,
          },
          params: {
            nic: nic,
          },
        });
        setGs(response.data[0]?.gsDivision || "Not Found");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchGS();
  }, [nic]);

  const handleApply = () => {
    setIsApply(true);
    setIsStatus(false);
    setIsHelp(false);
  };

  const handleStatus = () => {
    setIsApply(false);
    setIsStatus(true);
    setIsHelp(false);
  };

  const handleHelp = () => {
    setIsApply(false);
    setIsStatus(false);
    setIsHelp(true);
  };

  return (
    <Flex direction="column" minH="100vh">
      {/* Header */}
      <Flex
        as="header"
        width="full"
        align="center"
        justifyContent="space-between"
        p={4}
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.200", "gray.900")}
      >
        <Stack direction={"row"} spacing={1} justify="center">
          <Image
            src="src/assets/crop-1567050825830.png"
            alt="DigiGrama Logo"
            htmlWidth="50px"
          />
          <Heading as="h1" size="lg" marginTop={1.5}>
            DigiGrama
          </Heading>
        </Stack>
        <Popover>
          <PopoverTrigger>
            <Box
              marginRight={5}
              borderRadius="full"
              border="2px"
              borderColor="black"
              display="flex"
              alignItems="center"
              justifyContent="center"
              padding={2}
              cursor="pointer"
            >
              <FaUser size="1.5em" />
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader>
                <b>{username}</b>
              </PopoverHeader>
              <PopoverBody>
                {/* Add your user details here */}
                <Text>
                  <b>NIC: </b>
                  {nic}
                </Text>
                <Text marginBottom={2}>
                  <b>GS Division: </b>
                  {gs}
                </Text>
                <Button
                  colorScheme="red"
                  _focus={{
                    outline: "none",
                  }}
                  onClick={signOut}
                >
                  Logout
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Flex>

      {/* Content Area */}
      <Flex
        direction={isLargerThan768 ? "row" : "column"} // Change Flex direction based on screen width
      >
        {/* Requests */}
        <Box display="flex" flex={1} justifyContent="center">
          <Box borderRadius={30}>
            <Box
              display="flex"
              flex={1}
              borderRadius={20}
              padding={10}
              shadow="xl"
              transform="scale(0.9)"
              _hover={{ transform: "scale(0.9)" }}
            >
              <VStack spacing={16} align="stretch">
                <Box position="relative" paddingLeft="25%">
                  <h1>
                    <b>Welcome</b>
                  </h1>
                </Box>
                <Button
                  size="lg"
                  colorScheme="green"
                  fontSize="xx-large"
                  padding={9}
                  borderRadius={15}
                  onClick={handleApply}
                  boxShadow={isApply ? "0 0 20px #29C53F" : "none"}
                  _focus={{
                    outline: "none",
                  }}
                >
                  Apply for grama certificate
                </Button>
                <Button
                  size="lg"
                  colorScheme="green"
                  fontSize="xx-large"
                  padding={9}
                  borderRadius={15}
                  onClick={handleStatus}
                  boxShadow={isStatus ? "0 0 20px #29C53F" : "none"}
                  _focus={{
                    outline: "none",
                  }}
                >
                  Check status
                </Button>
                <Button
                  size="lg"
                  colorScheme="green"
                  fontSize="xx-large"
                  padding={9}
                  borderRadius={15}
                  onClick={handleHelp}
                  boxShadow={isHelp ? "0 0 20px #29C53F" : "none"}
                  _focus={{
                    outline: "none",
                  }}
                >
                  Get Help
                </Button>
              </VStack>
            </Box>
          </Box>
        </Box>

        {/* Conditionally render FormComponent based on screen width */}
        <Box
          flex={2}
          paddingRight={4}
          transform="scale(0.95)"
          _hover={{ transform: "scale(0.95)" }}
        >
          {isApply ? (
            <FormComponent isMobile={!isLargerThan768} />
          ) : (
            <UserStatus isMobile={!isLargerThan768} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserHomePage;
