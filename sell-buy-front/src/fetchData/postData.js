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
    throw error.response?.data || new Error("Token refresh failed");

    return res.data;
  } catch (error) {
    // console.log("Refresh token error:", error.response?.data || error.message);
    return error;
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

// adding products

export const postNewProduct = async ({ formData, images, featuredIndex }) => {
  if (!images.length) throw new Error("At least one image is required.");
  const form = new FormData();

  Object.entries(formData).forEach(([key, value]) => {
    form.append(key, value);
  });

  images.forEach((file) => form.append("images", file));

  // Add image metadata
  const metadata = images.map((_, index) => ({
    index,
    is_feature: index === featuredIndex,
  }));
  form.append("images_metadata", JSON.stringify(metadata));

  // Make the POST request
  const response = await axios.post(`${URL}/products/shop/items/`, form, {
    withCredentials: true,
    // headers: {
    //   // "Content-Type": "multipart/form-data",
    //   Authorization: `Bearer ${localStorage.getItem("access")}`,
    // },
  });

  return response.data;
};
