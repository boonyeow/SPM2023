import { useLoginContext } from "../context/LoginContext";
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

const hardcodedAccount = {
  director: "password",
  staff: "password",
  manager: "password",
  humanResource: "password",
};

const role = {
  director: "director",
  staff: "staff",
  manager: "manager",
  humanResource: "humanResource",
};

const Login = () => {
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const [account, setAccount] = useState({ username: "", password: "" });
  const { loginInfo, setLoginInfo } = useLoginContext();

  const handleSubmit = () => {
    if (hardcodedAccount[account.username] === account.password) {
      setLoginInfo({
        username: account.username,
        role: role[account.username],
        isLoggedIn: true,
      });
      // window.location.href = "/listing";
    } else {
      document.activeElement.blur();
      setIsError(true);
    }
  };

  useEffect(() => {
    console.log(loginInfo);
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
              id="username"
              variant="flushed"
              placeholder="Username"
              size="lg"
              mb={5}
              value={account.username}
              onChange={(e) =>
                setAccount({ ...account, username: e.target.value })
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
                You have entered an invalid username or password
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
