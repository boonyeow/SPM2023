import axios from "axios";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function FilterRoleListing() {

  const [countries, setCountries] = useState([]);
  const [, setRoleListings] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [, setRoleNames] = useState([]);
  const [skills, setSkills] = useState([]);
const filterCategories = [
  {
    title: "Department",
    values: departments,
  },
  {
    title: "Country",
    values: countries,
  },
  {
    title: "Skills",
    values: skills
  },
];

useEffect(() => {
  const apiUrl = import.meta.env.VITE_API_URL;
  axios
    .get(`${apiUrl}/listings`)
    .then((response) => {
      const data = response.data;
      const extractedCountries = [...new Set(data.map((item) => item.country))];
      const extractedDepartments = [...new Set(data.map((item) => item.dept))];
      const extractedRoleNames = [...new Set(data.map((item) => item.role_name))];
      const extractedSkills = [];
      
      data.forEach((item) => {
        item.skills.forEach((skill) => {
          if (!extractedSkills.includes(skill)) {
            extractedSkills.push(skill);
          }
        });
      });

      setCountries(extractedCountries);
      setDepartments(extractedDepartments);
      setRoleNames(extractedRoleNames);
      setRoleListings(data);
      setSkills(extractedSkills);
    })
    .catch((error) => {
      console.error('Error fetching role listings:', error);
    });
}, []);

  return (
    <>
      <Heading as="h5" size="sm">
        Filter by
      </Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {filterCategories.map((category, index) => (
          <AccordionItem key={index}>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  {category.title}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <CheckboxGroup colorScheme="blue" defaultValue={category.values}>
                <Stack spacing={[1]} direction={["column"]}>
                  {category.values.map((value) => (
                    <Checkbox key={value} value={value}>
                      {value}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}

export default FilterRoleListing;
