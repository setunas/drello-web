import axios from "axios";
import { domain } from "src/utils/url/drello-api";

export const drelloApiAxios = axios.create({
  baseURL: domain(),
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
