import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { FullSpace, RequiredFormLabel } from "../../shared/StyledComponent";
import CropContainer from "../../shared/CropContainer";

function GalleryPhotoUpdateModal({ visible, record, onCancel, onOk }) {
  const [cropImage, setCropImage] = useState();
  const [fullImage, setFullImage] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    const values = await form.validateFields();
    values.ImageUrl = fullImage;
    values.ThumbnailUrl = cropImage;
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
        centered
        open={visible}
        title="Edit Gallery Photo"
        onCancel={handleCancel}
        onOk={handleOk}
        confirmLoading={loading}
        maskClosable={false}
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
            <Input id="Order" name="Order" placeholder="Photo Order" />
          </Form.Item>
          <FullSpace direction="vertical">
            <RequiredFormLabel>Gallery Photo</RequiredFormLabel>
            <CropContainer
              image={undefined}
              cropImage={(e) => setCropImage(e)}
              fullImage={(e) => setFullImage(e)}
              aspect={1 / 1}
            />
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default GalleryPhotoUpdateModal;
