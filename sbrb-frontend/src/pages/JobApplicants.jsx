import Layout from "../components/Layout";

import {
  Badge,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

const JobApplicants = () => {
  return (
    <>
      <Layout />
      <Box w="6xl" mx="auto">
        <Box mt={10}>
          <Card borderRadius="2rem" px="20px" py="10px">
            <CardHeader>
              <Heading size="md">Job Applicants</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing="4">
                <Box position="relative">
                  <Heading size="xs" textTransform="uppercase">
                    John Smith
                  </Heading>
                  <Text mt="2" fontSize="sm">
                    Applied on 2021-09-15
                  </Text>
                  <Text mt="2" fontSize="sm">
                    Skills matched: 85%
                  </Text>
                  <Text mt={3} fontWeight="semibold">
                    Skills:
                  </Text>
                  <Box mt={2}>
                    <HStack>
                      <Badge>lol</Badge>
                    </HStack>
                  </Box>
                  <Box position="absolute" top="50%" right="0">
                    View
                  </Box>
                </Box>
              </Stack>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </>
  );
};

const applicantsData = [
  {
    name: "Smith",
    listing_title: "Sales Manager",
    desc: "Description for Sales Manager",
    country: "United States",
    date: "2023-09-15",
    skills: ["Sales Strategy", "Team Leadership", "Customer Relationship"],
  },
  {
    name: "Doe",
    listing_title: "Software Engineer",
    desc: "Description for Software Engineer",
    country: "Canada",
    date: "2023-09-20",
    skills: ["Java", "Python", "Web Development"],
  },
  {
    name: "Johnson",
    listing_title: "HR Specialist",
    desc: "Description for HR Specialist",
    country: "United Kingdom",
    date: "2023-08-05",
    skills: ["Recruitment", "Employee Relations", "HR Policies"],
  },
];

function Feature({ name, desc, date, skills, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{name}</Heading>
      <Text mt={4}>{desc}</Text>
      <Text>Date Applied: {date}</Text>
      {skills.map((skill) => (
        <Badge ml="1" fontSize="0.8em" colorScheme="green" key={skill}>
          {skill}
        </Badge>
      ))}
    </Box>
  );
}

export default JobApplicants;
