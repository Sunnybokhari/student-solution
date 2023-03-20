import React from "react";
import { message, Table } from "antd";
import { getAllUsers } from "../apiCalls/teachers";
import { useEffect } from "react";
import moment from "moment";
import Header from "../components/home/Header";
import { Button } from "react-bootstrap";

function ManageTeachers() {
  const [teachersData, setTeachersData] = React.useState([]);

  const columns = [
    {
      title: "Teacher Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
    },

    {
      title: "Class",
      dataIndex: "class",
    },
    {
      title: "Years of Experiance",
      dataIndex: "years",
    },
    {
      title: "Current School",
      dataIndex: "school",
    },
    {
      title: "Date joined",
      dataIndex: "date",
      render: (text, record) => (
        <>{moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss")}</>
      ),
    },
  ];

  const getData = async (tempFilters) => {
    try {
      const response = await getAllUsers(tempFilters);
      if (response.success) {
        setTeachersData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <div className="margin-10">
        <h1>Teachers</h1>
        <div className="d-flex j-end ">
          <Button className="margin-right-20" href="/teachersignup">
            Add Teacher
          </Button>
        </div>
        <div className="divider"></div>

        <Table columns={columns} dataSource={teachersData} className="mt-2" />
      </div>
    </div>
  );
}

export default ManageTeachers;
