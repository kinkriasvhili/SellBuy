import axios from "axios";

import { postRefreshToken } from "./postData";
const URL = "https://buy-sell-ecommerce.onrender.com";

export const getUser = async () => {
  try {
    let response = await fetch(`${URL}/dashboard/me/`, {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();

    // If token is expired, try to refresh and retry
    if (response.status === 401 || data.code === "token_expired") {
      console.warn("Access token expired, trying to refresh...");

      await postRefreshToken();

      response = await fetch(`${URL}/dashboard/me/`, {
        method: "GET",
        credentials: "include",
      });

      data = await response.json();
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch user profile");
    }

    return data;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const res = await axios.get(`${URL}/products/shop/items/`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsCategories = async () => {
  try {
    const res = await axios.get(`${URL}/products/parent/categories`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
