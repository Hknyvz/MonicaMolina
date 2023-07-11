import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import CropContainer from "../shared/CropContainer";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";
import Image from "next/image";

function BiographyEditModal({ visible, record, onCancel, onOk }) {
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
      title="Biography Edit"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      maskClosable={false}
      centered
      confirmLoading={loading}
      width={1000}
    >
      <Form form={form} layout="vertical" initialValues={record}>
        <Form.Item name="_id" hidden>
          <Input type="hidden" name="_id" id="_id" />
        </Form.Item>
        <Form.Item
          label="Title"
          name="Title"
          rules={[{ required: true, message: "Title field is required" }]}
        >
          <Input name="Title" id="Title" />
        </Form.Item>
        <Form.Item label="Upload">
          <CropContainer
            image={""}
            cropImage={(e) => setCropImage(e)}
            aspect={9 / 16}
          ></CropContainer>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {cropImage ? (
              ""
            ) : (
              <Image
                src={imageUrlBuilder(record.ImageUrl)}
                alt="Biography photo"
                width={"470"}
                height={"836"}
                unoptimized
              />
            )}
          </div>
        </Form.Item>
        <Form.Item
          label="Biography Text"
          name="Text"
          rules={[{ required: true, message: "Biography text is required" }]}
        >
          <Input.TextArea name="Text" style={{ minHeight: 250 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default BiographyEditModal;
