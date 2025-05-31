/* eslint-disable @typescript-eslint/no-explicit-any */
import { getFromLocalStorage } from "@/utils/storage";
import axios from "axios";

console.log(process.env.NEXT_PUBLIC_REACT_APP_API_URL);

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_REACT_APP_API_URL,
  timeout: 10 * 1000,
  timeoutErrorMessage: "Erro tempo de resposta excedido",
});

export const GetFetch = async (url: string, params = {}) => {
  const JWT = getFromLocalStorage("JWT_HASH");
  api.defaults.headers.authorization = `Bearer ${JWT}`;
  const reponse = await api.get(url, { params });
  return reponse.data;
};

export const PostFetch = async (url: string, params: any, ...rest: any[]) => {
  const JWT = getFromLocalStorage("JWT_HASH");
  api.defaults.headers.authorization = `Bearer ${JWT}`;
  const data = await api.post(url, params, ...rest);
  return data;
};
export const DeleteFetch = async (url: string) => {
  const JWT = getFromLocalStorage("JWT_HASH");
  api.defaults.headers.authorization = `Bearer ${JWT}`;
  const response = await api.delete(url);
  return response;
};

export const GetFetchFile = async (
  url: string,
  params = {},
  responseType?:
    | "json"
    | "arraybuffer"
    | "blob"
    | "document"
    | "text"
    | "stream"
) => {
  const JWT = getFromLocalStorage("JWT_HASH");
  if (JWT) {
    api.defaults.headers.authorization = `Bearer ${JWT}`;
  } else {
    console.warn("JWT não encontrado. Requisição pode falhar.");
  }

  try {
    const response = await api.get(url, {
      params,
      responseType: responseType || "json",
    });

    console.log(
      "GetFetch: Data returned. Type of response.data:",
      typeof response.data,
      response.data instanceof Blob ? " (is a Blob)" : ""
    );
    return response.data;
  } catch (error) {
    console.error("Erro na função GetFetch:", error);
    throw error;
  }
};
