import { useLoginContext } from "../hooks/useLoginContext";

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

const Links = [
  { name: "Home", to: "/listings" },
  { name: "Job Applicants", to: "/listings/:id/applications" },
  { name: 'Create Job Listing', to: '/listings/create'},
  { name: "Skills Matching", to: "/skills-matching" },
  { name: "Edit Profile", to: "/edit-profile" },
];

const NavLink = ({ children }) => {
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded="md"
      _hover={{ color: 'white', bg: 'blue.700' }}
      _active={{ color: 'white', bg: 'blue.600' }}
      href={children.to}>
      {children.name}
    </Box>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginInfo } = useLoginContext();

  return (
    <Box bg={useColorModeValue("blue.100", "blue.900")} px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems="center">
          <Box>Logo</Box>
          <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.to}>{link}</NavLink>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="link"
              cursor="pointer"
              minW={0}>
              <Avatar
                size="sm"
                src={
                  "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
            </MenuButton>
            <MenuList>
              <MenuItem>View Applications</MenuItem>
              <MenuItem as="a" href="/edit-profile">
                Edit Profile
              </MenuItem>
              {loginInfo.isLoggedIn && (
                <>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      localStorage.clear();
                      window.location.href = "/";
                    }}>
                    Log Out
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
