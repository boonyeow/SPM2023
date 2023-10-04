import Layout from "../components/Layout";

import { Badge, Box, Flex, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";

function JobApplicants() {
  return (
    <>
  <Layout>
    <Flex align="center" justify="center">
  <Box w="90%" p={20}>
 
    <Grid
    h='100vh'
    templateRows='repeat(2, 1fr)'
    templateColumns='repeat(5, 1fr)'
    gap={4}
    >
  <GridItem rowSpan={2} colSpan={4} >
  <Box h="100%" overflow="auto">
    <Stack spacing={4}>
     {
      applicantsData.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))
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
      name: 'Smith',
      listing_title: 'Sales Manager',
      desc: 'Description for Sales Manager',
      country: 'United States',
      date: '2023-09-15',
      skills: ['Sales Strategy', 'Team Leadership', 'Customer Relationship'],
    },
    {
      name: 'Doe',
      listing_title: 'Software Engineer',
      desc: 'Description for Software Engineer',
      country: 'Canada',
      date: '2023-09-20',
      skills: ['Java', 'Python', 'Web Development'],
    },
    {
      name: 'Johnson',
      listing_title: 'HR Specialist',
      desc: 'Description for HR Specialist',
      country: 'United Kingdom',
      date: '2023-08-05',
      skills: ['Recruitment', 'Employee Relations', 'HR Policies'],
    },
  ];
  
function Feature({ name, desc, date, skills, ...rest }) {
  return (
    <Box p={5} shadow='md' borderWidth='1px' {...rest}>
      <Heading fontSize='xl'>{name}</Heading>
      <Text mt={4}>{desc}</Text>
      <Text>Date Applied: {date}</Text>
      {skills.map((skill) => (
        <Badge ml="1" fontSize="0.8em" colorScheme="green" key={skill}>
          {skill}
        </Badge>
      ))}
    </Box>
  )
}


export default JobApplicants;