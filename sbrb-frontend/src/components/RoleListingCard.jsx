import { Badge, Box, Heading, Text } from "@chakra-ui/react";

function RoleListingCard({
  title,
  desc,
  manager,
  location,
  deadline,
  skills,
  ...rest
}) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
      <Text mt={2}>Country: {location}</Text>
      <Text mt={2}>Reporting Manager: {manager}</Text>
      <Text mt={2}>Skills Required:</Text>
      {skills.map((skill) => (
        <Badge ml="1" fontSize="0.8em" colorScheme="green" key={skill}>
          {skill}
        </Badge>
      ))}
      <Text mt={2}>Application deadline: {deadline}</Text>
    </Box>
  );
}

export default RoleListingCard;
