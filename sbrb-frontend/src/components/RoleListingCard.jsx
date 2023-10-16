import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLoginContext } from "../hooks/useLoginContext";

import { Badge, Box, Button, Heading, Text } from "@chakra-ui/react";

function RoleListingCard({
  title,
  roleListingId,
  desc,
  jobtitle,
  manager,
  createdBy,
  location,
  deadline,
  skills,
  ...rest
}) {

  const { loginInfo } = useLoginContext();

  useEffect(() => {
    if (!loginInfo.isLoggedIn) window.location.href = "/";
  }, [loginInfo]);

  return (
<Box p={5} shadow="md" borderWidth="1px" {...rest} position="relative" borderRadius="lg">
  {loginInfo.role === 'HR' && (
    <Link to={`/listings/${roleListingId}/applications`}>
      <Box
        position="absolute"
        top={2}
        right={2}
        colorScheme="blue"
        _hover={{ bg: 'blue.700' }}
        _active={{ bg: 'blue.600' }}
        borderRadius="lg"
      >
        <Button id="viewJobButton" colorScheme="blue">
          View Job Applicants
        </Button>
      </Box>
    </Link>
  )}

      <Link  to={`/listings/${roleListingId}`}
                          key={roleListingId}>   
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={2}>Job Title: {jobtitle}</Text>
      <Text mt={4}>{desc}</Text>
      <Text mt={2}>Created By: {createdBy}</Text>
      <Text mt={2}>Country: {location}</Text>
      <Text mt={2}>Reporting Manager: {manager}</Text>
      <Text mt={2}>Skills Required:</Text>
      {skills.map((skill) => (
        <Badge ml="1" fontSize="0.8em" colorScheme="blue" key={skill}>
          {skill}
        </Badge>
      ))}
      <Text mt={2}>Application deadline: {deadline}</Text>
      </Link>
    </Box>
  );
}

export default RoleListingCard;
