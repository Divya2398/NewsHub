import { client } from "../Token/TokenService";
import { BASE_URL } from "../baseUrl";
import axios from "axios";
class NewsService {
  

  GetNews = (interset) => {
    return axios.get(
      "https://newsapi.org/v2/everything?" +
        `q=${interset}&` +
        "apiKey=fbdba7e12d4547c7b87061a4790d5544"
    );
  };

  // User Login Api
  UserLogin = (email, password) => {
    return client.post(
      `${BASE_URL}R1/user/login`,
      { email, password },
      { authorization: false }
    );
  };
}
const NewsServices = new NewsService();
export default NewsServices;
