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
  useEffect(() => {
    if (!loginInfo.isLoggedIn) window.location.href = "/";
    const apiUrl = import.meta.env.VITE_API_URL;

    axios
      .get(`${apiUrl}/listings`)
      .then((response) => {
        console.log(response.data);
        setRoleListings(response.data);
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
                h="100vh"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}>
                <GridItem rowSpan={2} colSpan={1}>
                  <FilterRoleListing />
                </GridItem>
                <GridItem rowSpan={2} colSpan={4}>
                  <Box h="100%" overflow="auto">
                    <Stack spacing={4}>
                      {roleListings.length === 0 ? (
                        <Flex justify={"center"} align={"center"}>
                          <Text fontSize="5xl" mr={3}>
                            No open job role listings.
                          </Text>
                          <CloseIcon fontSize="5xl" color="grey" />
                        </Flex>
                      ) : (
                        roleListings.map((roleListingData, index) => (
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
