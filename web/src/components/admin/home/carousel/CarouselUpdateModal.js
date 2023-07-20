import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import CropContainer from "@/components/admin/shared/CropContainer";

function CarouselUpdateModal({ visible, record, onCancel, onOk }) {
  const [cropImage, setCropImage] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    values.ImageUrl = cropImage;
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
      title="Update Carousel Modal"
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
          <Input id="Order" name="Order" placeholder="Order Number" />
        </Form.Item>
        <Form.Item label="Upload">
          <CropContainer
            cropImage={(e) => setCropImage(e)}
            aspect={16 / 9}
          ></CropContainer>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CarouselUpdateModal;
