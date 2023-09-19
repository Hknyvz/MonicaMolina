import { Divider, Form, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import CropContainer from "@/components/admin/shared/CropContainer";

function CarouselCreateModal({ onOk, onCancel, visible }) {
  const [cropImage, setCropImage] = useState();
  const [loading, setLoading] = useState(false);
  const [visibleUploadError, setVisibleUploadError] = useState(false);
  const [visibleMobileUploadError, setVisibleMobileUploadError] =
    useState(false);
  const [cropMobileImage, setCropMobileImage] = useState();
  const [form] = Form.useForm();

  const handleOk = async () => {
    var isValidWeb = imageUploadValidate(cropImage, setVisibleUploadError);
    var isValidMobile = imageUploadValidate(
      cropMobileImage,
      setVisibleMobileUploadError
    );
    const values = await form.validateFields();
    if (isValidWeb || isValidMobile) {
      return;
    }
    values.ImageUrl = cropImage;
    values.MobileImageUrl = cropMobileImage;
    setVisibleUploadError(false);
    setLoading(true);
    await onOk(values);
    form.resetFields();
    setLoading(false);
  };

  const imageUploadValidate = (image, setVisible) => {
    let visibleCheck = false;
    if (!image) {
      setVisible(true);
      visibleCheck = true;
    } else {
      setVisible(false);
      visibleCheck = false;
    }
    return visibleCheck;
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
          <Space className="fullSpace" direction="vertical">
            <label className="requiredFormLabel">
              Upload Carousel Image For Web
            </label>
            <CropContainer cropImage={(e) => setCropImage(e)} aspect={16 / 9} />
            {visibleUploadError ? (
              <span style={{ color: "#ff4d4f" }}>Image is required</span>
            ) : null}
          </Space>
          <Divider />
          <Space className="fullSpace" direction="vertical">
            <label className="requiredFormLabel">
              Upload Carousel Image For Mobile
            </label>
            <CropContainer
              cropImage={(e) => setCropMobileImage(e)}
              aspect={9 / 16}
            />
            {visibleMobileUploadError ? (
              <span style={{ color: "#ff4d4f" }}>Image is required</span>
            ) : null}
          </Space>
        </Form>
      </Modal>
    </>
  );
}

export default CarouselCreateModal;
