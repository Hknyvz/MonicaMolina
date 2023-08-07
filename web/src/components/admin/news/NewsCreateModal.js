import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import {
  FullSpace,
  RequiredFormLabel,
} from "@/components/admin/shared/StyledComponent";
import CropContainer from "@/components/admin/shared/CropContainer";
import dynamic from "next/dynamic";

const Editor = dynamic(import("@/components/admin/shared/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function NewsCreateModal({ onOk, onCancel, visible }) {
  const [cropImage, setCropImage] = useState();
  const [fullImage, setFullImage] = useState();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visibleUploadError, setVisibleUploadError] = useState(false);
  const [visibleEditorError, setVisibleEditorError] = useState(false);
  const [text, setText] = useState("");

  const handleOk = async () => {
    let visibleCheck = false;
    if (!cropImage) {
      setVisibleUploadError(true);
      visibleCheck = true;
    } else {
      setVisibleUploadError(false);
      visibleCheck = false;
    }

    if (!text) {
      setVisibleEditorError(true);
      visibleCheck = true;
    } else {
      setVisibleEditorError(false);
      visibleCheck = false;
    }

    const values = await form.validateFields();
    if (visibleCheck) {
      return;
    }
    values.ImageUrl = fullImage;
    values.ThumbnailUrl = cropImage;
    values.Text = text;
    setLoading(true);
    await onOk(values);
    setLoading(false);
    form.resetFields();
  };

  const handleCancel = async () => {
    form.resetFields();
    onCancel();
    setText("");
  };

  return (
    <>
      <Modal
        centered
        title="Create News Modal"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={loading}
        width={1000}
      >
        <Form form={form} layout="vertical">
          <FullSpace direction="vertical">
            <RequiredFormLabel>News Photo</RequiredFormLabel>
            <CropContainer
              cropImage={(e) => setCropImage(e)}
              fullImage={(e) => setFullImage(e)}
              aspect={424 / 195}
            />
            {visibleUploadError ? (
              <span style={{ color: "#ff4d4f" }}>Image is required</span>
            ) : null}
          </FullSpace>
          <Form.Item
            label="Title"
            name="Title"
            rules={[{ required: true, message: "Title field is required" }]}
          >
            <Input id="Title" name="Title" placeholder="Title" />
          </Form.Item>
          <FullSpace direction="vertical">
            <RequiredFormLabel>News Photo</RequiredFormLabel>
            <Editor value={text} onChange={setText} />
            {visibleEditorError && (
              <span style={{ color: "#ff4d4f" }}>News Text is required</span>
            )}
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default NewsCreateModal;
