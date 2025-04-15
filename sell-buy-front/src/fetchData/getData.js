import { postRefreshToken } from "./postData";
const URL = "https://buy-sell-ecommerce.onrender.com";

export const getUser = async (userId) => {
  try {
    let response = await fetch(`${URL}/api/profile/${userId}/`, {
      method: "GET",
      credentials: "include",
    });

    let data = await response.json();

    // If token is expired, try to refresh and retry
    if (response.status === 401 || data.code === "token_expired") {
      console.warn("Access token expired, trying to refresh...");

      await postRefreshToken();

      response = await fetch(`${URL}/api/profile/${userId}/`, {
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
