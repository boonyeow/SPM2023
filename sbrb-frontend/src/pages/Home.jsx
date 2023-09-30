import Layout from "../components/Layout";
import NavBar from "../components/NavBar";
import {Box, Stack, Grid, GridItem, Flex, Text, HStack} from '@chakra-ui/react';
// import Feature from '../components/Feature';


const featuresData = [
  {
    title: 'Software Engineer',
    manager: 'John Smith',
    desc: 'Experienced software engineer with expertise in web development and cloud computing.',
    skills: ['JavaScript', 'React', 'Node.js', 'AWS', 'SQL'],
    location: 'San Francisco, CA',
    deadline: '2023-12-31',
  },
  {
    title: 'Digital Marketing Specialist',
    manager: 'Emily Davis',
    desc: 'Digital marketing specialist with a proven track record in SEO, SEM, and content marketing.',
    skills: ['SEO', 'SEM', 'Content Marketing', 'Google Analytics'],
    location: 'New York, NY',
    deadline: '2023-11-30',
  },
  {
    title: 'Data Scientist',
    manager: 'Dr. Sarah Johnson',
    desc: 'Data scientist with expertise in machine learning and data analysis. Strong analytical skills.',
    skills: ['Machine Learning', 'Python', 'Data Analysis', 'Statistical Modeling'],
    location: 'Chicago, IL',
    deadline: '2023-10-15',
  },
  {
    title: 'UX/UI Designer',
    manager: 'Alex Wilson',
    desc: 'Creative UX/UI designer with a passion for creating user-centered design solutions.',
    skills: ['UI/UX Design', 'Sketch', 'Figma', 'User Research'],
    location: 'Los Angeles, CA',
    deadline: '2023-11-15',
  },
];




const Home = () => {
  return (
  <>
  <Layout>
  <Box>
  <Flex align="center" justify="center" pl='3'>

{/* display all jobs */}
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
     {/* {
      featuresData.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))
     } */}

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
