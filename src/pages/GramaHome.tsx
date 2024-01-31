import {
  Box,
  Flex,
  Heading,
  Image,
  Button,
  Text,
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
import Requests from "../components/Requests";
import RequestDetails from "../components/RequestDetails";
import { useEffect, useState } from "react";
import MyRequest from "../data/data";
import axios from "axios";
import { addressAPI, identityAPI, mainAPI, policeAPI } from "../data/api";
import iconImage from "../assets/baseIcon.png";

// Create an array of objects with the defined structure
// export const requestsPending: MyRequest[] = [
//   {
//     email: "Request A",
//     nic: "jjkjawdnk",
//     date: "2023-01-01",
//     _id: "1001",
//     status: "pending",
//     address: "No 1, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     reason: "I need to go to the hospital",
//     gsNote: "No note",
//     gsDivision: "Colombo",
//   },
//   {
//     email: "Request B",
//     nic: "aiwdn",
//     date: "2023-01-02",
//     _id: "1002",
//     status: "pending",
//     address: "No 2, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     reason: "I need to go to the hospital",
//     gsNote: "No note",
//     gsDivision: "Colombo",
//   },
//   {
//     email: "Request C",
//     nic: "ijaoiwj",
//     date: "2023-01-03",
//     _id: "1003",
//     status: "pending",
//     address: "No 3, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     reason: "I need to go to the hospital",
//     gsNote: "No note",
//     gsDivision: "Colombo",
//   },
//   {
//     email: "Request A",
//     nic: "aiwjod",
//     date: "2023-01-01",
//     _id: "1001",
//     status: "pending",
//     address: "No 1, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     reason: "I need to go to the hospital",
//     gsNote: "No note",
//     gsDivision: "Colombo",
//   },
//   {
//     email: "Request B",
//     nic: "aowidj",
//     date: "2023-01-02",
//     _id: "1002",
//     status: "pending",
//     address: "No 2, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     reason: "I need to go to the hospital",
//     gsNote: "No note",
//     gsDivision: "Colombo",
//   },
//   {
//     email: "Request C",
//     nic: "aiwdj",
//     date: "2023-01-03",
//     _id: "1003",
//     status: "pending",
//     address: "No 3, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     reason: "I need to go to the hospital",
//     gsNote: "No note",
//     gsDivision: "Colombo",
//   },

//   // ... more objects can be added here
// ];

// // Create an array of objects with the defined structure
// export const requestsCompleted: MyRequest[] = [
//   {
//     email: "Request D",
//     nic: "adwidj",
//     date: "2023-01-01",
//     _id: "10011",
//     status: "completed",
//     address: "No 1, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     gsNote: "No note",
//     reason: "I need to go to the hospital",
//     gsDivision: "Colombo",
//   },
//   {
//     email: "Request E",
//     nic: "aiwdjo",
//     date: "2023-01-02",
//     _id: "10022",
//     status: "completed",
//     address: "No 2, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     gsNote: "No note",
//     reason: "I need to go to the hospital",
//     gsDivision: "Colombo",
//   },
//   {
//     email: "Request F",
//     nic: "opawpdj",
//     date: "2023-01-03",
//     _id: "10033",
//     status: "completed",
//     address: "No 3, Colombo Road, Colombo",
//     civilStatus: "Married",
//     presentOccupation: "Doctor",
//     gsNote: "No note",
//     reason: "I need to go to the hospital",
//     gsDivision: "Colombo",
//   },
//   // ... more objects can be added here
// ];

type GramaHomePageProps = {
  token: string;
  signOut: () => void;
  username: string;
  nic: string;
};

interface dbAddress {
  _id: string;
  nic: string;
  address: string;
}

interface crimes {
  _id: string;
  nic: string;
  numberOfCrimes: number;
  severity: string;
}

export interface identity {
  _id: string;
  nic: string;
  name: string;
  dob: string;
  phoneNumber: string;
  gsDivision: string;
  isMarried: boolean;
  isEmployed: boolean;
}

const GramaHomePage = ({
  signOut,
  username,
  nic,
  token,
}: GramaHomePageProps) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 1050px)");

  const [gs, setGs] = useState("");
  const [pendingList, setPendingList] = useState<MyRequest[]>([]);
  const [completedList, setCompletedList] = useState<MyRequest[]>([]);
  const [currentRequest, setCurrentRequest] = useState<MyRequest | null>(
    pendingList[0]
  );
  const [error, setError] = useState<string | null>(null);
  const [gsNote, setGsNote] = useState<string>("");
  const [dbAddress, setDbAddress] = useState<string>("");
  const [crimesCount, setCrimesCount] = useState<number>(0);
  const [identity, setIdentity] = useState<identity | null>(null);

  const handleGsNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGsNote(event.target.value);
    console.log(error);
  };

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
        console.log(response.data);
        setGs(response.data || "Not Found");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchGS();
  }, [nic]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<MyRequest[]>(
          `${mainAPI.urls.getUserRequests}?gsDivision=${gs}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        // console.log(data.filter((request) => request.status === "pending"));
        setPendingList(data.filter((request) => request.status === "pending"));
        setCompletedList(
          data.filter((request) => request.status !== "pending")
        );
        setCurrentRequest(
          data.filter((request) => request.status === "pending")[0]
        );
        setGsNote(
          data.filter((request) => request.status === "pending")[0]?.gsNote ||
            ""
        );
        console.log(data);
        // console.log(pendingList);
        // console.log(completedList);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchData();
  }, [nic]);

  // const [pendingList, setPendingList] = useState<MyRequest[]>(requestsPending);
  // const [completedList, setCompletedList] =
  //   useState<MyRequest[]>(requestsCompleted);

  const handleClick = (request: MyRequest) => {
    setCurrentRequest(request);
  };

  const handleSwap = (request: MyRequest | null, arg: string) => {
    if (request) {
      const updatedPendingList = pendingList.filter(
        (r) => r.nic !== request.nic
      );
      console.log("addwad", arg);
      const newRequest = { ...request, status: arg };
      const updatedCompletedList = [...completedList, newRequest];

      setPendingList(updatedPendingList);
      setCompletedList(updatedCompletedList);
      if (updatedPendingList.length > 0) {
        setCurrentRequest(updatedPendingList[0]);
      } else {
        setCurrentRequest(null);
      }
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      const API_KEY: string = token;
      const url: string = addressAPI.urls.getAddress;

      try {
        const response = await axios.get<dbAddress[]>(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          params: {
            nic: identity?.nic,
          },
        });
        console.log("addresssssssss", response.data);
        setDbAddress(response.data[0].address || "Not Found");
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchAddress();
  }, [identity?.nic]);

  useEffect(() => {
    const fetchCrimes = async () => {
      const API_KEY: string = token;
      const url: string = policeAPI.urls.getCrimes;

      try {
        const response = await axios.get<crimes[]>(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          params: {
            nic: identity?.nic,
          },
        });
        console.log("crimes", response.data);
        let c = 0;
        if (response.data.length > 0) {
          c = response.data[0].numberOfCrimes || 0;
        }
        setCrimesCount(c);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchCrimes();
  }, [identity?.nic]);

  // useEffect(() => {
  //   const fetchCrimes = async () => {
  //     const API_KEY: string = token;
  //     const url: string = policeAPI.urls.getCrimes;

  //     try {
  //       const response = await axios.get<crimes[]>(url, {
  //         headers: {
  //           accept: "application/json",
  //           Authorization: `Bearer ${API_KEY}`,
  //         },
  //         params: {
  //           nic: nic,
  //         },
  //       });
  //       console.log("crimes", response.data);
  //       let c = 0;
  //       if (response.data.length > 0) {
  //         c = response.data[0].numberOfCrimes || 0;
  //       }
  //       setCrimesCount(c);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };
  //   fetchCrimes();
  // }, [nic]);

  useEffect(() => {
    const fetchIdentity = async () => {
      const API_KEY: string = token;
      const url: string = identityAPI.urls.getIdentity;

      try {
        const response = await axios.get<identity[]>(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          params: {
            nic: identity?.nic,
          },
        });
        setIdentity(response.data[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchIdentity();
  }, [identity?.nic]);

  // `${mainAPI.urls.getUserRequests}?gsDivision=${gs}`

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
                bgGradient="linear(to-br, #ffffff, #78fff6)"
                boxShadow="xl"
              >
                <PopoverArrow />
                <PopoverHeader>{username}</PopoverHeader>
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
                  {/* Add your user details here */}
                  <Button
                    bgGradient="linear(to-l, red.500, orange.400)"
                    color="white"
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
          justify="space-between"
          flexGrow={1}
        >
          {/* Requests */}
          <Box display="flex" flex={1} justifyContent="center">
            <Box padding={7} borderRadius={30}>
              <Requests
                isMobile={!isLargerThan768}
                selectedRequest={currentRequest}
                dataPending={pendingList}
                dataCompleted={completedList}
                clickHandler={handleClick}
              />
            </Box>
          </Box>

          <Box
            flex={isLargerThan768 ? 2 : 15}
            alignItems="center"
            paddingRight={4}
          >
            {/* <FormComponent /> */}
            <RequestDetails
              token={token}
              data={currentRequest}
              crimes={crimesCount}
              dbAddress={dbAddress}
              identityFromNIC={identity}
              gsNote={gsNote}
              handleGsNoteChange={handleGsNoteChange}
              handleClick={(arg: string) => handleSwap(currentRequest, arg)}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default GramaHomePage;
