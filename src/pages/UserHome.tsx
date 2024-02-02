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
import {
  FaUser,
  FaHandsHelping,
  FaSearch,
  FaCertificate,
} from "react-icons/fa";
import FormComponent from "../components/UserApply";
import UserStatus from "../components/UserStatus";
import { useEffect, useState } from "react";
// import { useAuthContext } from "@asgardeo/auth-react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { identityAPI, mainAPI } from "../data/api";
import iconImage from "../assets/baseIcon.png";
import { nicImageAPI } from "../data/api";

type UserHomePageProps = {
  token: string;
  signOut: () => void;
  username: string;
  nic: string;
  email: string;
};

interface UserRequest {
  _id: string;
  nic: string;
  address: string;
  civilStatus: string;
  presentOccupation: string;
  reason: string;
  gsNote: string;
  gsDivision: string;
  requestTime: string;
  status: string;
}

// If your response is an array of these objects:
type UserRequestResponse = UserRequest[];

const fetchUserRequestForNIC = async (
  nic: string,
  email: string,
  token: string
): Promise<UserRequestResponse> => {
  const API_URL = mainAPI.urls.getRequestForNIC;
  const API_KEY = token;

  try {
    const response = await axios.get<UserRequestResponse>(
      `${API_URL}?nic=${nic}&email=${email}`, // Added email as a query parameter
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data; // This will be an array of UserRequest objects
  } catch (error) {
    console.error("Error fetching user request data:", error);
    throw error; // Rethrow the error for handling in calling code
  }
};

type formData = {
  address: string;
  occupation: string;
  civilStatus: string;
  reason: string;
  gsNote: string;
  status: string;
};

const UserHomePage = ({
  signOut,
  username,
  nic,
  email,
  token,
}: UserHomePageProps) => {
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
  const [formdata, setFormData] = useState<formData>({
    address: "",
    occupation: "",
    civilStatus: "",
    reason: "",
    gsNote: "",
    status: "",
  });

  const [statusdata, setstatusData] = useState<formData>({
    address: "",
    occupation: "",
    civilStatus: "",
    reason: "",
    gsNote: "",
    status: "",
  });

  const [userRequests, setUserRequests] = useState<UserRequestResponse>([]);

  const [downloadedNicPhoto, setDownloadedNicPhoto] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL(nicImageAPI.urls.download);
        const params = { requestID: userRequests[0]?._id };
        url.search = new URLSearchParams(params).toString();

        const options = {
          headers: {
            accept: "image/jpeg",
            Authorization: "Bearer " + token,
          },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        console.log(response);
        const blob = await response.blob();
        setDownloadedNicPhoto(URL.createObjectURL(blob));
      } catch (err) {
        console.error("Failed to fetch image:", err);
        setError("Failed to download image. Please try again later.");
        console.log(error);
      }
    };

    fetchData();
  }, [userRequests]);

  useEffect(() => {
    fetchUserRequestForNIC(nic, email, token)
      .then((data) => {
        setUserRequests(data);
      })
      .catch((error) => {
        console.error("Failed to fetch user requests:", error);
      });
  }, []);

  useEffect(() => {
    if (userRequests.length > 0) {
      console.log(userRequests);
      console.log(isStatus);
      // Find the first request with a status of "pending"
      const pendingRequest = userRequests.find(
        (request) => request.status === "pending"
      );

      if (pendingRequest) {
        setFormData({
          address: pendingRequest.address,
          occupation: pendingRequest.presentOccupation,
          civilStatus: pendingRequest.civilStatus,
          reason: pendingRequest.reason,
          gsNote: pendingRequest.gsNote,
          status: pendingRequest.status,
        });
      }
    }
  }, [userRequests]); // Dependency array to ensure this runs only when userRequests changes

  useEffect(() => {
    const fetchGS = async () => {
      const API_KEY: string = token;
      const url: string = identityAPI.urls.getGS;

      try {
        const response = await axios.get<string>(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
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
    <Box bgGradient="linear(to-tl, #189972, #ffffff)">
      <Flex direction="column" minH="100vh">
        {/* Header */}
        <Flex
          as="header"
          width="full"
          align="center"
          justifyContent="space-between"
          p={4}
          borderColor={useColorModeValue("gray.200", "gray.900")}
        >
          <Stack direction={"row"} spacing={1} justify="center">
            <Image src={iconImage} alt="DigiGrama Logo" htmlWidth="50px" />
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
              <PopoverContent
                bgGradient="linear(to-br, #ffffff, #a7efea)"
                shadow="xl"
              >
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
                    colorScheme="red" // This will be overridden by bgGradient
                    bgGradient="linear(to-l, red.500, orange.400)" // Custom gradient for the button
                    _hover={{
                      bgGradient: "linear(to-l, red.600, orange.500)", // Slightly darker gradient on hover
                    }}
                    _active={{
                      bgGradient: "linear(to-l, red.700, orange.600)", // Even darker gradient when active
                    }}
                    _focus={{
                      outline: "none",
                    }}
                    onClick={signOut}
                    // Other styles such as padding or font size can be added here
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
                bgGradient="linear(to-br, #ffffff, #a7efea)"
                shadow="xl"
                transform="scale(0.9)"
                _hover={{ transform: "scale(0.9)" }}
              >
                <VStack spacing={16} align="stretch">
                  <Box position="relative" paddingLeft="29%">
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
                    leftIcon={
                      <Box marginRight={5}>
                        <FaCertificate />
                      </Box>
                    }
                    bgGradient="linear(to-r, green.400, teal.500)" // Applying the gradient
                    color="white" // Text color for better contrast
                    _hover={{
                      bgGradient: "linear(to-r, green.500, teal.600)", // Gradient on hover for a slight effect
                    }}
                    _active={{
                      bgGradient: "linear(to-r, green.600, teal.700)", // Gradient when the button is clicked
                    }}
                    boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.2), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)"
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
                    leftIcon={
                      <Box marginRight={5}>
                        <FaSearch />
                      </Box>
                    }
                    borderRadius={15}
                    onClick={handleStatus}
                    bgGradient="linear(to-r, green.400, teal.500)" // Applying the gradient
                    color="white" // Text color for better contrast
                    _hover={{
                      bgGradient: "linear(to-r, green.500, teal.600)", // Gradient on hover for a slight effect
                    }}
                    _active={{
                      bgGradient: "linear(to-r, green.600, teal.700)", // Gradient when the button is clicked
                    }}
                    boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.2), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)"
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
                    leftIcon={
                      <Box marginRight={5}>
                        <FaHandsHelping />
                      </Box>
                    }
                    borderRadius={15}
                    onClick={handleHelp}
                    bgGradient="linear(to-r, green.400, teal.500)" // Applying the gradient
                    color="white" // Text color for better contrast
                    _hover={{
                      bgGradient: "linear(to-r, green.500, teal.600)", // Gradient on hover for a slight effect
                    }}
                    _active={{
                      bgGradient: "linear(to-r, green.600, teal.700)", // Gradient when the button is clicked
                    }}
                    boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.2), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)"
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
            paddingRight={2}
            transform="scale(0.95)"
            _hover={{ transform: "scale(0.95)" }}
          >
            {isApply ? (
              <FormComponent
                requestID={userRequests[0]?._id || ""}
                token={token}
                isMobile={!isLargerThan768}
                status={formdata.status}
                downloadedNicPhoto={downloadedNicPhoto}
                nic={nic}
                email={email}
                gsDivision={gs}
                address={formdata.address}
                setAddress={(address) => {
                  setFormData({
                    ...formdata,
                    address: address,
                  });
                }}
                occupation={formdata.occupation}
                setOccupation={(occupation) => {
                  setFormData({
                    ...formdata,
                    occupation: occupation,
                  });
                }}
                civilStatus={formdata.civilStatus}
                setCivilStatus={(civilStatus) => {
                  setFormData({
                    ...formdata,
                    civilStatus: civilStatus,
                  });
                }}
                reason={formdata.reason}
                setReason={(reason) => {
                  setFormData({
                    ...formdata,
                    reason: reason,
                  });
                }}
              />
            ) : (
              <UserStatus
                isMobile={!isLargerThan768}
                token={token}
                nic={nic}
                email={email}
                statusdata={statusdata}
                setstatusData={setstatusData}
              />
            )}
          </Box>
        </Flex>
      </Flex>
      {isHelp && (
        <Helmet>
          <script
            src="https://www.socialintents.com/api/chat/socialintents.1.3.js#2c9fa6c38c37ef93018c47cb3c470d17"
            async
          ></script>
        </Helmet>
      )}
    </Box>
  );
};

export default UserHomePage;
