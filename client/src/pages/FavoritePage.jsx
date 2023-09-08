import React from "react";
import { useNavigate } from "react-router-dom";
import Selection from "../components/Favorite/SelectionSection/Selection";
import FavoriteServices from "../services/FavoriteService/FavoriteService";
import { useToast } from "@chakra-ui/react";
const FavoritePage = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const handleFavorite = async (favorite) => {
    console.log(favorite);
    await FavoriteServices.AddFavorite(favorite)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "bottom",
        });
        navigate("/home");
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return <Selection handleFavorite={handleFavorite} />;
};

export default FavoritePage;
