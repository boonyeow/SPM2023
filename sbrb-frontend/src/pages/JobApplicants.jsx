import Layout from "../components/Layout";
import axios from "axios";
import { useLoginContext } from "../hooks/useLoginContext";
import { useQuery } from "@tanstack/react-query";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Select,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getMatchedSkills, getRoleSkillMatch } from "../service";
import { useEffect, useMemo, useState } from "react";

const columnHelper = createColumnHelper();

const customScrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "7px",
    height: "7px",
    cursor: "pointer",
    background: "gray.200",
    borderRadius: "8px",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "gray.400",
    borderRadius: "8px",
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "gray.600",
  },
};

const JobApplicants = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { loginInfo } = useLoginContext();

  function renderTableBody() {
    return table.getRowModel().rows.map((row) =>
      table.getRowModel().rows.length != 0 ? (
        <Tr
          key={row.id}
          color="black"
          transition=".20s ease-out"
          _hover={{
            cursor: "pointer",
            bg: "gray.100",
            transform: "scale(1.005)",
          }}
          onClick={() => navigate(`/profile/${row.original.id}`)}>
          {row.getVisibleCells().map((cell) => (
            <Td key={cell.id}>
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </Td>
          ))}
        </Tr>
      ) : (
        <Tr key="0">
          <Td colSpan="7">
            <Text textAlign="center" w="100%" py={5} fontWeight="semibold">
              No Applicants
            </Text>
          </Td>
        </Tr>
      )
    );
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("firstName", {
        header: () => "First Name",
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        header: () => "Last Name",
      }),
      columnHelper.accessor("email", {
        header: () => "Email",
      }),
      columnHelper.accessor("currentRole", {
        header: "Current Role",
      }),
      columnHelper.accessor("country", {
        header: () => "Country",
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

  const [data, setData] = useState([]);

  const { data: listingData } = useQuery({
    queryKey: ["listing"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/listings/${id}`);
      return res.data;
    },
    retry: 3,
  });
  const { isLoading, isError } = useQuery({
    queryKey: ["applicants"],
    queryFn: async () => {
      const res = await axios.get(`${apiUrl}/listings/${id}/applicants`);
      const applicants = [];
      for (const applicant of res.data) {
        const percentage = getRoleSkillMatch(
          applicant.staff.skills,
          listingData.skills
        );
        const matchedSkills = getMatchedSkills(
          applicant.staff.skills,
          listingData.skills
        );
        const item = {
          id: applicant.staff.staff_id,
          firstName: applicant.staff.staff_fname,
          lastName: applicant.staff.staff_lname,
          email: applicant.staff.email,
          currentRole: applicant.staff.dept,
          country: applicant.staff.country,
          matchedPercentage: `${percentage.toFixed(2)}%`,
          skillsMatched:
            matchedSkills.length == 0 ? "Nil" : matchedSkills.join(", "),
        };
        applicants.push(item);
      }
      setData(applicants);
      return applicants;
    },
    retry: 3,
    enabled: !!listingData,
  });

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

  useEffect(() => {
    if (loginInfo.isLoggedIn != undefined && !loginInfo.isLoggedIn)
      navigate("/");

    if (loginInfo.role != undefined && loginInfo.role == "User")
      navigate("/listings");
  }, [navigate, loginInfo]);

  useEffect(() => {
    if (isError) navigate("/listings");
  }, [navigate, isError]);

  return (
    <>
      <Layout />
      <Box w="8xl" mx="auto">
        <Breadcrumb mt={10}>
          <BreadcrumbItem>
            <BreadcrumbLink href="/listings">Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink as={Link} to={`/listings/${id}`}>
              {listingData ? listingData.listing_title : "..."}
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#">Job applicants</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Box mt={10}>
          <Heading mb={7}> Job Applicants </Heading>
          <TableContainer overflow="scroll" sx={customScrollbarStyle}>
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
                {isLoading ? (
                  <Tr>
                    <Td colSpan="7">
                      <Box mx="auto" w="100%" textAlign="center" py={5}>
                        <Spinner size="md" />
                      </Box>
                    </Td>
                  </Tr>
                ) : (
                  renderTableBody()
                )}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex mt={4} alignItems="center">
            <Box w="150px">
              <Select
                value={selectedPageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}>
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </Select>
            </Box>
            <Spacer />
            <Box mr={5}></Box>
            <ButtonGroup variant="outline" spacing="2">
              <Button
                onClick={() => table.setPageIndex(0)}
                isDisabled={!table.getCanPreviousPage()}>{`<<`}</Button>
              <Button
                onClick={() => table.previousPage()}
                isDisabled={!table.getCanPreviousPage()}>{`<`}</Button>
            </ButtonGroup>

            <Text fontWeight="semibold" mx={5}>
              Page{" "}
              {table.getPageCount() == 0
                ? 0
                : table.getState().pagination.pageIndex + 1}{" "}
              of {table.getPageCount()}
            </Text>
            <ButtonGroup variant="outline" spacing="2">
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

export default JobApplicants;
