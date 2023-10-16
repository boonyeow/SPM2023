import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLoginContext } from "../hooks/useLoginContext";

import { Badge, Box, Button, Heading, Text } from "@chakra-ui/react";

function RoleListingCard({
  listing_title,
  listing_id,
  listing_desc,
  role_name,
  reporting_manager_name,
  created_by,
  country,
  expiry_date,
  created_date,
  skills,
  ...rest
}) {

  const { loginInfo } = useLoginContext();
  const date = new Date(expiry_date);

  const formattedDate = date.toLocaleDateString(); 
  const formattedTime = date.toLocaleTimeString(); 

  const date2 = new Date(created_date);

  const createdDate = date2.toLocaleDateString(); 
  const createdTime = date2.toLocaleTimeString(); 

  
  
  useEffect(() => {
    if (!loginInfo.isLoggedIn) window.location.href = "/";
  }, [loginInfo]);

  return (
<Box p={5} shadow="md" borderWidth="1px" {...rest} position="relative" borderRadius="lg">
  {loginInfo.role === 'HR' && (
    <Link to={`/listings/${listing_id}/applications`}>
      <Box
        position="absolute"
        top={2}
        right={2}
        _hover={{ bg: 'blue.700' }}
        _active={{ bg: 'blue.600' }}
        borderRadius="lg"
      >
        <Button id="viewJobButton" colorScheme="blue" _hover={{ bg: 'blue.700' }}
        _active={{ bg: 'blue.600' }}>
          View Job Applicants
        </Button>
      </Box>
    </Link>
  )}

      <Link  to={`/listings/${listing_id}`}
                          >   
      <Heading fontSize="xl">{listing_title}</Heading>
      <Text mt={2}>Job Title: {role_name}</Text>
      <Text mt={4}>{listing_desc}</Text>
      <Text mt={2}>Created By: {created_by}</Text>
      <Text mt={2}>Country: {country}</Text>
      <Text mt={2}>Reporting Manager: {reporting_manager_name}</Text>
      <Text mt={2}>Skills Required:</Text>
      {skills.map((skill, index) => (
        <Badge ml="1" fontSize="0.8em" colorScheme="blue" key={index}>
          {skill}
        </Badge>
      ))}
      <Text mt={2}>Created On: {createdDate} {createdTime} </Text>
      <Text mt={2}>Application deadline: {formattedDate} {formattedTime}</Text>
      </Link>
    </Box>
  );
}

export default RoleListingCard;
