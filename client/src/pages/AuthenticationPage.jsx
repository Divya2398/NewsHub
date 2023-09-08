import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/User/Login";
import Signup from "../components/User/Signup";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
const AuthenticationPage = () => {
  const navigate = useNavigate();
  const tokenstate = useSelector((state) => state.auth);
  useEffect(() => {
    if (tokenstate?.userToken) {
      navigate("/home");
    }
  }, [navigate, tokenstate]);
  return (
    <Container centerContent maxW="xl" mb={3}>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bgGradient="linear(to-r, gray.300,  pink.200)"
        // bg={"#F0F0F0"}
        m="30px 0 15px 0"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="3xl" fontFamily="work sans" className="app-heading">
          News Hub
        </Text>
      </Box>
      <Box
        p={4}
        bg={"#F0F0F0"}
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="blue">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login></Login>
            </TabPanel>
            <TabPanel>
              <Signup></Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthenticationPage;
