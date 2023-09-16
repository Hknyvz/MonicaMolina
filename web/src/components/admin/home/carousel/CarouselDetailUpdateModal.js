import { Form, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import { SiItunes } from "react-icons/si";
import { SlSocialSpotify, SlSocialYoutube } from "react-icons/sl";
import CropContainer from "@/components/admin/shared/CropContainer";

function CarouselDetailEditModal({ visible, record, onCancel, onOk }) {
  const [cropImage, setCropImage] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [visibleUploadError, setVisibleUploadError] = useState(false);

  const handleOk = async () => {
    const values = await form.validateFields();
    values.DetailImageUrl = cropImage;
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
        title="Update Carousel Detail Modal"
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
          <Form.Item label="Detail Title" name="DetailTitle">
            <Input
              id="DetailTitle"
              name="DetailTitle"
              placeholder="New Album"
            />
          </Form.Item>
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
          <Space className="fullSpace" direction="vertical">
            <label className="requiredFormLabel">
              Upload Carousel Detail Image
            </label>
            <CropContainer
              cropImage={(e) => setCropImage(e)}
              aspect={139 / 145}
            />
            {visibleUploadError ? (
              <span style={{ color: "#ff4d4f" }}>Image is required</span>
            ) : null}
          </Space>
        </Form>
      </Modal>
      ;
    </>
  );
}

export default CarouselDetailEditModal;
