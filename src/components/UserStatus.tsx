import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { mainAPI } from "../data/api";

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
  nic: string
): Promise<UserRequestResponse> => {
  const API_URL = mainAPI.urls.getRequestForNIC;
  const API_KEY = mainAPI.key;

  try {
    const response = await axios.get<UserRequestResponse>(
      `${API_URL}?nic=${nic}`,
      {
        headers: {
          accept: "application/json",
          "API-Key": API_KEY,
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

interface UserStatusProps {
  isMobile: boolean;
  nic: string;
  statusdata: formData;
  setstatusData: (data: formData) => void;
}

const UserStatus: React.FC<UserStatusProps> = ({
  isMobile,
  nic,
  statusdata,
  setstatusData,
}) => {
  const fontSize = isMobile ? "2xl" : "md";

  const [userRequests, setUserRequests] = useState<UserRequestResponse>([]);
  // const [statusdata, setstatusData] = useState<formData>({
  //   address: "",
  //   occupation: "",
  //   civilStatus: "",
  //   reason: "",
  //   gsNote: "",
  //   status: "",
  // });

  useEffect(() => {
    fetchUserRequestForNIC(nic)
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
      setstatusData({
        address: userRequests[0].address,
        occupation: userRequests[0].presentOccupation,
        civilStatus: userRequests[0].civilStatus,
        reason: userRequests[0].reason,
        gsNote: userRequests[0].gsNote,
        status: userRequests[0].status,
      });
    }
  }, [userRequests]); // Dependency array to ensure this runs only when userRequests changes

  if (statusdata.status === "") {
    return (
      <Box p={10} shadow="xl" borderRadius="20" marginX={5}>
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
            colorScheme="yellow"
            px={16}
            py={6}
            fontSize="3xl"
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
    <Box p={10} shadow="xl" borderRadius="20" marginX={5}>
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
        <FormControl id="address">
          <FormLabel fontSize={fontSize}>Address</FormLabel>
          <Input
            type="text"
            placeholder="Enter your address"
            defaultValue={statusdata.address}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        <FormControl id="civilStatus">
          <FormLabel fontSize={fontSize}>Civil Status</FormLabel>
          <Input
            type="text"
            placeholder="Enter your civil status"
            defaultValue={statusdata.civilStatus}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        <FormControl id="occupation">
          <FormLabel fontSize={fontSize}>Present Occupation</FormLabel>
          <Input
            type="text"
            placeholder="Enter your occupation"
            defaultValue={statusdata.occupation}
            fontSize={fontSize}
            isReadOnly
          />
        </FormControl>
        <FormControl id="reason">
          <FormLabel fontSize={fontSize}>Reason</FormLabel>
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
            <FormLabel fontSize={fontSize}>Note from Grama Sevaka</FormLabel>
            <Input
              type="text"
              placeholder="Notes"
              defaultValue={statusdata.gsNote}
              marginBottom={5}
              fontSize={fontSize}
              isReadOnly
            />
            <Input type="file" />
          </FormControl>
        )}
        <Button
          colorScheme={
            statusdata.status === "pending"
              ? "yellow"
              : statusdata.status === "accepted"
              ? "green"
              : "red"
          }
          px={16}
          py={6}
          fontSize="3xl"
          _focus={{
            outline: "none",
          }}
        >
          {statusdata.status.toUpperCase()}
        </Button>
      </VStack>
    </Box>
  );
};

export default UserStatus;
