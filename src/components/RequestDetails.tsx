import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const updateRequestStatus = async (params: UpdateRequestParams) => {
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      ) : data ? (
        <Box padding={7} margin={7} borderRadius={40} boxShadow="xl">
          {/* ... Form controls and other fields ... */}
          <FormControl id="status" marginTop={3}>
            <FormLabel>Status</FormLabel>
            <Input type="text" value={data.status} readOnly />
          </FormControl>
          <FormControl id="nic" marginTop={3}>
            <FormLabel>NIC</FormLabel>
            <Input type="text" value={data.nic} readOnly />
          </FormControl>
          <FormControl id="email" marginTop={3}>
            <FormLabel>Email</FormLabel>
            <Input type="text" value={data.email} readOnly />
          </FormControl>
          <FormControl id="date" marginTop={3}>
            <FormLabel>Date</FormLabel>
            <Input type="text" value={data.requestTime.slice(0, 10)} readOnly />
          </FormControl>
          <FormControl id="time" marginTop={3}>
            <FormLabel>Time</FormLabel>
            <Input
              type="text"
              value={data.requestTime.slice(11, 16)}
              readOnly
            />
          </FormControl>
          <FormControl id="number" marginTop={3}>
            <FormLabel>Number</FormLabel>
            <Input type="text" value={data._id} readOnly />
          </FormControl>
          <FormControl id="address" marginTop={3}>
            <FormLabel>Address Entered</FormLabel>
            <Input type="text" value={data.address} readOnly />
          </FormControl>
          <FormControl id="civilStatus" marginTop={3}>
            <FormLabel>Civil Status</FormLabel>
            <Input type="text" value={data.civilStatus} readOnly />
          </FormControl>
          <FormControl id="occupation" marginTop={3}>
            <FormLabel>Present Occupation</FormLabel>
            <Input type="text" value={data.presentOccupation} readOnly />
          </FormControl>
          <FormControl id="reason" marginTop={3}>
            <FormLabel>Reason</FormLabel>
            <Input type="text" value={data.reason} readOnly />
          </FormControl>

          {data.status === "pending" ? (
            <>
              <Button
                bgColor="green.500"
                margin={5}
                isLoading={isLoading}
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
                <Text color="white">
                  <b>Accept</b>
                </Text>
              </Button>
              <Button
                bgColor="red.500"
                margin={5}
                isLoading={isLoading}
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
                <Text color="white">
                  <b>Reject</b>
                </Text>
              </Button>
            </>
          ) : null}
        </Box>
      ) : (
        <Box paddingLeft="35%">
          <Text fontSize="3xl">
            <b>No requests</b>
          </Text>
        </Box>
      )}
    </>
  );
}

export default RequestDetails;
