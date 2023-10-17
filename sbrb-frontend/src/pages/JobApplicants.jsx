import { CloseIcon } from "@chakra-ui/icons";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Heading,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Flex,
  ButtonGroup,
  Spacer,
} from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

const mockData = [
  {
    firstName: "John",
    lastName: "Smith",
    email: "JohnSmith@hotmail.com",
    currentRole: "Software Engineer",
    country: "United States",
    matchedPercentage: "85%",
    skillsMatched: "Java, Python, Web Development",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "JohnSmith@hotmail.com",
    currentRole: "Software Engineer",
    country: "United States",
    matchedPercentage: "95%",
    skillsMatched: "Java, Python, Web Development",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "JohnSmith@hotmail.com",
    currentRole: "Software Engineer",
    country: "United States",
    matchedPercentage: "65%",
    skillsMatched: "Java, Python, Web Development",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "JohnSmith@hotmail.com",
    currentRole: "Software Engineer",
    country: "United States",
    matchedPercentage: "45%",
    skillsMatched: "Java, Python, Web Development",
  },
  {
    firstName: "John",
    lastName: "Smith",
    email: "JohnSmith@hotmail.com",
    currentRole: "Software Engineer",
    country: "United States",
    matchedPercentage: "25%",
    skillsMatched: "Java, Python, Web Development",
  },
];

const columnHelper = createColumnHelper();

const JobApplicants = () => {
  const { id } = useParams();
  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", {
        header: () => <span>First Name</span>,
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        header: () => <span>Last Name</span>,
      }),
      columnHelper.accessor("email", {
        header: () => <span>Email</span>,
      }),
      columnHelper.accessor("currentRole", {
        header: "Current Role",
      }),
      columnHelper.accessor("country", {
        header: () => <span>Country</span>,
      }),
      columnHelper.accessor("matchedPercentage", {
        header: "Percentage Matched",
      }),
      columnHelper.accessor("skillsMatched", {
        header: "Skills Matched",
        enableSorting: false,
      }),
    ],
    []
  );

  const [data, setData] = useState(mockData);
  const [sorting, setSorting] = useState([
    {
      id: "matchedPercentage",
      desc: true,
    },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedPageSize = table.getState().pagination.pageSize;

  return (
    <>
      <Layout>
        <Flex align="center" justify="center">
          <Box w="90%" p={20}>
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
                    {id ? `Job ${id}` : "test"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Grid
              h="100vh"
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(3, 1fr)"
              gap={4}>
              <GridItem rowSpan={2} colSpan={3}>
                <Box h="100%" overflow="auto">
                  <Stack spacing={4}>
                    {applicantsData.length === 0 ? (
                      <Flex justify={"center"} align={"center"}>
                        <Text fontSize="5xl" mr={3}>
                          No applicants have applied for this job.
                        </Text>
                        <CloseIcon fontSize="5xl" color="grey" />
                      </Flex>
                    ) : (
                      applicantsData.map((feature, index) => (
                        <JobApplicantsCard key={index} {...feature} />
                      ))
                    )}
                  </Stack>
                </Box>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Layout>
    </>
  );
};

const applicantsData = [
  {
    staff_fname: "Sam",
    staff_lname: "Smith",
    email: "abc@allin1.com",
    staff_id: "130001",
    listing_title: "Software Engineer",
    desc: "Sales Manager",
    country: "United States",
    date: "2023-09-15",
    skills: ["Sales Strategy", "Team Leadership", "Customer Relationship"],
  },
  {
    staff_fname: "Doe",
    staff_lname: "Dee",
    email: "abc@allin1.com",
    staff_id: "130002",
    listing_title: "Software Engineer",
    desc: "Software Engineer",
    country: "Canada",
    date: "2023-09-20",
    skills: ["Java", "Python", "Web Development"],
  },
  {
    staff_fname: "Ti",
    staff_lname: "Ta",
    email: "abc@allin1.com",
    staff_id: "130003",
    listing_title: "Software Engineer",
    desc: "HR Specialist",
    country: "United Kingdom",
    date: "2023-08-05",
    skills: ["Recruitment", "Employee Relations", "HR Policies"],
  },
];

function JobApplicantsCard({
  staff_fname,
  staff_lname,
  staff_id,
  desc,
  date,
  skills,
  ...rest
}) {
  return (
    <Link to={`/profile/${staff_id}`}>
      <Box p={5} shadow="md" borderWidth="1px" {...rest} borderRadius="lg">
        <Heading fontSize="xl">
          {staff_fname} {staff_lname}
        </Heading>
        <Text>Staff Id: {staff_id}</Text>
        <Text mt={4}>Current job: {desc}</Text>
        <Text>Date Applied: {date}</Text>
        <Text>Skills:</Text>
        <Box>
          {skills.map((skill) => (
            <Badge ml="1" fontSize="0.8em" colorScheme="blue" key={skill}>
              {skill}
            </Badge>
          ))}
        </Box>
      </Box>
    </Link>
  );
}

export default JobApplicants;
