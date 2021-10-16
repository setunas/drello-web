import axios from "axios";
import { domain } from "src/utils/url/drello-api";

export const drelloApiAxios = axios.create({
  baseURL: domain(),
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});
