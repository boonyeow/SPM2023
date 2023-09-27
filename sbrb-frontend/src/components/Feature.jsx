import { Box, Heading, Text } from '@chakra-ui/react';

function Feature({ title, desc,manager, location, startDate,  deadline, percentageMatch, ...rest }) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
        <Text>Country: {location}</Text>
        <Text>Reporting Manager: {manager}</Text>
        <Text>Application starting date: {startDate}</Text>
        <Text>Application deadline: {deadline}</Text>
        <Text>Skills Match: {percentageMatch}</Text>
      </Box>
    )
}

// proj cla say got starting date
// ○     Role Title
// ○     Location of Job
// ○     Short Role Description
// ○     Required skills for the role.
// ○     Application deadline for the role.
// ○     Percentage of my skills matching the role's requirements

export default Feature;