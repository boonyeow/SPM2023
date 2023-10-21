import InfoCard from "../components/InfoCard";
import RoleCard from "../components/RoleCard";
import { formatDateTime } from "../service";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const RoleView = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const { isLoading, data: role } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/listings/${id}`);
      return res.data;
    },
    initialData: {
      listing_title: "",
      listing_desc: "",
      skills: [],
      country: "",
      dept: "",
      created_by_name: "",
      created_date: "",
    },
    retry: 3,
  });

  return (
    <>
      <Box position="relative">
        <Box
          bgGradient={[
            "linear(to-b,  pink.500, purple.300)",
            "linear(to-tr, teal.300, yellow.400)",
            "linear(to-t, blue.200, pink.500)",
          ]}
          w="100%"
          h="200px" // Adjust the height as needed
        ></Box>
        <Flex justify="space-between" px={4} py={8}>
          <Spacer />
          <Box
            position="relative" // To make it overlap with the image
            top={-48} // To make it protrude the bottom of the image
            w="45%">
            <Box mb={8} color="white" fontWeight="semibold">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/listings">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">
                    {role.listing_title || "..."}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <RoleCard
              title={role.listing_title}
              description={role.listing_desc}
              skillsRequired={role.skills}
              country={role.country}
              department={role.dept}
              creator={role.created_by_name}
              dateCreated={
                role.created_date == "" ? "" : formatDateTime(role.created_date)
              }
              isLoading={isLoading}
            />
          </Box>

          <Box w="27%" ml={10}>
            <InfoCard progress={35} />
          </Box>
          <Spacer />
        </Flex>
      </Box>
    </>
  );
};

export default RoleView;
