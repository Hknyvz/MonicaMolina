import { Form, Input, Modal } from "antd";
import React, { useState } from "react";

function GalleryVideoUpdateModal({ visible, record, onCancel, onOk }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    setLoading(true);
    await onOk(values);
    setLoading(false);
    form.resetFields();
  };
  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };
  return (
    <>
      <Modal
        title="Update Gallery Video Modal"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical" initialValues={record}>
          <Form.Item name="_id" hidden>
            <Input type="hidden" name="_id" id="_id" />
          </Form.Item>
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

export default GalleryVideoUpdateModal;
