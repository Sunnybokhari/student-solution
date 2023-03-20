const { default: axiosInstance } = require(".");

export const registerUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const loginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.post("/api/users/get-user-info");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post("/api/users/logout");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const updateUser = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/update-user-info",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const addPreference = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/add-preference-user-info",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
export const removePreference = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/users/remove-preference-user-info",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
