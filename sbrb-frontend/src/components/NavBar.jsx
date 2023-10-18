import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { useLoginContext } from "../hooks/useLoginContext";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

const Links = [
  { name: "Listings", to: "/listings" },
  { name: "My Applications", to: "/applications" },
  { name: "My Profile", to: "/profile" },
];

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loginInfo } = useLoginContext();
  const location = useLocation();

  let activeLink;
  if (location.pathname.includes("/listings")) {
    activeLink = "Listings";
  } else if (location.pathname.includes("/applications")) {
    activeLink = "My Applications";
  } else if (location.pathname.includes("/profile")) {
    activeLink = "My Profile";
  }

  useEffect(() => {}, [location]);

  return (
    <>
      <Box px={5} py={5} boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)">
        <Box display={{ md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
            />
            <MenuList>
              {Links.map((link, index) => (
                <MenuItem
                  key={index}
                  as={ReactRouterLink}
                  to={link.to}
                  fontWeight={activeLink == link.name ? "semibold" : "normal"}>
                  {link.name}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Box>
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          <Spacer />
          <Box>
            {Links.map((link, index) => (
              <Link
                as={ReactRouterLink}
                to={link.to}
                key={index}
                mr={10}
                color={activeLink == link.name ? "blackAlpha.800" : "gray.600"}
                fontWeight={activeLink == link.name ? "semibold" : "normal"}
                _hover={{
                  color: "blackAlpha.800",
                  fontWeight: "semibold",
                }}>
                {link.name}
              </Link>
            ))}
            {loginInfo.isLoggedIn && (
              <Link
                mr={10}
                color="gray.600"
                _hover={{
                  color: "blackAlpha.900",
                  fontWeight: "semibold",
                }}
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/";
                }}>
                Logout
              </Link>
            )}
          </Box>
          <Spacer />
          <Avatar
            size="sm"
            src={
              "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
            }
          />
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
