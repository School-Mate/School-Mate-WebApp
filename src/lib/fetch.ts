import axios from "axios";

const fetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default fetch;
