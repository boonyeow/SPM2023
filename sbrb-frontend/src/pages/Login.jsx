import { useLoginContext } from "../hooks/useLoginContext";
import { ACCOUNTS, ACCOUNT_PASSWORDS, ACCOUNT_ROLES } from "../service";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const ROLES = {
  1: "Admin",
  2: "User",
  3: "Manager",
  4: "HR",
};

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState({ email: "", password: "" });
  const { loginInfo } = useLoginContext();

  const handleSubmit = () => {
    const email = account.email.toLowerCase();
    if (ACCOUNT_PASSWORDS[email] === account.password) {
      console.log(ACCOUNT_ROLES[email]);
      localStorage.setItem("userId", ACCOUNTS[email]);
      localStorage.setItem("email", email);
      localStorage.setItem("role", ROLES[ACCOUNT_ROLES[email]]);
      localStorage.setItem("isLoggedIn", true);

      window.location.href = "/listing";
    } else {
      document.activeElement.blur();
      setIsError(true);
    }
  };

  useEffect(() => {
    console.log(loginInfo);
    if (loginInfo.isLoggedIn) window.location.href = "/listing";
  }, [loginInfo]);

  return (
    <>
      <Box width="5xl" mx="auto">
        <Box
          mt="20"
          bg="linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(240,240,240,1) 35%, rgba(242,242,242,1) 100%)"
          shadow="md"
          borderRadius="2rem"
          w="70%"
          mx="auto"
          py={16}
          px={20}>
          <Heading textAlign="center" mb={8}>
            Login
          </Heading>
          <FormControl>
            <Input
              id="email"
              variant="flushed"
              placeholder="Email"
              size="lg"
              mb={5}
              value={account.email}
              onChange={(e) =>
                setAccount({ ...account, email: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
              isInvalid={isError}
              onFocus={() => setIsError(false)}
            />
            <InputGroup size="md">
              <Input
                id="password"
                variant="flushed"
                type={show ? "text" : "password"}
                placeholder="Password"
                size="lg"
                value={account.password}
                onChange={(e) =>
                  setAccount({ ...account, password: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                isInvalid={isError}
                onFocus={() => setIsError(false)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShow(!show)}
                  colorScheme="blue"
                  variant="outline">
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isError ? (
              <FormHelperText fontSize="xs" color="red.600">
                You have entered an invalid email or password
              </FormHelperText>
            ) : (
              <FormHelperText fontSize="xs">
                Never share your password with anyone
              </FormHelperText>
            )}
            <Button
              mt={12}
              w="100%"
              colorScheme="blue"
              py={6}
              onClick={handleSubmit}>
              Login
            </Button>
          </FormControl>
        </Box>
      </Box>
    </>
  );
};

export default Login;
