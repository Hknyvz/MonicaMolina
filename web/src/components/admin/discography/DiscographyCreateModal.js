import { Form, Input, Modal } from "antd";
import React, { useState } from "react";
import CropContainer from "../shared/CropContainer";
import { FullSpace, RequiredFormLabel } from "../shared/StyledComponent";
import { SiItunes } from "react-icons/si";
import { SlSocialSpotify, SlSocialYoutube } from "react-icons/sl";

function DiscographyCreateModal({ onOk, onCancel, visible }) {
  const [cropImage, setCropImage] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [visibleUploadError, setVisibleUploadError] = useState(false);

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
        title="Create Album Modal"
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        confirmLoading={loading}
        centered
      >
        <Form form={form} layout="vertical">
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
            <RequiredFormLabel>Upload</RequiredFormLabel>
            <CropContainer
              cropImage={(e) => setCropImage(e)}
              aspect={undefined}
            />
            {visibleUploadError ? (
              <span style={{ color: "#ff4d4f" }}>Image is required</span>
            ) : null}
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
    </>
  );
}

export default DiscographyCreateModal;
