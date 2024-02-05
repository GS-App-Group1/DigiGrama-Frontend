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
// import DownloadedNicPhoto from "./DownloadedNicPhoto";
import { v4 as uuidv4 } from "uuid";

// import * as crypto from "crypto";
// import { getToken } from "./utils";
interface FormComponentProps {
  requestID: string;
  token: string;
  isMobile: boolean;
  nic: string;
  gsDivision: string;
  address: string;
  occupation: string;
  civilStatus: string;
  reason: string;
  status: string;
  email: string;
  downloadedNicPhoto: string;
  setAddress: (arg: string) => void;
  setOccupation: (arg: string) => void;
  setCivilStatus: (arg: string) => void;
  setReason: (arg: string) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({
  // requestID,
  token,
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
  // downloadedNicPhoto,
  reason,
  setReason,
  status,
}) => {
  const fontSize = isMobile ? "2xl" : "md";

  // const [nicPhoto, setNicPhoto] = useState<Blob | MediaSource>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();
  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) =>
    setAddress(e.target.value);
  const handleCivilStatusChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCivilStatus(e.target.value);
  const handleOccupationChange = (e: ChangeEvent<HTMLInputElement>) =>
    setOccupation(e.target.value);
  const handleReasonChange = (e: ChangeEvent<HTMLInputElement>) =>
    setReason(e.target.value);
  const [isapplied, setIsapplied] = useState<boolean>(false);
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

  // const handleNicUpload = async (requestID: string) => {
  //   try {
  //     const config = {
  //       params: { requestID: requestID },
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: nicImageAPI.urls.upload,
  //       headers: {
  //         accept: "*/*",
  //         "Content-Type": "image/jpeg",
  //         Authorization: "Bearer " + token,
  //       },
  //       data: nicPhoto,
  //     };
  //     console.log("image name", requestID);
  //     const response = await axios.request(config);
  //     console.log("upload response" + response);
  //   } catch (error) {
  //     console.log(error, "photooooo");
  //   }
  // };

  // function hashString(str: string): string {
  //   return crypto.createHash("sha256").update(str).digest("hex");
  // }

  const handleApplyTest = async () => {
    setIsLoading(true);
    const reqId = uuidv4();
    console.log("reqId", reqId);
    try {
      const localISOTime = ((offset) => {
        const d = new Date(new Date().getTime() + offset * 60000);
        return d.toISOString();
      })(-new Date().getTimezoneOffset());
      const requestBody = {
        // hash id
        _id: reqId,
        address: address,
        civilStatus: civilStatus,
        gsDivision: gsDivision, // Replace with actual data if needed
        gsNote: "", // Replace with actual data if needed
        nic: nic,
        presentOccupation: occupation,
        reason: reason,
        requestTime: localISOTime, // Replace with actual data if needed
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
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // POST request for creating a new user request
        await axios.post(mainAPI.urls.postRequest, requestBody, {
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Replace with your actual API key
          },
        });
      }

      setIsLoading(false);
      setIsapplied(true);
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
      window.location.reload();
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
    <Box
      p={10}
      shadow="xl"
      borderRadius="20"
      marginX={5}
      bgGradient="linear(to-br, #ffffff, #78fff6)"
    >
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
        {/* <FormControl id="nicPhoto">
          <FormLabel fontSize={fontSize}>
            <b>Upload NIC Photo</b>
          </FormLabel>
          <Input
            type="file"
            fontSize={fontSize}
            onChange={handleNicPhotoChange}
          />
          <img src={nicPhoto && URL.createObjectURL(nicPhoto)} />
        </FormControl> */}
        <Button
          bgGradient="linear(to-r, green.400, teal.500)" // Applying the gradient
          color="white" // Text color for better contrast
          _hover={{
            bgGradient: "linear(to-r, green.500, teal.600)", // Gradient on hover for a slight effect
          }}
          _active={{
            bgGradient: "linear(to-r, green.600, teal.700)", // Gradient when the button is clicked
          }}
          boxShadow="0px 10px 15px -3px rgba(0, 0, 0, 0.2), 0px 4px 6px -4px rgba(0, 0, 0, 0.1)"
          px={16}
          py={6}
          paddingBottom={8}
          fontSize="3xl"
          _focus={{ outline: "none" }}
          onClick={() => {
            // handleNicUpload(requestID);
            handleApplyTest();
          }}
          //onClick={() => handleNicUpload("1122")}
          isLoading={isLoading}
          loadingText="Submitting"
          isDisabled={
            address === "" ||
            occupation === "" ||
            reason === "" ||
            civilStatus === ""
          }
        >
          {status === "pending" || isapplied ? "Update" : "Apply"}
        </Button>
      </VStack>
      {/* {requestID && (
        <DownloadedNicPhoto downloadedNicPhoto={downloadedNicPhoto} />
      )} */}
    </Box>
  );
};

export default FormComponent;
