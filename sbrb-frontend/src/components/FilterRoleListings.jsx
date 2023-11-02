import { useState } from "react";
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

function FilterRoleListing({ onFilterChange, resetFilters }) {
  const countries = [
    "Malaysia",
    "Hong Kong",
    "Indonesia",
    "Vietnam",
    "Singapore",
  ];
  const departments = [
    "Chariman",
    "CEO",
    "Consultancy",
    "Engineering",
    "Finance",
    "HR",
    "IT",
    "Sales",
    "Solutioning",
  ];
  const skills = [
    "Account Management",
    "Accounting and Tax Systems",
    "Accounting Standards",
    "Applications Development",
    "Applications Integration",
    "Applications Support and Enhancement",
    "Audit Compliance",
    "Audit Frameworks",
    "Automated Equipment and Control Configuration",
    "Budgeting",
    "Business Acumen",
    "Business Development",
    "Business Environment Analysis",
    "Business Needs Analysis",
    "Business Negotiation",
    "Business Presentation Delivery",
    "Business Requirements Mapping",
    "Business Risk Management",
    "Call Centre Management",
    "Collaboration",
    "Communication",
    "Configuration Tracking",
    "Customer Acquisition Management",
    "Customer Relationship Management",
    "Data Analytics",
    "Database Administration",
    "Developing People",
    "Digital Fluency",
    "Employee Communication Management",
    "Employee Engagement Management",
    "Finance Business Partnering",
    "Financial Acumen",
    "Financial Closing",
    "Financial Management",
    "Financial Planning",
    "Financial Reporting",
    "Financial Statements Analysis",
    "Financial Transactions",
    "Human Resource Advisory",
    "Human Resource Practices Implementation",
    "Human Resource Strategy Formulation",
    "Human Resource Systems Management",
    "Infrastructure Deployment",
    "Infrastructure Support",
    "Learning and Development Programme Management",
    "Learning Needs Analysis",
    "Network Administration and Maintenance",
    "Onboarding",
    "Organisational Design",
    "People and Performance Management",
    "Pricing Strategy",
    "Problem Management",
    "Problem Solving",
    "Product Management",
    "Professional and Business Ethics",
    "Project Management",
    "Regulatory Compliance",
    "Regulatory Risk Assessment",
    "Regulatory Strategy",
    "Sales Closure",
    "Sales Strategy",
    "Security Administration",
    "Sense Making",
    "Service Level Management",
    "Skills Framework Adoption",
    "Software Configuration",
    "Software Design",
    "Software Testing",
    "Solution Architecture",
    "Solutions Design Thinking",
    "SOP Development and Implementation",
    "Stakeholder Management",
    "Strategy Planning",
    "System Integration",
    "Talent Management",
    "Tax Computation",
    "Tax Implications",
    "Technology Application",
    "Technology Integration",
    "Technology Road Mapping",
    "User Interface Design",
  ];
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],
    countries: [],
  });

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
    {
      title: "Availability",
      values: ["Available", "Expired"],
      key: "availability",
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
    const checkedValues = {
      departments: [],
      countries: [],
      skills: [],
      availability: [],
    };

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
      availability: [],
    });
    setSelectedSkills([]);
  };

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
