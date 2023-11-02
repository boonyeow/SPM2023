import { HamburgerIcon } from "@chakra-ui/icons";
import { useLoginContext } from "../hooks/useLoginContext";

import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import {
  Link as ReactRouterLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

const NavBar = () => {
  const { loginInfo } = useLoginContext();
  const location = useLocation();
  const navigate = useNavigate();

  const Links = [
    { name: "Listings", to: "/listings" },
    { name: "My Applications", to: "/applications" },
    { name: "My Profile", to: `/profile/${loginInfo.userId}` },
  ];

  let activeLink;
  if (location.pathname.includes("/listings/create")) {
    activeLink = "Create Listing";
  } else if (location.pathname.includes("/listings")) {
    activeLink = "Listings";
  } else if (location.pathname.includes("/applications")) {
    activeLink = "My Applications";
  } else if (location.pathname.includes("/profile")) {
    activeLink = "My Profile";
  }

  return (
    <>
      <Box
        px={5}
        py={5}
        boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
        zIndex={9999}>
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
          <Text
            as="kbd"
            fontWeight="bold"
            _hover={{ cursor: "pointer" }}
            onClick={() => navigate("/listings")}>
            ALL-IN-ONE
          </Text>
          <Spacer />
          <Box>
            {Links.map((link, index) => (
              <Link
                key={index}
                as={ReactRouterLink}
                to={link.to}
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
            {loginInfo.role !== "User" && (
              <Link
                as={ReactRouterLink}
                to="/listings/create"
                mr={10}
                color={
                  activeLink == "Create Listing" ? "blackAlpha.800" : "gray.600"
                }
                fontWeight={
                  activeLink == "Create Listing" ? "semibold" : "normal"
                }
                _hover={{
                  color: "blackAlpha.800",
                  fontWeight: "semibold",
                }}>
                Create Listing
              </Link>
            )}
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
              "https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg"
            }
          />
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
