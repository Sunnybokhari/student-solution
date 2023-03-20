const { default: axiosInstance } = require(".");

// add exam

export const addExam = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/theoryexams/add", payload);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all exams
export const getAllExams = async () => {
  try {
    const response = await axiosInstance.post("/api/theoryexams/get-all-exams");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get exam by id

export const getExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryexams/get-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// edit exam by id

export const editExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryexams/edit-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// delete exam by id

export const deleteExamById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryexams/delete-exam-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// add question to exam

export const addQuestionToExam = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryexams/add-question-to-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const editQuestionById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryexams/edit-question-in-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const deleteQuestionById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryexams/delete-question-in-exam",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
