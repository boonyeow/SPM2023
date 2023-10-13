import Layout from "../components/Layout";
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
import { Select } from "antd";

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
      <Layout />
      <Box w="8xl" mx="auto">
        <Breadcrumb mt={6}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Role Listings</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink href="#">Name of Role Listing</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Job applicants</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box mt={10}>
          <Heading mb={7}> Job Applicants </Heading>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: (
                                <Icon
                                  as={BiSolidUpArrow}
                                  transform="translateY(2px)"
                                  ml={2}
                                />
                              ),
                              desc: (
                                <Icon
                                  as={BiSolidDownArrow}
                                  transform="translateY(2px)"
                                  ml={2}
                                />
                              ),
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex mt={4} alignItems="center">
            <Select
              placeholder="Select Page Size"
              value={selectedPageSize}
              onChange={(e) => {
                table.setPageSize(Number(e));
              }}
              style={{ width: "150px" }}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </Select>
            <Spacer />
            <Box mr={5}>
              <Text fontWeight="semibold">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </Text>
            </Box>
            <ButtonGroup variant="outline" spacing="2">
              <Button
                onClick={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}>{`<<`}</Button>
              <Button
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}>{`<`}</Button>
              <Button
                onClick={() => table.nextPage()}
                isDisabled={!table.getCanNextPage()}>{`>`}</Button>
              <Button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                isDisabled={!table.getCanNextPage()}>{`>>`}</Button>
            </ButtonGroup>
          </Flex>
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

export default JobApplicants;
