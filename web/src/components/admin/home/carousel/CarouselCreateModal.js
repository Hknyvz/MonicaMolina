import { Divider, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import CropContainer from "@/components/admin/shared/CropContainer";
import { FullSpace, RequiredFormLabel } from "../../shared/StyledComponent";
import { SiItunes } from "react-icons/si";
import { SlSocialSpotify, SlSocialYoutube } from "react-icons/sl";

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
          <Form.Item label="Order" name="Order">
            <Input id="Order" name="Order" placeholder="Order Number" />
          </Form.Item>
          <FullSpace direction="vertical">
            <RequiredFormLabel>Upload Carousel Image</RequiredFormLabel>
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
