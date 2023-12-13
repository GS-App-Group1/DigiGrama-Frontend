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
// import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";
import { gsDivisionData } from "../data/api";

type UserHomePageProps = {
  signOut: () => void;
  username: string;
  nic: string;
};

const UserHomePage = ({ signOut, username, nic }: UserHomePageProps) => {
  // const { getAccessToken } = useAuthContext();

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
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [civilStatus, setCivilStatus] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchGS = async () => {
      const API_KEY: string = gsDivisionData.key;
      const url: string = gsDivisionData.url;

      try {
        const response = await axios.get<string>(url, {
          headers: {
            accept: "application/json",
            "API-Key": API_KEY,
          },
          params: {
            nic: nic,
          },
        });
        setGs(response.data || "Not Found");
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
            <FormComponent
              isMobile={!isLargerThan768}
              nic={nic}
              gsDivision={gs}
              address={address}
              setAddress={setAddress}
              occupation={occupation}
              setOccupation={setOccupation}
              civilStatus={civilStatus}
              setCivilStatus={setCivilStatus}
              reason={reason}
              setReason={setReason}
            />
          ) : (
            <UserStatus isMobile={!isLargerThan768} />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default UserHomePage;
