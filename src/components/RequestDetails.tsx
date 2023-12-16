import { Box, Button, Text, useToast } from "@chakra-ui/react";
import MyRequest from "../data/data";
import axios from "axios";
import { useState } from "react";
import { mainAPI } from "../data/api";

interface UpdateRequestParams {
  nic: string;
  email: string;
  status: string;
}

type RequestDetailsProps = {
  data: MyRequest | null;
  handleClick: (arg: string) => void;
};

function RequestDetails({ data, handleClick }: RequestDetailsProps) {
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const updateRequestStatus = async (params: UpdateRequestParams) => {
    try {
      const response = await axios.put(mainAPI.urls.updateStatus, null, {
        params,
        headers: {
          accept: "*/*",
          "API-Key": mainAPI.key,
        },
      });
      setResponseMessage(response.data);
      toast({
        title: `Application ${params.status}`,
        description: `The application has been ${params.status}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.message);
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError("An unknown error occurred");
        toast({
          title: "Error",
          description: "An unknown error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      {data ? (
        <Box padding={7} margin={7} borderRadius={40} boxShadow="xl">
          <Text>Status: {data.status}</Text>
          {/* // <Text>Name</Text> */}
          <Text>NIC: {data.nic}</Text>
          <Text>Email: {data.email}</Text>
          <Text>Date: {data.requestTime.slice(0, 10)}</Text>
          <Text>Time: {data.requestTime.slice(11, 16)}</Text>
          <Text>Number: {data._id}</Text>
          <Text>Address Entered: {data.address}</Text>
          {/* <Text>Current Address</Text> */}
          <Text>Civil Status: {data.civilStatus}</Text>
          <Text>Present Occupation: {data.presentOccupation}</Text>
          <Text>Reason: {data.reason}</Text>

          {/* <Text>District and Division</Text>
//           <Text>Gender</Text>
//           <Text>Age</Text>
//           <Text>Religion</Text>
//           <Text>Police Report</Text> */}
          {/* <Text>GS Note: {data.gsNote}</Text> */}
          {/* ... other component content ... */}
          {data.status === "pending" ? (
            <>
              <Button
                onClick={() => {
                  handleClick("accepted");
                  updateRequestStatus({
                    nic: data.nic,
                    email: data.email,
                    status: "accepted",
                  });
                }}
                _focus={{
                  outline: "none",
                }}
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  handleClick("rejected");
                  updateRequestStatus({
                    nic: data.nic,
                    email: data.email,
                    status: "rejected",
                  });
                }}
                _focus={{
                  outline: "none",
                }}
              >
                Reject
              </Button>
            </>
          ) : null}
        </Box>
      ) : (
        <Box bgColor="red">
          <Text>No requests</Text>
        </Box>
      )}
    </>
  );
}

export default RequestDetails;
