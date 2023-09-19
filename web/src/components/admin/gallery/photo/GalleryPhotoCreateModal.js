import { Form, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import CropContainer from "@/components/admin/shared/CropContainer";

function GalleryPhotoCreateModal({ onOk, onCancel, visible }) {
  const [cropImage, setCropImage] = useState();
  const [fullImage, setFullImage] = useState();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [visibleUploadError, setVisibleUploadError] = useState(false);

  const handleOk = async () => {
    let visibleCheck = false;
    if (!cropImage || !fullImage) {
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
    values.ImageUrl = fullImage;
    values.ThumbnailUrl = cropImage;
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
        centered
        title="Create Gallery Photo Modal"
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
            <Input id="Order" name="Order" placeholder="Photo Order" />
          </Form.Item>
          <Space className="fullSpace" direction="vertical">
            <label className="requiredFormLabel">Gallery Photo</label>
            <CropContainer
              cropImage={(e) => setCropImage(e)}
              fullImage={(e) => setFullImage(e)}
              aspect={1 / 1}
            />
            {visibleUploadError ? (
              <span style={{ color: "#ff4d4f" }}>Image is required</span>
            ) : null}
          </Space>
        </Form>
      </Modal>
    </>
  );
}

export default GalleryPhotoCreateModal;
