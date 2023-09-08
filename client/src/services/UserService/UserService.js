import { client } from "../Token/TokenService";
import { BASE_URL } from "../baseUrl";
class UserService {
  // User Register Api
  UserRegister = (name, mobile, email, password) => {
    return client.post(
      `${BASE_URL}R1/user/`,
      {
        name,
        mobile,
        email,
        password,
      },
      { authorization: false }
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

const UserServices = new UserService();
export default UserServices;
