import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-216df.firebaseio.com/"
});

export default instance;
