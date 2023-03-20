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

export const getAllAttempts = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/answer/get-all-attempts");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// export const getAnswerData = async (payload) => {
//   try {
//     const response = await axiosInstance.post(
//       "/api/answer/get-attempt-by-id",
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

// export const getAttemptById = async (payload) => {
//   try {
//     const response = await axiosInstance.get(
//       `/api/answer/get-attempt-by-id`,
//       payload
//     );
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

// get all reports by user
// export const getAttemptById = async () => {
//   try {
//     const response = await axiosInstance.post("/api/answer/get-attempt-by-id");
//     return response.data;
//   } catch (error) {
//     return error.response.data;
//   }
// };

export const getAttemptById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/answer/get-attempt-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAnswerById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/answer/get-answer-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAllAnswers = async (filters) => {
  try {
    const response = await axiosInstance.post("/api/answer/get-all-answers");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteAttemptById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/answer/delete-attempt-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
