import React, { useEffect } from "react";
import SelectionCard from "./SelectionCards/SelectionCard";
import { Button, Text } from "@chakra-ui/react";
import "./Selection.scss";
import Navbar from "../../Navbar/Navbar";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
const interest = [
  "Business",
  "Education",
  "Sports",
  "Religion",
  "Finance",
  "Marketing",
  "Daily News",
  "Politics",
  "Arts",
  "Health and fitness",
  "Investment",
  "Accidents",
  "Nature",
];

const Selection = ({ handleFavorite }) => {
  const favstate = useSelector((state) => state.fav);

  // useEffect(() => {}, [favstate.fav]);
  return (
    <>
      <Navbar />
      <div className="container my-5 p-5 selction-box">
        <div className="d-flex flex-column">
          <div>
            <Text className="text-center select-text text-grey">
              Select Your Favorite Category
            </Text>
            <Text className="mb-5 text-center ">
              Select atleast *minmimum of 2 favorites and *maximum upto 6
              favorites for news feeds
            </Text>
            <div className="row gy-3 align-items-md-center">
              {interest.map((data, index) => (
                <SelectionCard data={data} key={`fav-${index}`} />
              ))}
            </div>
          </div>
          <div className="my-4 al align-self-center align-self-md-end ">
            <Button
              onClick={() => handleFavorite(favstate?.favorite)}
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="solid"
              isDisabled={favstate?.favorite?.length >= 2 ? false : true}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selection;
