import { client } from "../Token/TokenService";
import { BASE_URL } from "../baseUrl";
import axios from "axios";
class FavoriteService {
  // Get User Interest / Favorite keywords
  GetUserInterest = () => {
    return client.get(`${BASE_URL}R1/user/getFavorite`);
  };

  // Get User Interest / Favorite keywords
  AddFavorite = (interest) => {
    return client.put(`${BASE_URL}R1/user/addFavorite`, {
      interest: interest,
    });
  };

  UpdateFavorite = (interset) => {
    return axios.get(
      "https://newsapi.org/v2/everything?" +
        `q=${interset}&` +
        "apiKey=fbdba7e12d4547c7b87061a4790d5544"
    );
  };
}
const FavoriteServices = new FavoriteService();
export default FavoriteServices;
