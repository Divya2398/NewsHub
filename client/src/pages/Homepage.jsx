import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Banner from "../components/Home/BannerSection/Banner";
import { Box } from "@chakra-ui/react";
import NewsServices from "../services/NewsService/NewsService";
import Appcard from "../components/AppComponents/AppCards/Appcard";
import { getFavorite } from "../features/favorite/favoriteSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
const Homepage = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [interest, setInterest] = useState("");
  const [newsData, setNewsData] = useState([]);
  // news Api integration
  useEffect(() => {
    dispatch(getFavorite())
      .unwrap()
      .then((res) => {
        // console.log(res.result.join(" OR "));
        let Keyword = res.result.join(" OR ");
        setInterest(Keyword);
        NewsServices.GetNews(res.result.join(" OR "))
          .then((data) => {
            // console.log(data.data.articles);
            setNewsData(data.data.articles);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((Error) => {
        // error message
        toast({
          title: Error.message,
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
      });
  }, [interest]);

  // handle save article
  const handleSave = (data) => {
    console.log(data);
  };
  return (
    <div>
      <Navbar />
      <Banner />
      <Box py={5}>
        <div className="container-fluid my-5">
          <div className="row mx-auto align-items-stretch">
            {newsData.map((u, index) => (
              <Appcard
                key={index}
                article={u}
                handleFunction={() => handleSave(u)}
              ></Appcard>
            ))}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Homepage;
