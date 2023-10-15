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

const filterCategories = [
  {
    title: "Department",
    values: [
      "Sales",
      "Consultancy",
      "System Solutioning",
      "Engineering",
      "HR",
      "Finance",
      "IT",
    ],
  },
  {
    title: "Location",
    values: ["Singapore", "Malaysia"],
  },
  {
    title: "Skills",
    values: ["Agile", "Excel"],
  },
];

function FilterRoleListing() {
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
              <CheckboxGroup colorScheme="green" defaultValue={category.values}>
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
