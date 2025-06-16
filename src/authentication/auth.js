import axios from "axios";

export class AuthService {
  async createUserAccount({ email, password, name }) {
    const userAccount = await axios.post(
      `${import.meta.env.VITE_API_URL}/registerUser`,
      {
        username: name,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    return userAccount.status;
  }

  async userLogin({ email, password }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/loginUser`,
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { token, username } = response.data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("username", username);
        window.dispatchEvent(new Event("userChanged"));
      }
      return response.status;
    } catch (error) {
      console.log(error);

      return 403;
    }
  }

  async logoutUser() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
  }

  async logoutOrganizer() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
  }

  async createOrgAccount({ name, orgname, phone, email, password, loc }) {
    const orgAccount = await axios.post(
      `${import.meta.env.VITE_API_URL}/registerOrganizer`,
      {
        username: name,
        organization: orgname,
        phone: phone,
        email: email,
        password: password,
        location: loc,
      },
      {
        withCredentials: true,
      }
    );
    return orgAccount.status;
  }

  async orgLogin({ email, password }) {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/orgLogin`,
        {
          email: email,
          password: password,
        },
        
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const { token, username } = response.data;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("username", username);
      }
      return response.status;
    } catch (error) {
      console.log(error);

      return 403;
    }
  }
}

const authService = new AuthService();
export default authService;
