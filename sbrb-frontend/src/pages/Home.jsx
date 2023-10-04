import FilterRoleListing from "../components/FilterRoleListings";
import Layout from "../components/Layout";
import RoleListingCard from "../components/RoleListingCard";
import { Box, Flex, Grid, GridItem, Stack } from "@chakra-ui/react";

const RoleListings = [
  {
    roleListingId: 1,
    title: "Software Engineer",
    manager: "John Smith",
    desc: "Experienced software engineer with expertise in web development and cloud computing.",
    skills: ["JavaScript", "React", "Node.js", "AWS", "SQL"],
    location: "San Francisco, CA",
    deadline: "2023-12-31",
  },
  {
    roleListingId: 2,
    title: "Digital Marketing Specialist",
    manager: "Emily Davis",
    desc: "Digital marketing specialist with a proven track record in SEO, SEM, and content marketing.",
    skills: ["SEO", "SEM", "Content Marketing", "Google Analytics"],
    location: "New York, NY",
    deadline: "2023-11-30",
  },
  {
    roleListingId: 3,
    title: "Data Scientist",
    manager: "Dr. Sarah Johnson",
    desc: "Data scientist with expertise in machine learning and data analysis. Strong analytical skills.",
    skills: [
      "Machine Learning",
      "Python",
      "Data Analysis",
      "Statistical Modeling",
    ],
    location: "Chicago, IL",
    deadline: "2023-10-15",
  },
  {
    roleListingId: 4,
    title: "UX/UI Designer",
    manager: "Alex Wilson",
    desc: "Creative UX/UI designer with a passion for creating user-centered design solutions.",
    skills: ["UI/UX Design", "Sketch", "Figma", "User Research"],
    location: "Los Angeles, CA",
    deadline: "2023-11-15",
  },
];

const Home = () => {
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
                      {RoleListings.map((roleListingData) => (
                        <RoleListingCard
                          key={roleListingData.roleListingId}
                          {...roleListingData}
                        />
                      ))}
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
