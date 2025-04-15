import axios from "axios";

export async function postEmailOrCodeConfirmation(data) {
  try {
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/api/auth/email_confirmation/",
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
      "https://buy-sell-ecommerce.onrender.com/api/auth/register/",
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
      "https://buy-sell-ecommerce.onrender.com/api/token/refresh/",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log("Refresh token error:", error.response?.data || error.message);
    throw error;
  }
}

export async function postLogin(data) {
  try {
    console.log(data);
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/api/auth/login/",
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
    console.log("me");
    const res = await axios.post(
      "https://buy-sell-ecommerce.onrender.com/api/auth/logout/",
      {},
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

/**
 *
 * // Send email
await postEmailOrCodeConfirmation({ email }, token);

// Confirm with code
await postEmailOrCodeConfirmation({ email, code }, token);

 */
