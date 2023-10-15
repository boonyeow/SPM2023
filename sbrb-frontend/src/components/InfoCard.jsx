import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Link,
  Progress,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  IoBusinessOutline,
  IoGlobeOutline,
  IoPeopleOutline,
} from "react-icons/io5";

const InfoCard = ({ progress }) => {
  let progressText;
  if (progress >= 0 && progress < 25) {
    progressText = "Poorly matched with your profile";
  } else if (progress >= 25 && progress < 50) {
    progressText = "Fairly matched with your profile";
  } else if (progress >= 50 && progress < 75) {
    progressText = "Decently matched with your profile!";
  } else if (progress >= 75 && progress <= 100) {
    progressText = "Perfectly match with your profile!";
  }
  return (
    <Card
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.2)" // Adjust the values as needed
      borderRadius="25px">
      <CardHeader pb={0}>
        <Flex>
          <Image
            boxSize="100px"
            objectFit="cover"
            src="/logo.png"
            alt="All-In-One Logo"
          />
          <Box mt={6}>
            <Heading size="sm">All-In-One</Heading>
            <Text mt={1} fontSize="xs">
              Printing Solution Equipment Servicing Company
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody pt={0} pl={14}>
        <VStack align="flex-start" spacing={4} fontSize="md">
          <HStack spacing={8}>
            <Icon as={IoPeopleOutline} boxSize={8} />
            <Text>500 - 1000 employees</Text>
          </HStack>
          <HStack spacing={8}>
            <Icon as={IoBusinessOutline} boxSize={8} />
            <Text>Singapore, Singapore</Text>
          </HStack>
          <HStack spacing={8}>
            <Icon as={IoGlobeOutline} boxSize={8} />
            <Link href="https://www.smu.edu.sg/" isExternal>
              https://www.printing.com/
            </Link>
          </HStack>
        </VStack>
      </CardBody>
      <CardFooter pt={5} px={14}>
        <Box w="100%">
          <Flex fontWeight="semibold" mb={2}>
            <Text>{progressText}</Text>
            <Spacer />
            <Text>{progress}%</Text>
          </Flex>
          <Progress
            colorScheme="green"
            size="md"
            value={progress}
            borderRadius="25px"
          />
          <Box my={5}>
            <Button w="100%" h={14} colorScheme="facebook">
              Apply Now!
            </Button>
          </Box>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default InfoCard;
