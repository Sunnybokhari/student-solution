const { default: axiosInstance } = require(".");

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/teachers/register",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/teachers/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post("/api/teachers/get-user-info");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all users
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.post("/api/teachers/get-all-users");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateGradedExams = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/teachers/update-gradedExams",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
