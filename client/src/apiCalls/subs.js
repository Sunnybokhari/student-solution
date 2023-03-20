const { default: axiosInstance } = require(".");

export const getPrices = async () => {
  try {
    const response = await axiosInstance.post("/api/subs/prices");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const session = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/subs/session", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const subscriptions = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/subs/subscriptions",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
