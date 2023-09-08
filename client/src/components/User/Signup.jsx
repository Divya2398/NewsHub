import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import "./User.scss";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  // password event
  const handleclick = () => {
    setShow(!show);
  };

  // submit form
  const submitHandler = async () => {
    setLoading(true);
    // checking if required fields are provided
    if (!name || !email || !password) {
      toast({
        title: "Please Fill All Feild",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    } else {
      // dispatching user signup action
      await dispatch(registerUser({ name, mobile, email, password }))
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
          navigate("/interest");
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
    <>
      <VStack>
        <FormControl id="name" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            // size="sm"
            type={"text"}
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="mobile">
          <FormLabel>
            Mobile Number <span className="opt-text">(optional)</span>
          </FormLabel>
          <Input
            // size="sm"
            type={"text"}
            placeholder="9888887776"
            onChange={(e) => setMobile(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            // size="sm"
            type={"email"}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              // size="sm"
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
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default Signup;
