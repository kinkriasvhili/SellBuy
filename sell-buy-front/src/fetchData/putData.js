import axios from "axios";
const URL = "https://buy-sell-ecommerce.onrender.com";

export const putReview = async ({ message, rating, slug, reviewId }) => {
  try {
    const res = await axios.put(
      `${URL}/reviews/shop/items/${slug}/reviews/${reviewId}/`,
      { message, rating },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
