import { Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  FullSpace,
  RequiredFormLabel,
} from "@/components/admin/shared/StyledComponent";
import CropContainer from "@/components/admin/shared/CropContainer";
import dynamic from "next/dynamic";

const Editor = dynamic(import("@/components/admin/shared/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function NewsUpdateModal({ visible, record, onCancel, onOk }) {
  const [cropImage, setCropImage] = useState();
  const [loading, setLoading] = useState(false);
  const [visibleEditorError, setVisibleEditorError] = useState(false);
  const [text, setText] = useState();
  useEffect(() => {
    setText(record?.Text);
  }, [record]);

  console.log(record);
  const [form] = Form.useForm();

  const handleOk = async () => {
    let visibleCheck = false;

    if (!text) {
      setVisibleEditorError(true);
      visibleCheck = true;
    } else {
      setVisibleEditorError(false);
      visibleCheck = false;
    }

    const values = await form.validateFields();
    if (visibleCheck) {
      return;
    }
    values.ImageUrl = cropImage;
    values.Text = text;
    setLoading(true);
    console.log(values);
    await onOk(values);
    setLoading(false);
    form.resetFields();
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
    Modal.destroyAll();
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
        width={1000}
      >
        <Form form={form} layout="vertical" initialValues={record}>
          <Form.Item name="_id" hidden>
            <Input type="hidden" name="_id" id="_id" />
          </Form.Item>
          <FullSpace direction="vertical">
            <RequiredFormLabel>News Photo</RequiredFormLabel>
            <CropContainer
              cropImage={(e) => setCropImage(e)}
              aspect={424 / 195}
            />
          </FullSpace>
          <Form.Item
            label="Title"
            name="Title"
            rules={[{ required: true, message: "Title field is required" }]}
          >
            <Input id="Title" name="Title" placeholder="Title" />
          </Form.Item>
          <FullSpace direction="vertical">
            <RequiredFormLabel>News Photo</RequiredFormLabel>
            <Editor value={text} onChange={setText} />
            {visibleEditorError && (
              <span style={{ color: "#ff4d4f" }}>News Text is required</span>
            )}
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default NewsUpdateModal;
