import { CloseIcon } from "@chakra-ui/icons";
import FilterRoleListing from "../components/FilterRoleListings";
import Layout from "../components/Layout";
import RoleListingCard from "../components/RoleListingCard";
import axios from "axios";
import { useLoginContext } from "../hooks/useLoginContext";

import { Box, Flex, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Home = () => {
  const { loginInfo } = useLoginContext();
  const [roleListings, setRoleListings] = useState([]);
  const [availableRoleListings, setAvailableRoleListings] = useState([]);
  const [expiredRoleListings, setExpiredRoleListings] = useState([]);
  const [filteredRoleListings, setFilteredRoleListings] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFilterChange = (checkedValues) => {
    let filteredListings = [...roleListings];
    const isAllUnchecked = Object.values(checkedValues).every(
      (values) => values.length === 0
    );

    if (!isAllUnchecked) {
      if (checkedValues.availability.length == 2) {
        filteredListings = [...roleListings];
      } else if (checkedValues.availability.length == 1) {
        if (checkedValues.availability.includes("Expired")) {
          filteredListings = [...expiredRoleListings];
        } else {
          filteredListings = [...availableRoleListings];
        }
      }

      if (checkedValues.departments.length > 0) {
        filteredListings = filteredListings.filter((listing) =>
          checkedValues.departments.includes(listing.department_name)
        );
      }

      if (checkedValues.skills.length > 0) {
        filteredListings = filteredListings.filter((listing) =>
          checkedValues.skills.every((skill) => listing.skills.includes(skill))
        );
      }

      if (checkedValues.countries.length > 0) {
        filteredListings = filteredListings.filter((listing) =>
          checkedValues.countries.includes(listing.country_name)
        );
      }
    } else {
      filteredListings = [];
    }
    setFilteredRoleListings(filteredListings);
  };

  const resetFilters = () => {
    axios
      .get(`${apiUrl}/listings`)
      .then((response) => {
        setRoleListings(response.data);
        setFilteredRoleListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching role listings:", error);
      });
  };
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!loginInfo.isLoggedIn) window.location.href = "/";
    axios
      .get(`${apiUrl}/listings`)
      .then((response) => {
        setRoleListings(response.data);
        setFilteredRoleListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching role listings:", error);
      });

    axios
      .get(`${apiUrl}/listings?active=false`)
      .then((response) => {
        setExpiredRoleListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching role listings:", error);
      });
    axios
      .get(`${apiUrl}/listings?active=true`)
      .then((response) => {
        setAvailableRoleListings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching role listings:", error);
      });
  }, [loginInfo]);

  return (
    <>
      <Layout>
        <Box>
          <Flex align="center" justify="center" pl="3">
            {/* display all jobs */}
            <Box w="90%" p={20}>
              <Grid
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}>
                <GridItem rowSpan={2} colSpan={1}>
                  <FilterRoleListing
                    onFilterChange={handleFilterChange}
                    resetFilters={resetFilters}
                  />
                </GridItem>
                <GridItem rowSpan={2} colSpan={4}>
                  <Box h="100%" overflow="auto">
                    <Stack spacing={4}>
                      {filteredRoleListings.length === 0 ? (
                        <Flex justify={"center"} align={"center"}>
                          <Text fontSize="4xl" mr={3}>
                            {roleListings.length == 0
                              ? "No job role listings."
                              : "Please select the filters to filter the role listings."}
                          </Text>
                          {roleListings.length == 0 && (
                            <CloseIcon fontSize="4xl" color="grey" />
                          )}
                        </Flex>
                      ) : (
                        filteredRoleListings.map((roleListingData, index) => (
                          <RoleListingCard key={index} {...roleListingData} />
                        ))
                      )}
                    </Stack>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  );
};

export default Home;
