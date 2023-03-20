import { message } from "antd";
import React, { useEffect } from "react";
import { getUserInfo } from "../apiCalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "./usersSlice";

function ProtectedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return <div>{children}</div>;
}

export default ProtectedRoute;
