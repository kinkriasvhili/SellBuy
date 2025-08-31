import axios from "axios";
const URL = "https://buy-sell-ecommerce.onrender.com";
export async function postEmailOrCodeConfirmation(data) {
  try {
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/users/auth/email_confirmation/",
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Email/code confirmation error:", error);
    throw error;
  }
}

export async function postRegisterData(data) {
  try {
    console.log(data);
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/users/auth/register/",
      data,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log("Post data error: ", error);
    throw error;
  }
}

export async function postRefreshToken() {
  try {
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/users/token/refresh/",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function postLogin(data) {
  try {
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/users/auth/login/",
      data,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log("Post data error: ", error);
    throw error;
  }
}

export async function postLogout() {
  try {
    console.log("logged out this is from pos tada ");
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/users/auth/logout/",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export const postNewProduct = async ({ formData, images, featuredIndex }) => {
  if (!images.length) throw new Error("At least one image is required.");
  const form = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value);
  });

  images.forEach((file) => form.append("images", file));

  const metadata = images.map((_, index) => ({
    index,
    is_feature: index === featuredIndex,
  }));
  form.append("images_metadata", JSON.stringify(metadata));

  const response = await axios.post(`${URL}/products/shop/items/`, form, {
    withCredentials: true,
  });

  return response.data;
};

export const postReview = async ({ message, rating, slug }) => {
  try {
    const response = await axios.post(
      `${URL}/reviews/shop/items/${slug}/reviews/`,
      { message, rating },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("POST review failed:", error.response?.data || error.message);
    throw error.response?.data || error; // rethrow for useMutation to catch
  }
};

export const postResetPasRequest = async ({ email }) => {
  try {
    const res = await axios.post(
      `${URL}/users/reset-password-request/`,
      email,
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.log("Error occurred in request:", error);
    throw error;
  }
};

export const postResetPasConfrim = async (data) => {
  try {
    console.log(data);
    const res = await axios.post(`${URL}/users/reset-password-confirm/`, data, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.log("error occured in request:", error);
    throw error;
  }
};

export const postFavAdd = async (data) => {
  try {
    const res = await axios.post(`${URL}/wishlist/add/`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postCartAdd = async (data) => {
  try {
    const res = await axios.post(`${URL}/cart/cart-items/`, data, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const postOrders = async (data) => {
  try {
    const res = await axios.post(`${URL}/orders/checkout/`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
    });
    return res.data;
  } catch (error) {
    if (
      error.response?.data.detail == "You cannot purchase your own product."
    ) {
      alert(error.response?.data.detail);
    }

    console.log(error.response?.data);
    throw error;
  }
};
