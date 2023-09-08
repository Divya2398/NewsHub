import React, { useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleclick = () => {
    setShow(!show);
  };

  // submit form
  const submitHandler = async () => {
    setLoading(true);
    // checking if required fields are provided
    if (!email || !password) {
      toast({
        title: "Please Fill All Feild",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } else {
      // dispatching user Login action
      await dispatch(loginUser({ email, password }))
        .unwrap()
        .then((PromiseResult) => {
          toast({
            title: PromiseResult.message,
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
          navigate("/home");
        })
        .catch((Error) => {
          // error message
          toast({
            title: Error,
            status: "error",
            duration: 6000,
            isClosable: true,
            position: "bottom",
          });
          setLoading(false);
        });
    }
  };
  return (
    <VStack>
      <FormControl id="loginemail" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          // size="sm"
          type={"email"}
          placeholder="Enter Your Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="loginpassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            mb={3}
            type={show ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement alignItems={"center"}>
            <Button size="xs" onClick={handleclick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="blue"
        width="100%"
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>
      {/* <Button
        variant={"solid"}
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
        //isLoading={isLoading}
      >
        Get Guest User Credentials
      </Button> */}
    </VStack>
  );
};

export default Login;
