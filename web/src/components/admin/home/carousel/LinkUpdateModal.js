import { Form, Input, Modal } from "antd";
import React, { useState } from "react";

function LinkUpdateModal({ visible, record, onCancel, onOk, icon, title }) {
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
    <Modal
      title="Update Link Modal"
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
        <Form.Item label={title} name="Link">
          <Input
            id="Link"
            name="Link"
            prefix={icon}
            placeholder="Order Number"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default LinkUpdateModal;
