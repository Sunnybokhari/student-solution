const { default: axiosInstance } = require(".");

// add report
export const addReport = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryreports/add-report",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all reports
export const getAllReportsT = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryreports/get-all-reports"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all reports by user
export const getAllReportsByUserT = async () => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryreports/get-all-reports-by-user"
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// get all report by id
export const getReportById = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theoryreports/get-report-by-id",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
