import { Form, Input, Modal, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FullSpace } from "../../shared/StyledComponent";
import { useFormik } from "formik";
import { createClient } from "@/pages/api/client";
import CropContainer from "../../shared/CropContainer";
import { LoadingContext } from "@/components/contexts/LoadingContext";

function GalleryVideoModal({
  data,
  isCreate,
  isOpen,
  setIsCreate,
  setIsOpen,
  title,
  refresh,
}) {
  const [time, setTime] = useState();
  const [tempImage, setTempImage] = useState(data?.ImageUrl);
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setTime(Date.now());
  }, [isOpen]);

  useEffect(() => {
    setFormikField();
  }, [data]);

  const formik = useFormik({
    initialValues: {
      Id: "",
      Order: "",
      VideoUrl: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const client = createClient();
      if (isCreate) {
        await client.post("/gallery/video", values);
        setTempImage(null);
      } else {
        await client.put("/gallery/video", values);
      }

      handleCancel();
      await refresh();
      setLoading(false);
    },
  });
  const handleCancel = async () => {
    setFormikField();
    setIsOpen(false);
    setIsCreate(false);
  };
  const setFormikField = () => {
    console.log(data);
    formik.setFieldValue("Id", data?._id);
    formik.setFieldValue("Order", data?.Order);
    formik.setFieldValue("VideoUrl", data?.VideoUrl);
  };
  return (
    <>
      <Modal
        title={title}
        open={isOpen}
        onOk={formik.handleSubmit}
        onCancel={handleCancel}
        maskClosable={false}
      >
        <Form>
          <FullSpace direction="vertical">
            <label>
              Order
              <Input
                id="Order"
                name="Order"
                value={formik.values.Order}
                placeholder="Video Order"
                onChange={formik.handleChange}
              />
            </label>
            <label>
              Video Url
              <Input
                id="VideoUrl"
                name="VideoUrl"
                value={formik.values.VideoUrl}
                placeholder="Video EmbededUrl"
                onChange={formik.handleChange}
              />
            </label>
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default GalleryVideoModal;
