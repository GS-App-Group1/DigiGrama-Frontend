import React, { useState, ChangeEvent } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { mainAPI } from "../data/api";
import axios from "axios";
// import { useEffect } from "react";
// import { getAddress } from "../data/api";

interface FormComponentProps {
  isMobile: boolean;
  nic: string;
  gsDivision: string;
  address: string;
  occupation: string;
  civilStatus: string;
  reason: string;
  status: string;
  email: string;
  setAddress: (arg: string) => void;
  setOccupation: (arg: string) => void;
  setCivilStatus: (arg: string) => void;
  setReason: (arg: string) => void;
}

// interface AddressResponseItem {
//   address: string;
//   id: string;
//   nic: string;
// }

const FormComponent: React.FC<FormComponentProps> = ({
  isMobile,
  gsDivision,
  address,
  setAddress,
  nic,
  email,
  occupation,
  setOccupation,
  civilStatus,
  setCivilStatus,
  reason,
  setReason,
  status,
}) => {
  const fontSize = isMobile ? "2xl" : "md";

  // const [nicPhoto, setNicPhoto] = useState<File | null>(null);
  // const [res, setRes] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  // Event handlers with type annotations
  // const handleNicChange = (e: ChangeEvent<HTMLInputElement>) =>
  //   setNic(e.target.value);
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value);
  const handleCivilStatusChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCivilStatus(e.target.value);
  const handleOccupationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOccupation(e.target.value);
  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) =>
    setReason(e.target.value);
  // const handleNicPhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setNicPhoto(e.target.files[0]);
  //   }
  // };

  // useEffect(() => {
  //   const fetchAddress = async () => {
  //     const API_KEY: string = getAddress.key;
  //     const url: string = getAddress.url;

  //     try {
  //       const response = await axios.get<AddressResponseItem[]>(url, {
  //         headers: {
  //           accept: "application/json",
  //           "API-Key": API_KEY,
  //         },
  //         params: {
  //           nic: nic,
  //         },
  //       });
  //       if (address === "") setAddress(response.data[0].address || "Not Found");

  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchAddress();
  // }, [address]);

  // const handleApply = async () => {
  //   try {
  //     const response = await axios.post(
  //       postRequest.url,
  //       {
  //         _id: "987123", // Replace with actual data if needed
  //         address: address,
  //         civilStatus: civilStatus,
  //         gsDivision: gsDivision, // Replace with actual data if needed
  //         gsNote: "", // Replace with actual data if needed
  //         nic: nic,
  //         presentOccupation: occupation,
  //         reason: reason,
  //         requestTime: new Date().toISOString(), // Replace with actual data if needed
  //         status: "pending", // Replace with actual data if needed
  //       },
  //       {
  //         headers: {
  //           accept: "*/*",
  //           "Content-Type": "application/json",
  //           "API-Key": postRequest.key, // Replace with your actual API key
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error making the request:", error);
  //   }
  // };

  // const handleApplyTest = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Your API call logic here
  //     // After the API call
  //     // add a timer of 2 seconds to simulate the loading state
  //     // Remove this timer when you add the actual API call
  //     // setTimeout(() => {
  //     //   setIsLoading(false);
  //     //   setRes(true);
  //     //   toast({
  //     //     title: "Application Successful",
  //     //     description: "Your application has been submitted successfully.",
  //     //     status: "success",
  //     //     duration: 5000,
  //     //     isClosable: true,
  //     //   });
  //     // }, 2000);
  //     await axios.post(
  //       mainAPI.urls.postRequest,
  //       {
  //         _id: new Date().toISOString(), // Replace with actual data if needed
  //         address: address,
  //         civilStatus: civilStatus,
  //         gsDivision: gsDivision, // Replace with actual data if needed
  //         gsNote: "", // Replace with actual data if needed
  //         nic: nic,
  //         presentOccupation: occupation,
  //         reason: reason,
  //         requestTime: new Date().toISOString(), // Replace with actual data if needed
  //         status: "pending", // Replace with actual data if needed
  //         email: email,
  //       },
  //       {
  //         headers: {
  //           accept: "*/*",
  //           "Content-Type": "application/json",
  //           "API-Key": mainAPI.key, // Replace with your actual API key
  //         },
  //       }
  //     );
  //     setIsLoading(false);
  //     toast({
  //       title: "Application Successful",
  //       description: `Your application has been ${
  //         status === "pending" ? "updated" : "submitted"
  //       } successfully.`,
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //     // reload the page
  //     // window.location.reload();
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error("Error making the request:", error);
  //     toast({
  //       title: "Application Failed",
  //       description: "There was an error submitting your application.",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }
  // };

  const handleApplyTest = async () => {
    setIsLoading(true);

    try {
      const requestBody = {
        _id: new Date().toISOString(), // Replace with actual data if needed
        address: address,
        civilStatus: civilStatus,
        gsDivision: gsDivision, // Replace with actual data if needed
        gsNote: "", // Replace with actual data if needed
        nic: nic,
        presentOccupation: occupation,
        reason: reason,
        requestTime: new Date().toISOString(), // Replace with actual data if needed
        status: "pending", // Replace with actual data if needed
        email: email,
      };

      if (status === "pending") {
        // PUT request for updating user request
        await axios.put(
          `${mainAPI.urls.updateRequest}?nic=${nic}&email=${encodeURIComponent(
            email
          )}&address=${encodeURIComponent(
            address
          )}&civil_status=${encodeURIComponent(
            civilStatus
          )}&presentOccupation=${encodeURIComponent(
            occupation
          )}&reason=${encodeURIComponent(reason)}`,
          requestBody,
          {
            headers: {
              accept: "*/*",
              "Content-Type": "application/json",
              "API-Key": mainAPI.key, // Replace with your actual API key
            },
          }
        );
      } else {
        // POST request for creating a new user request
        await axios.post(mainAPI.urls.postRequest, requestBody, {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            "API-Key": mainAPI.key, // Replace with your actual API key
          },
        });
      }

      setIsLoading(false);
      toast({
        title: `${status === "pending" ? "Update" : "Application"} Successful`,
        description: `Your application has been ${
          status === "pending" ? "updated" : "submitted"
        } successfully.`,
        status: status === "pending" ? "info" : "success",
        duration: 3000,
        isClosable: true,
      });

      // Consider using a more React-friendly way to update the page state instead of reloading the page
      // window.location.reload();
    } catch (error) {
      setIsLoading(false);
      console.error("Error making the request:", error);
      toast({
        title: "Application Failed",
        description: "There was an error submitting your application.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={10} shadow="xl" borderRadius="20" marginX={5}>
      <VStack spacing={5}>
        <Text as="h1" fontWeight="bold">
          Application
        </Text>
        <FormControl id="nic">
          <FormLabel fontSize={fontSize}>
            <b>NIC</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your NIC"
            fontSize={fontSize}
            value={nic}
          />
        </FormControl>
        <FormControl id="address">
          <FormLabel fontSize={fontSize}>
            <b>Address</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your address"
            fontSize={fontSize}
            value={address}
            onChange={handleAddressChange}
          />
        </FormControl>
        <FormControl id="civilStatus">
          <FormLabel fontSize={fontSize}>
            <b>Civil Status</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your civil status"
            fontSize={fontSize}
            value={civilStatus}
            onChange={handleCivilStatusChange}
          />
        </FormControl>
        <FormControl id="occupation">
          <FormLabel fontSize={fontSize}>
            <b>Present Occupation</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter your occupation"
            fontSize={fontSize}
            value={occupation}
            onChange={handleOccupationChange}
          />
        </FormControl>
        <FormControl id="reason">
          <FormLabel fontSize={fontSize}>
            <b>Reason</b>
          </FormLabel>
          <Input
            type="text"
            placeholder="Enter the reason"
            fontSize={fontSize}
            value={reason}
            onChange={handleReasonChange}
          />
        </FormControl>
        <FormControl id="nicPhoto">
          <FormLabel fontSize={fontSize}>
            <b>Upload NIC Photo</b>
          </FormLabel>
          <Input type="file" fontSize={fontSize} />
        </FormControl>
        <Button
          colorScheme={status === "pending" ? "blue" : "green"}
          px={16}
          py={6}
          paddingBottom={8}
          fontSize="3xl"
          _focus={{ outline: "none" }}
          onClick={handleApplyTest}
          isLoading={isLoading}
          loadingText="Submitting"
          isDisabled={
            address === "" ||
            occupation === "" ||
            reason === "" ||
            civilStatus === ""
          }
        >
          {status === "pending" ? "Update" : "Apply"}
        </Button>
      </VStack>
    </Box>
  );
};

export default FormComponent;
