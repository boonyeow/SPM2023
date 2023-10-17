import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";
import RoleCard from "../components/RoleCard";
import Swal from "sweetalert2";
import axios from "axios";
import { formatDateTime } from "../service";
import { useLoginContext } from "../hooks/useLoginContext";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RoleView = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const { loginInfo } = useLoginContext();

  const [role, setRole] = useState({
    listing_title: "",
    listing_desc: "",
    skills: [],
    country: "",
    dept: "",
    created_by_name: "",
    created_date: "",
  });

  const { isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/listings/${id}`);
      setRole(res.data);
      return res.data;
    },
    retry: 3,
  });

  useEffect(() => {
    if (!loginInfo.isLoggedIn) navigate("/");
  }, [navigate, loginInfo]);

  useEffect(() => {
    if (isError) {
      Swal.fire({
        title: "Error!",
        text: "Redirecting to home page...",
        icon: "error",
      });

      setTimeout(() => {
        navigate("/listings");
      }, 2000);
    }
  }, [navigate, isError]);

  return (
    <>
      <Layout>
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
              w="48%">
              <Box mb={8} color="white" fontWeight="semibold">
                <Breadcrumb>
                  <BreadcrumbItem>
                    <BreadcrumbLink as={Link} to="/listings">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href="#">
                      {role.listing_title || "..."}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>
              </Box>
              <RoleCard
                id={id}
                title={role.listing_title}
                description={role.listing_desc}
                skillsRequired={role.skills}
                country={role.country}
                department={role.dept}
                creator={role.created_by_name}
                dateCreated={
                  role.created_date == ""
                    ? ""
                    : formatDateTime(role.created_date)
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
      </Layout>
    </>
  );
};

export default RoleView;
