import { Form, Input, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import CropContainer from "@/components/admin/shared/CropContainer";
import dynamic from "next/dynamic";

const Editor = dynamic(import("@/components/admin/shared/Editor"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

function NewsUpdateModal({ visible, record, onCancel, onOk }) {
  const [cropImage, setCropImage] = useState();
  const [fullImage, setFullImage] = useState();
  const [loading, setLoading] = useState(false);
  const [visibleEditorError, setVisibleEditorError] = useState(false);
  const [text, setText] = useState();
  useEffect(() => {
    setText(record?.Text);
  }, [record]);

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
    values.ImageUrl = fullImage;
    values.ThumbnailUrl = cropImage;
    values.Text = text;
    setLoading(true);
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
          <Space className="fullSpace" direction="vertical">
            <label className="requiredFormLabel">News Photo</label>
            <CropContainer
              cropImage={(e) => setCropImage(e)}
              fullImage={(e) => setFullImage(e)}
              aspect={424 / 195}
            />
          </Space>
          <Form.Item
            label="Title"
            name="Title"
            rules={[{ required: true, message: "Title field is required" }]}
          >
            <Input id="Title" name="Title" placeholder="Title" />
          </Form.Item>
          <Space className="fullSpace" direction="vertical">
            <label className="requiredFormLabel">News Photo</label>
            <Editor value={text} onChange={setText} />
            {visibleEditorError && (
              <span style={{ color: "#ff4d4f" }}>News Text is required</span>
            )}
          </Space>
        </Form>
      </Modal>
    </>
  );
}

export default NewsUpdateModal;
