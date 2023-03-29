import { Form, message, Modal, Button } from "antd";
import React, { useEffect, useState } from "react";
import {
  addQuestionToExam,
  editQuestionById,
} from "../../../apiCalls/theoryExams";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../../apiCalls/firebase";
import { v4 } from "uuid";

function AddEditQuestion({
  showAddEditQuestionModal,
  setShowAddEditQuestionModal,
  refreshData,
  examId,
  selectedQuestion,
  setSelectedQuestion,
}) {
  const [inputField, setInputField] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const onFinish = async (values) => {
    if (inputField == null) return;
    const imageRef = ref(storage, `theoryQuestions/${inputField.name + v4()}`);
    const snapshot = await uploadBytes(imageRef, inputField);
    const url = await getDownloadURL(snapshot.ref);
    setImageUrl(url);
    console.log(url);

    try {
      const requiredPayload = {
        name: url,

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
          <input
            type="file"
            onChange={(event) => {
              setInputField(event.target.files[0]);
            }}
          />
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
