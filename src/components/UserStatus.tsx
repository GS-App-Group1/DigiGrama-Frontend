import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
// import axios from "axios";
// import { mainAPI } from "../data/api";

// import * as pdfMake from "pdfmake/build/pdfmake";
// import * as pdfFonts from "pdfmake/build/vfs_fonts";
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";

// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// Define the document content

// interface UserRequest {
//   _id: string;
//   nic: string;
//   address: string;
//   civilStatus: string;
//   presentOccupation: string;
//   reason: string;
//   gsNote: string;
//   gsDivision: string;
//   requestTime: string;
//   status: string;
// }

// If your response is an array of these objects:
// type UserRequestResponse = UserRequest[];

// const fetchUserRequestForNIC = async (
//   nic: string,
//   email: string,
//   token: string
// ): Promise<UserRequestResponse> => {
//   const API_URL = mainAPI.urls.getRequestForNIC;
//   const API_KEY = token;

//   try {
//     const response = await axios.get<UserRequestResponse>(
//       `${API_URL}?nic=${nic}&email=${email}`, // Added email as a query parameter
//       {
//         headers: {
//           accept: "application/json",
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       }
//     );

//     return response.data; // This will be an array of UserRequest objects
//   } catch (error) {
//     console.error("Error fetching user request data:", error);
//     throw error; // Rethrow the error for handling in calling code
//   }
// };

type formData = {
  address: string;
  occupation: string;
  civilStatus: string;
  reason: string;
  gsNote: string;
  status: string;
};

interface UserStatusProps {
  isMobile: boolean;
  nic: string;
  // email: string;
  statusdata: formData;
  // token: string;
  // setstatusData: (data: formData) => void;
}

const UserStatus: React.FC<UserStatusProps> = ({
  isMobile,
  nic,
  // token,
  // email,
  statusdata,
  // setstatusData,
}) => {
  const fontSize = isMobile ? "2xl" : "md";

  // const [userRequests, setUserRequests] = useState<UserRequestResponse>([]);
  // const [statusdata, setstatusData] = useState<formData>({
  //   address: "",
  //   occupation: "",
  //   civilStatus: "",
  //   reason: "",
  //   gsNote: "",
  //   status: "",
  // });

  // useEffect(() => {
  //   fetchUserRequestForNIC(nic, email, token)
  //     .then((data) => {
  //       setUserRequests(data);
  //     })
  //     .catch((error) => {
  //       console.error("Failed to fetch user requests:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   if (userRequests.length > 0) {
  //     // Find the request with the latest timestamp
  //     const latestRequest = userRequests.reduce((latest, current) => {
  //       return new Date(latest.requestTime) > new Date(current.requestTime)
  //         ? latest
  //         : current;
  //     });

  //     setstatusData({
  //       address: latestRequest.address,
  //       occupation: latestRequest.presentOccupation,
  //       civilStatus: latestRequest.civilStatus,
  //       reason: latestRequest.reason,
  //       gsNote: latestRequest.gsNote,
  //       status: latestRequest.status,
  //     });
  //   }
  // }, [userRequests]); // Dependency array to ensure this runs only when userRequests changes

  if (statusdata.status === "") {
    return (
      <Box
        p={10}
        shadow="xl"
        borderRadius="20"
        marginX={5}
        bgGradient="linear(to-br, #ffffff, #78fff6)"
      >
        <VStack spacing={5}>
          <h1>
            <b>Current Status</b>
          </h1>
          <FormControl id="nic">
            <FormLabel fontSize={fontSize}>NIC</FormLabel>
            <Input
              type="text"
              placeholder="Enter your NIC"
              defaultValue={nic}
              fontSize={fontSize}
              isReadOnly
            />
          </FormControl>
          <Button
            px={16}
            py={6}
            fontSize="3xl"
            bgGradient="linear(to-r, yellow.400, yellow.500, yellow.600)" // Custom gradient for the button
            color="white" // Ensuring the text stands out against the background
            _hover={{
              bgGradient: "linear(to-r, yellow.500, yellow.600, yellow.700)", // Gradient for hover state
            }}
            _active={{
              bgGradient: "linear(to-r, yellow.600, yellow.700, yellow.800)", // Gradient for active state
            }}
            _focus={{
              outline: "none",
            }}
          >
            No Requests
          </Button>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      p={10}
      shadow="xl"
      borderRadius="20"
      marginX={5}
      bgGradient="linear(to-br, #ffffff, #78fff6)"
    >
      <VStack spacing={5}>
        <h1>
          <b>Current Status</b>
        </h1>
        <FormControl id="nic">
          <FormLabel fontSize={fontSize}>
            <b>NIC</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your NIC"
            defaultValue={nic}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        <FormControl id="address">
          <FormLabel fontSize={fontSize}>
            <b>Address</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your address"
            defaultValue={statusdata.address}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        <FormControl id="civilStatus">
          <FormLabel fontSize={fontSize}>
            <b>Civil Status</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your civil status"
            defaultValue={statusdata.civilStatus}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        <FormControl id="occupation">
          <FormLabel fontSize={fontSize}>
            <b>Present Occupation</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your occupation"
            defaultValue={statusdata.occupation}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        <FormControl id="reason">
          <FormLabel fontSize={fontSize}>
            <b>Reason</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter the reason"
            defaultValue={statusdata.reason}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        {statusdata.gsNote.length > 0 && (
          <FormControl id="nicPhoto">
            <FormLabel fontSize={fontSize}>
              <b>Note from Grama Sevaka</b>
            </FormLabel>
            <Input
              type="text"
              placeholder="Notes"
              defaultValue={statusdata.gsNote}
              marginBottom={5}
              fontSize={fontSize}
              isReadOnly
            />
            {/* <Input type="file" /> */}
          </FormControl>
        )}
        <Button
          px={16}
          py={6}
          color="black"
          fontSize="3xl"
          // onClick={() => {
          //   if (statusdata.status === "pending") {
          //     console.log(
          //       "Pendingaiodhwaidawidhawodhawidhawodihawodiuawbdahwd"
          //     );
          //     const documentDefinition = {
          //       content: [
          //         "Grama Sevaka Certificate", // Replace this with your text
          //         " ", // Add some vertical spacing
          //         " ",
          //         `ID: ${userRequests[0]._id}`,
          //         " ",
          //         `NIC: ${userRequests[0].nic}`,
          //         " ",
          //         `Address: ${userRequests[0].address}`,
          //         " ",
          //         `Civil Status: ${userRequests[0].civilStatus}`,
          //         " ",
          //         `Present Occupation: ${userRequests[0].presentOccupation}`,
          //         " ",
          //         `Reason: ${userRequests[0].reason}`,
          //         " ",
          //         `Grama Sevaka Note: ${userRequests[0].gsNote}`,
          //         " ",
          //         `Grama Sevaka Division: ${userRequests[0].gsDivision}`,
          //         " ",
          //         `Request Time: ${userRequests[0].requestTime}`,
          //         " ",
          //         `Status: ${userRequests[0].status}`,
          //       ],
          //     };
          //     pdfMake
          //       .createPdf(documentDefinition)
          //       .download(`${userRequests[0].nic}.pdf`);
          //   }
          // }}
          bg={
            statusdata.status === "pending"
              ? "linear-gradient(90deg, rgba(255,224,102,1) 0%, rgba(255,229,128,1) 100%)" // Yellow gradient
              : statusdata.status === "accepted"
              ? "linear-gradient(90deg, rgba(102,187,106,1) 0%, rgba(129,199,132,1) 100%)" // Green gradient
              : "linear-gradient(90deg, rgba(229,115,115,1) 0%, rgba(239,154,154,1) 100%)" // Red gradient
          }
          _hover={{
            bg:
              statusdata.status === "pending"
                ? "linear-gradient(90deg, rgba(255,224,102,0.8) 0%, rgba(255,229,128,0.8) 100%)" // Lighter yellow gradient
                : statusdata.status === "accepted"
                ? "linear-gradient(90deg, rgba(102,187,106,0.8) 0%, rgba(129,199,132,0.8) 100%)" // Lighter green gradient
                : "linear-gradient(90deg, rgba(229,115,115,0.8) 0%, rgba(239,154,154,0.8) 100%)", // Lighter red gradient
          }}
          _active={{
            bg:
              statusdata.status === "pending"
                ? "linear-gradient(90deg, rgba(255,224,102,0.6) 0%, rgba(255,229,128,0.6) 100%)" // Even lighter yellow gradient
                : statusdata.status === "accepted"
                ? "linear-gradient(90deg, rgba(102,187,106,0.6) 0%, rgba(129,199,132,0.6) 100%)" // Even lighter green gradient
                : "linear-gradient(90deg, rgba(229,115,115,0.6) 0%, rgba(239,154,154,0.6) 100%)", // Even lighter red gradient
          }}
          _focus={{
            outline: "none",
          }}
        >
          {statusdata.status.toUpperCase()}
          {statusdata.status === "accepted" && ": Download certificate"}
        </Button>
      </VStack>
    </Box>
  );
};

export default UserStatus;
