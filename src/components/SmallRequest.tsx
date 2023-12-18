import React from "react";
import { Box, VStack, Stack, Text } from "@chakra-ui/react";
import MyRequest from "../data/data";

interface RequestProps {
  handleClick: () => void; // assuming handleClick is a function with no arguments
  data: MyRequest;
  obj_id: number;
  isSelected: boolean;
}

const Request: React.FC<RequestProps> = ({
  handleClick,
  data,
  isSelected,
  obj_id,
}) => {
  console.log(data);
  return (
    <Box
      borderRadius="40"
      p={0}
      bgGradient="linear(to-r, green.400, teal.500)"
      cursor="pointer"
      onClick={handleClick}
      _hover={{
        boxShadow: "0 0 10px 0 rgba(100, 255, 255, 1)", // This creates a glow effect
      }}
      boxShadow={
        isSelected
          ? "0 0 10px 0 rgba(100, 255, 255, 1)"
          : "0 0 0px 0 rgba(100, 255, 255, 1)"
      }
    >
      <Stack direction={"row"} spacing={2} justify="center">
        <Box borderRadius="40" p={1} bg="green.200">
          <VStack spacing={0.1}>
            <Text fontSize="small" marginX={2}>
              <b>{data.requestTime.slice(0, 10)}</b>
            </Text>
            <Text fontSize="small" marginX={2}>
              {data.requestTime.slice(11, 16)}
            </Text>
          </VStack>
        </Box>
        <Box borderRadius="40" p={1} bg="green.200">
          <Text fontSize="small" marginX={2} marginY={2}>
            <b>{data.nic}</b>
          </Text>
        </Box>
      </Stack>
    </Box>
  );
};

export default Request;
