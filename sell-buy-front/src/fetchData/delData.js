import axios from "axios";
const URL = "https://buy-sell-ecommerce.onrender.com";

export const delReview = async ({ slug, reviewId }) => {
  try {
    const res = await axios.delete(
      `${URL}/reviews/shop/items/${slug}/reviews/${reviewId}/`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const delFav = async (data) => {
  try {
    const res = await axios.delete(`${URL}/wishlist/remove`, {
      data,
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
