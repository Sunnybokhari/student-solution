import { Form, message, Modal, Button } from "antd";
import React from "react";
import {
  addQuestionToExam,
  editQuestionById,
} from "../../../apiCalls/theoryExams";
// import { addQuestionToExam, editQuestionById } from "../../../apicalls/exams";

function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
}) {
  const onFinish = async (values) => {
    try {
      const requiredPayload = {
        name: values.name,

        exam: examId,
      };

      const response = await addQuestionToExam(requiredPayload);
      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModal(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={selectedQuestion ? "Edit Question" : "Add Question"}
      open={showAddEditQuestionModal}
      footer={false}
      onCancel={() => {
        setShowAddEditQuestionModal(false);
        setSelectedQuestion(null);
      }}
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: selectedQuestion?.name,
        }}
      >
        <Form.Item name="name" label="Question">
          <input type="text" />
        </Form.Item>

        <Button
          className="primary-outlined-btn"
          type="primary"
          danger
          onClick={() => setShowAddEditQuestionModal(false)}
        >
          Cancel
        </Button>
        <Button className="margin-10" type="primary" htmlType="submit">
          Save
        </Button>
      </Form>
    </Modal>
  );
}

export default AddEditQuestion;
