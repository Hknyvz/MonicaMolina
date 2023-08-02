import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import CropContainer from "../shared/CropContainer";
import { FullSpace } from "../shared/StyledComponent";
import { SiItunes } from "react-icons/si";
import { SlSocialSpotify, SlSocialYoutube } from "react-icons/sl";

function DiscographyUpdateModal({ visible, record, onCancel, onOk }) {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [cropImage, setCropImage] = useState();

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
      title="Update Album Modal"
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
          label="Album Name"
          name="Name"
          rules={[{ required: true, message: "Album Name is required" }]}
        >
          <Input id="Name" name="Name" placeholder="Album Name" />
        </Form.Item>
        <Form.Item
          label="Album Year"
          name="Year"
          rules={[{ required: true, message: "Album Year is required" }]}
        >
          <Input id="Year" name="Year" placeholder="Album Year" />
        </Form.Item>
        <FullSpace direction="vertical">
          Album Cover Image
          <CropContainer
            cropImage={(e) => setCropImage(e)}
            aspect={undefined}
          ></CropContainer>
        </FullSpace>
        <Form.Item label="Youtube Link" name="YoutubeLink">
          <Input
            id="YoutubeLink"
            name="YoutubeLink"
            placeholder="https://www.youtube.com"
            prefix={<SlSocialYoutube />}
          />
        </Form.Item>
        <Form.Item label="Spotify Link" name="SpotifyLink">
          <Input
            id="SpotifyLink"
            name="SpotifyLink"
            placeholder="https://www.spotify.com"
            prefix={<SlSocialSpotify />}
          />
        </Form.Item>
        <Form.Item label="Itunes Link" name="ItunesLink">
          <Input
            id="ItunesLink"
            name="ItunesLink"
            placeholder="https://www.itunes.com"
            prefix={<SiItunes />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DiscographyUpdateModal;
