import { Form, Input, Modal } from "antd";
import React, { useState } from "react";

function GalleryVideoCreateModal({ onOk, onCancel, visible }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    setLoading(true);
    await onOk(values);
    setLoading(false);
    form.resetFields();
  };

  const handleCancel = async () => {
    form.resetFields();
    onCancel();
  };

  return (
    <>
      <Modal
        title="Create Gallery Video Modal"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Order"
            name="Order"
            rules={[{ required: true, message: "Order field is required" }]}
          >
            <Input id="Order" name="Order" placeholder="Video Order" required />
          </Form.Item>
          <Form.Item
            label="VideoUrl"
            name="VideoUrl"
            rules={[{ required: true, message: "VideoUrl field is required" }]}
          >
            <Input
              id="VideoUrl"
              name="VideoUrl"
              placeholder="Video EmbededUrl"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default GalleryVideoCreateModal;
