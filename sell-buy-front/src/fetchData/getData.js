import axios from "axios";

// import { postRefreshToken } from "./postData";
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

      // await postRefreshToken();

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

export const getMyProducts = async () => {
  try {
    const res = await axios.get(`${URL}/dashboard/me/products`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleProduct = async (slug) => {
  try {
    const res = await axios.get(`${URL}/products/shop/items/${slug}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const getReview = async ({ slug, url }) => {
  try {
    let fetchUrl = "";

    if (url) {
      // Remove domain part if it exists (in case `url` is a full URL)
      const urlObj = url.replace(/^https?:\/\/[^/]+/, "");
      fetchUrl = `${URL}${urlObj}`;
    } else {
      fetchUrl = `${URL}/reviews/shop/items/${slug}/reviews/?limit=2&offset=0`;
    }

    const response = await axios.get(fetchUrl, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reviews:", error.message);
    throw error;
  }
};

export const getReviewById = async ({ slug, reviewId }) => {
  try {
    const response = await axios.get(
      `${URL}/reviews/shop/items/${slug}/reviews/${reviewId}`
      // { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reviews:", error.message);
    throw error;
  }
};

export const getNotifications = async () => {
  try {
    const resp = await axios.get(`${URL}/notifications`, {
      withCredentials: true,
    });
    return resp.data;
  } catch (error) {
    console.log(error);
  }
};

export const getFav = async () => {
  try {
    const res = await axios.get(`${URL}/wishlist`, { withCredentials: true });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCart = async () => {
  try {
    const res = await axios.get(`${URL}/cart/cart-items`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOrders = async () => {
  try {
    const res = await axios.get(`${URL}/orders`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getSingleOrder = async () => {
//   try {
//     const res = await axios.get(`${URL}/cart/cart-items`, {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const getOrderDefAddres = async () => {
//   try {
//     const res = await axios.get(`${URL}/cart/cart-items`, {
//       withCredentials: true,
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const getCategoryProducts = async (slug) => {
  try {
    const res = await axios.get(`${URL}/products/categories/${slug}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
