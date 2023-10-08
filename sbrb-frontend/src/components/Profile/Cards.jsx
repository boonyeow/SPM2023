import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  HStack,
  Image,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  StackDivider,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

const ProfileHeadCard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card variant="elevated" overflow="hidden" borderRadius="25px">
        <CardHeader p="0">
          <Box position="relative">
            <Box
              w="100%"
              h="200px"
              bgGradient={[
                "linear(to-tr, teal.300, yellow.400)",
                "linear(to-t, blue.200, teal.500)",
                "linear(to-b, orange.100, purple.300)",
              ]}
            />
            <Box>
              <Image
                borderRadius="full"
                boxSize="150px"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
                position="absolute"
                bottom="-60px"
                left="20"
                border="4px white solid"
              />
            </Box>
          </Box>
        </CardHeader>
        <CardBody pt={0} px={0}>
          <Box position="relative" px={14}>
            <Box pt={20} pb={5} fontWeight="semibold">
              <Text fontSize="2xl" mb={2}>
                Joseph the Legend
              </Text>
              <Text fontSize="md" mb={2}>
                Product Manager | Senior Professor | God of PMs
              </Text>
              <HStack gap={4} mb={2}>
                <Text color="blackAlpha.700">Singapore, Singapore</Text>
                <Text fontSize="xl"> · </Text>
                <Text
                  color="blue.600"
                  _hover={{
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={onOpen}>
                  Contact Info
                </Text>
              </HStack>
              <Text>
                <Text color="blackAlpha.700">Placeholder Text Again</Text>
              </Text>
            </Box>
            <Box position="absolute" top="5" right="5">
              <Button>
                <LinkOverlay href="/profile/edit">Edit Profile</LinkOverlay>
              </Button>
            </Box>
          </Box>
        </CardBody>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Contact Info</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              align="stretch">
              <Box>
                <Text color="blackAlpha.700">Mobile</Text>
                <Text>91111 1111</Text>
              </Box>
              <Box>
                <Text color="blackAlpha.700">Work Email</Text>
                <Text>josephsung@smu.edu.sg</Text>
              </Box>
              <Box>
                <Text color="blackAlpha.700">Office Address</Text>
                <Text>81 Victoria St, Singapore 188065</Text>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ProfileSkillCard = (isLoading, skills) => {
  skills = [
    "Python",
    "Java",
    "C++",
    "C#",
    "Javascript",
    "React",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C++",
    "C#",
    "Javascript",
    "React",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C++",
    "C#",
    "Javascript",
    "React",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C++",
    "C#",
    "Javascript",
    "React",
    "HTML",
    "CSS",
    "Python",
    "Java",
    "C++",
    "C#",
    "Javascript",
    "React",
    "HTML",
    "CSS",
  ];

  isLoading = false;
  return (
    <>
      <Card
        variant="elevated"
        overflow="hidden"
        borderRadius="25px"
        px={14}
        py={5}>
        <CardHeader p={0} fontWeight="semibold" mb={5}>
          <Text fontSize="xl">Skills</Text>
        </CardHeader>
        <CardBody p={0}>
          <Box>
            {isLoading ? (
              <Flex>
                {new Array(4).fill(0).map((_, index) => {
                  return (
                    <Skeleton key={index} width="75px" height="17px" mr={3} />
                  );
                })}
              </Flex>
            ) : (
              skills.map((skill, index) => {
                return (
                  <Badge
                    as="span"
                    key={index}
                    bg="blackAlpha.100"
                    py={1}
                    px={3}
                    mr={4}
                    mb={4}
                    borderRadius="full"
                    fontWeight="semibold">
                    {skill}
                  </Badge>
                );
              })
            )}
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

const ProfileJobCard = (jobRole, jobDescription) => {
  jobRole = "Account Manager";
  jobDescription = "Test Description";
  return (
    <Card
      variant="elevated"
      overflow="hidden"
      borderRadius="25px"
      px={14}
      py={5}>
      <CardHeader p={0} fontWeight="semibold" mb={5}>
        <Text fontSize="xl">Current Role - {jobRole}</Text>
      </CardHeader>
      <CardBody p={0} mb={5}>
        <Box>
          <Text>{jobDescription}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export { ProfileHeadCard, ProfileSkillCard, ProfileJobCard };
