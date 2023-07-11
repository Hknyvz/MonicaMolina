import { Form, Input, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import CropContainer from "@/components/admin/shared/CropContainer";
import { FullSpace, RequiredFormLabel } from "../../shared/StyledComponent";

function CarouselCreateModal({ onOk, onCancel, visible }) {
  const [cropImage, setCropImage] = useState();
  const [loading, setLoading] = useState(false);
  const [visibleUploadError, setVisibleUploadError] = useState(false);

  const [form] = Form.useForm();

  const handleOk = async () => {
    let visibleCheck = false;
    if (!cropImage) {
      setVisibleUploadError(true);
      visibleCheck = true;
    } else {
      setVisibleUploadError(false);
      visibleCheck = false;
    }
    const values = await form.validateFields();
    if (visibleCheck) {
      return;
    }
    values.ImageUrl = cropImage;
    setVisibleUploadError(false);
    setLoading(true);
    await onOk(values);
    form.resetFields();
    setLoading(false);
  };

  const handleCancel = async () => {
    setVisibleUploadError(false);
    form.resetFields();
    onCancel();
  };
  return (
    <>
      <Modal
        title="Create Carousel Modal"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        centered
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Carousel Link" name="Link">
            <Input
              id="Link"
              name="Link"
              placeholder="https://www.monicamolina.com"
            />
          </Form.Item>
          <Form.Item
            label="Order"
            name="Order"
            rules={[{ required: true, message: "Order field is required" }]}
          >
            <Input id="Order" name="Order" placeholder="Order Number" />
          </Form.Item>
          <FullSpace direction="vertical">
            <RequiredFormLabel>Upload</RequiredFormLabel>
            <CropContainer cropImage={(e) => setCropImage(e)} aspect={16 / 9} />
            {visibleUploadError ? (
              <span style={{ color: "#ff4d4f" }}>Image is required</span>
            ) : null}
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default CarouselCreateModal;
