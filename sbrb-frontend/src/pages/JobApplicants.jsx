import { CloseIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text
} from "@chakra-ui/react";

function JobApplicants() {
  const {id} = useParams();
  return (
    <>
  <Layout>
    <Flex align="center" justify="center">
  <Box w="90%" p={20}>
 
    <Grid
    h='100vh'
    templateRows='repeat(2, 1fr)'
    templateColumns='repeat(3, 1fr)'
    gap={4}
    >

<Box mb={8} fontWeight="semibold">
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/listings">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Role Listings</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">
                  {id ? `Job ${id}` : 'test'}
                </BreadcrumbLink>
              </BreadcrumbItem>
              </Breadcrumb>
            </Box>
    <GridItem rowSpan={2} colSpan={3} >
    <Box h="100%" overflow="auto">
      <Stack spacing={4}>
      {
        (applicantsData.length === 0) ? (
          <Flex justify={"center"} align={"center"}>
            <Text fontSize='5xl' mr={3}>No applicants have applied for this job.</Text>
            <CloseIcon fontSize='5xl' color="grey" />
          </Flex>) :(
        applicantsData.map((feature, index) => (
          <JobApplicantsCard key={index} {...feature} />
        )) )
      }

      </Stack>
    </Box>
        
    </GridItem>
  </Grid>
  
  </Box> 
  </Flex>

   </Layout>
  </>  )
}

const applicantsData = [
    {
      staff_fname: 'Sam',
      staff_lname: 'Smith',
      email:'abc@allin1.com',
      staff_id: '130001',
      listing_title: 'Software Engineer',
      desc: 'Sales Manager',
      country: 'United States',
      date: '2023-09-15',
      skills: ['Sales Strategy', 'Team Leadership', 'Customer Relationship'],
    },
    {
      staff_fname: 'Doe',
      staff_lname: 'Dee',
      email:'abc@allin1.com',
      staff_id: '130002',
      listing_title: 'Software Engineer',
      desc: 'Software Engineer',
      country: 'Canada',
      date: '2023-09-20',
      skills: ['Java', 'Python', 'Web Development'],
    },
    {
      staff_fname: 'Ti',
      staff_lname: 'Ta',
      email:'abc@allin1.com',
      staff_id: '130003',
      listing_title: 'Software Engineer',
      desc: 'HR Specialist',
      country: 'United Kingdom',
      date: '2023-08-05',
      skills: ['Recruitment', 'Employee Relations', 'HR Policies'],
    },
  ];
  
function JobApplicantsCard({ staff_fname, staff_lname, staff_id, desc, date, skills, ...rest }) {
  return (
    <Link to={`/profile/${staff_id}`}>
      <Box p={5} shadow='md' borderWidth='1px' {...rest} borderRadius="lg">
        <Heading fontSize='xl'>{staff_fname} {staff_lname}</Heading>
        <Text>Staff Id: {staff_id}</Text>
        <Text mt={4}>Current job: {desc}</Text>
        <Text>Date Applied: {date}</Text>
        <Text>
          Skills:  {skills.map((skill) => (
          <Badge ml="1" fontSize="0.8em" colorScheme="green" key={skill}>
            {skill}
          </Badge>
        ))}
        </Text> 
         
      </Box>
    </Link>
  )
}


export default JobApplicants;