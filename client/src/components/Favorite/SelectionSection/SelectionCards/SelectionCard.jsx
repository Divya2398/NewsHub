import React, { useState } from "react";
import { Card, CardBody, Text } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../../../features/favorite/favoriteSlice";
import "./Selectioncards.scss";

const SelectionCard = ({ data }) => {
  const dispatch = useDispatch();
  const favState = useSelector((state) => state.fav);
  const [selectlist, setSelectlist] = useState([]);
  const handleselect = (selectedData) => {
    if (favState?.favorite.includes(selectedData)) {
      dispatch(removeFavorite(selectedData));
      setSelectlist(selectedData);
    } else {
      dispatch(addFavorite(selectedData));
      // setSelectlist([...selectlist, selectedData]);
    }
  };
  return (
    <div className="col-md-3 col-lg-2 col-xs-6 col-6 cards-box ">
      <Card
        className={`selection-cards ${
          favState?.favorite?.includes(data) ? "active-cards" : "inactive-cards"
        }`}
        onClick={() => handleselect(data)}
      >
        <CardBody>
          <Text className="m-0">{data}</Text>
        </CardBody>
      </Card>
    </div>
  );
};

export default SelectionCard;
