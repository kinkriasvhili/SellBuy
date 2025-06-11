import axios from "axios";

// import { postRefreshToken } from "./postData";
const URL = "https://buy-sell-ecommerce.onrender.com";

export const profilePatch = async (changedProfile) => {
  try {
    const formData = new FormData();

    for (const key in changedProfile) {
      if (changedProfile[key] !== undefined && changedProfile[key] !== null) {
        formData.append(key, changedProfile[key]);
      }
    }

    const res = await axios.patch(`${URL}/dashboard/me/`, formData, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Patch error:", error.response?.data || error.message);
    throw error;
  }
};

export const cartItemPatch = async ({ id, data }) => {
  try {
    console.log(id);
    console.log(data);

    const res = await axios.patch(`${URL}/cart/cart-items/${id}/`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error("Patch error:", error.response?.data || error.message);
    throw error;
  }
};
