import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  Skeleton,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";

const RoleCard = ({
  title,
  description,
  skillsRequired,
  country,
  department,
  creator,
  dateCreated,
  isLoading,
}) => {
  return (
    <Card
      py={2}
      px={4}
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.2)" // Adjust the values as needed
      borderRadius="25px"
      h={`calc(100% + 137px)`}>
      <CardHeader>
        {isLoading ? (
          <Stack>
            <Skeleton height="30px" />
            <Skeleton height="5px" width="300px" />
          </Stack>
        ) : (
          <>
            <Heading size="lg">{title}</Heading>
            <Flex mt={3} fontWeight="semibold">
              <Text as="sub" mr={3}>
                Created: {creator}
              </Text>
              <Text as="sub">Last Updated: {dateCreated}</Text>
            </Flex>
          </>
        )}
      </CardHeader>
      <CardBody pt={4} pb={8}>
        <Box mb={5}>
          {isLoading ? (
            <Skeleton height="10px" width="200px" />
          ) : (
            <Text fontWeight="semibold">
              {country} &nbsp; - &nbsp; {department}
            </Text>
          )}
        </Box>
        <Box spacing={2} mb={8}>
          {isLoading ? (
            <Flex>
              {new Array(4).fill(0).map((_, index) => {
                return (
                  <Skeleton key={index} width="75px" height="17px" mr={3} />
                );
              })}
            </Flex>
          ) : (
            skillsRequired.map((skill, index) => {
              return (
                <Badge
                  as="span"
                  key={index}
                  bg="blackAlpha.100"
                  py={1}
                  px={3}
                  mr={2}
                  mb={2}
                  borderRadius="full"
                  fontWeight="semibold">
                  {skill}
                </Badge>
              );
            })
          )}
        </Box>
        <Box>
          <Text fontWeight="semibold" mb={1}>
            Description
          </Text>
          {isLoading ? (
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          ) : (
            <Text whiteSpace="pre-wrap">{description}</Text>
          )}
        </Box>
      </CardBody>
    </Card>
  );
};

export default RoleCard;
