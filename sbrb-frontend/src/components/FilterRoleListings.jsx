import axios from "axios";

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

function FilterRoleListing({ onFilterChange, resetFilters }) {
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],

    skills: [],
  });

  const filterCategories = [
    {
      title: "Department",
      values: departments,
      key: "departments",
    },
    {
      title: "Country",
      values: countries,
    },
    {
      title: "Skills",
      values: skills,
      key: "skills",
    },
  ];

  const handleCheckboxChange = (categoryKey, selectedValues) => {
    setSelectedFilters({
      ...selectedFilters,
      [categoryKey]: selectedValues,
    });
  };

  const getCheckedValues = () => {
    const checkedValues = {};

    for (const categoryKey in selectedFilters) {
      checkedValues[categoryKey] = selectedFilters[categoryKey];
    }

    return checkedValues;
  };

  const handleFilterButtonClick = () => {
    const checkedValues = getCheckedValues();
    onFilterChange(checkedValues);
  };

  const handleResetFiltersClick = () => {
    resetFilters();
    setSelectedFilters({
      departments: [],
    });
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/listings`)
      .then((response) => {
        const data = response.data;
        const extractedCountries = [
          ...new Set(data.map((item) => item.country)),
        ];
        const extractedDepartments = [
          ...new Set(data.map((item) => item.dept)),
        ];
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
        setSkills(extractedSkills);
      })
      .catch((error) => {
        console.error("Error fetching role listings:", error);
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
              <CheckboxGroup
                colorScheme="blue"
                value={selectedFilters[category.key]}
                onChange={(selectedValues) =>
                  handleCheckboxChange(category.key, selectedValues)
                }>
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

      <Button mt={8} onClick={handleFilterButtonClick}>
        Apply Filter
      </Button>

      <Button mt={4} onClick={handleResetFiltersClick}>
        Reset Filters
      </Button>
    </>
  );
}

export default FilterRoleListing;
