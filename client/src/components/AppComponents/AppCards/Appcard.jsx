import React from "react";
import "./Appcard.scss";
import {
  Card,
  CardHeader,
  Flex,
  IconButton,
  Box,
  Link,
  Heading,
  Text,
  CardBody,
  Image,
  Button,
  CardFooter,
} from "@chakra-ui/react";
import { BsBookmark } from "react-icons/bs";
import { AiOutlineRead } from "react-icons/ai";
const Appcard = ({ article, handleSave }) => {
  return (
    <div className="col-sm-12 col-md-6 col-lg-4 my-4">
      <Card maxW="md" alignItems={"stretch"} className="news-card">
        <CardHeader>
          <Flex spacing="3" alignItems="center" flexWrap="wrap">
            {/* <Flex flex="1" gap="4"> */}
            <Box>
              <Heading size="sm">{article?.title}</Heading>
            </Box>
          </Flex>
        </CardHeader>
        <Image
          objectFit="cover"
          src={
            article?.urlToImage
              ? article.urlToImage
              : "data:image/jpeg;base64,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"
          }
          alt="Article Image"
        />
        <Text className="news-decp m-2">{article?.description}</Text>
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          gap={2}

          // sx={{
          //   "& > button": {
          //     minW: "136px",
          //   },
          // }}
        >
          <Button
            flex="1"
            // variant="ghost"
            className="card-footer-btn"
            leftIcon={<AiOutlineRead />}
          >
            Readmore
          </Button>

          <Button
            // variant="ghost"
            className="card-footer-btn"
            leftIcon={<BsBookmark />}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Appcard;
