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
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useEffect, useState } from "react";

function FilterRoleListing({ onFilterChange, resetFilters }) {
  const [countries, setCountries] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],
    countries: [],
  });
  const [searchInput, setSearchInput] = useState("");

  const filterCategories = [
    {
      title: "Department",
      values: departments,
      key: "departments",
    },
    {
      title: "Location",
      values: countries,
      key: "countries",
    },
  ];

  const handleSkillSelection = (value) => {
    if (!selectedSkills.includes(value)) {
      setSelectedSkills([...selectedSkills, value]);
    }
    setSearchInput("");
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill !== skillToRemove
    );
    setSelectedSkills(updatedSkills);
  };

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
    const filters = { ...checkedValues, skills: selectedSkills };
    onFilterChange(filters);
  };

  const handleResetFiltersClick = () => {
    resetFilters();
    setSelectedFilters({
      departments: [],
      countries: [],
    });
    setSelectedSkills([]);
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(`${apiUrl}/listings`)
      .then((response) => {
        const data = response.data;
        const extractedCountries = [
          ...new Set(data.map((item) => item.country_name)),
        ];
        const extractedDepartments = [
          ...new Set(data.map((item) => item.department_name)),
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

      <Flex pt="5" w="full">
        <FormControl w="60">
          <FormLabel>Skills</FormLabel>
          <AutoComplete openOnFocus>
            <AutoCompleteInput
              placeholder="Type to search for skills"
              variant="filled"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <AutoCompleteList>
              {skills.map((skill, cid) => (
                <AutoCompleteItem
                  key={`option-${cid}`}
                  value={skill.toString()}
                  textTransform="capitalize"
                  onClick={() => handleSkillSelection(skill.toString())}>
                  {skill.toString()}
                </AutoCompleteItem>
              ))}
            </AutoCompleteList>
          </AutoComplete>
          <FormHelperText></FormHelperText>
        </FormControl>
      </Flex>
      <Flex flexWrap="wrap">
        {selectedSkills.map((skill) => (
          <Tag key={skill} size="lg" marginEnd="2" marginBottom="2">
            <TagLabel>{skill}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
          </Tag>
        ))}
      </Flex>

      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        mt={15}>
        <Button
          onClick={handleFilterButtonClick}
          mr={{ base: 0, md: 4 }}
          mb={{ base: 4, md: 0 }}>
          Apply Filter
        </Button>
        <Button onClick={handleResetFiltersClick}>Reset Filters</Button>
      </Flex>
    </>
  );
}

export default FilterRoleListing;
