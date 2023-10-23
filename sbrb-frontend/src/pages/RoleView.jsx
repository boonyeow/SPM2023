import InfoCard from "../components/InfoCard";
import Layout from "../components/Layout";
import RoleCard from "../components/RoleCard";
import Swal from "sweetalert2";
import axios from "axios";
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
import { formatDateTime, getRoleSkillMatch } from "../service";
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
    expiry_date: "",
    applied: true,
  });
  const [percentageMatched, setPercentageMatched] = useState(0);

  const { isLoading, isError } = useQuery({
    queryKey: ["role listing"],
    queryFn: async () => {
      const res = await axios.get(
        `${apiUrl}/listings/${id}?user_id=${loginInfo.userId}`
      );
      const profileRes = await axios.get(`${apiUrl}/staff/${loginInfo.userId}`);
      const percentMatch = getRoleSkillMatch(
        profileRes.data.skills,
        res.data.skills
      );
      setPercentageMatched(percentMatch);
      setRole(res.data);
      return res.data;
    },
    retry: 3,
    enabled: loginInfo.isLoggedIn,
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
            bg="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(228,229,255,1) 30%, rgba(219,232,255,1) 64%, rgba(193,229,252,1) 100%, rgba(255,228,228,1) 100%)"
            w="100%"
            h="200px" // Adjust the height as needed
          />
          <Flex justify="space-between" px={4} py={8}>
            <Spacer />
            <Box
              position="relative" // To make it overlap with the image
              top={-48} // To make it protrude the bottom of the image
              w="47%">
              <Box mb={8}>
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
                country={role.country_name}
                department={role.department_name}
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
              <InfoCard
                progress={percentageMatched}
                userId={loginInfo.userId}
                listingId={id}
                expiryDate={role.expiry_date}
                hasApplied={role.applied}
              />
            </Box>
            <Spacer />
          </Flex>
        </Box>
      </Layout>
    </>
  );
};

export default RoleView;
