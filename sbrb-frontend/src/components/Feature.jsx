import { Badge, Box, Heading, Text } from "@chakra-ui/react";

function Feature({
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
      <Text>Country: {location}</Text>
      <Text>Reporting Manager: {manager}</Text>
      <Text>Skills Required:</Text>
      {skills.map((skill) => (
        <Badge ml="1" fontSize="0.8em" colorScheme="green" key={skill}>
          {skill}
        </Badge>
      ))}
      <Text>Application deadline: {deadline}</Text>
    </Box>
  );
}

export default Feature;
