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

export async function getUser(user_id) {
  try {
    const res = await axios.get(
      "https://buy-sell-ecommerce.onrender.com/api/profile/",
      {
        params: {
          user_id: "250d5fd2-a1ca-4b1d-a9ba-8fc98477b049",
        },
        withCredentials: true,
      }
      //
    );
    return res;
  } catch (error) {
    console.log("error");
  }
}

/**
 *
 * // Send email
await postEmailOrCodeConfirmation({ email }, token);

// Confirm with code
await postEmailOrCodeConfirmation({ email, code }, token);

 */
