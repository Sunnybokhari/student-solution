const { default: axiosInstance } = require(".");

export const addAnswer = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/answer/upload-image",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const addAttempt = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/answer/attempt", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
