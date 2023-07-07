import { Form, Input, Modal, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FullSpace } from "../../shared/StyledComponent";
import { useFormik } from "formik";
import { createClient } from "@/pages/api/client";
import CropContainer from "../../shared/CropContainer";
import { LoadingContext } from "@/components/contexts/LoadingContext";

function GalleryPhotoModal({
  data,
  isCreate,
  isOpen,
  setIsCreate,
  setIsOpen,
  title,
  refresh,
}) {
  const [time, setTime] = useState();
  const [cropImage, setCropImage] = useState(data?.ThumbnailUrl);
  const [fullImage, setFullImage] = useState(data?.ImageUrl);
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
      ImageUrl: "",
      ThumbnailUrl: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      values.ThumbnailUrl = cropImage;
      values.ImageUrl = fullImage;
      const client = createClient();
      if (isCreate) {
        await client.post("/gallery/photo", values);
        setCropImage(null);
      } else {
        await client.put("/gallery/photo", values);
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
    formik.setFieldValue("Id", data?._id);
    formik.setFieldValue("Order", data?.Order);
    formik.setFieldValue("ImageUrl", data?.ImageUrl);
    formik.setFieldValue("ThumbnailUrl", data?.ThumbnailUrl);
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
                placeholder="Photo Order"
                onChange={formik.handleChange}
              />
            </label>
            <Space direction="vertical">
              Gallery Photo
              <CropContainer
                image={undefined}
                cropImage={(e) => setCropImage(e)}
                fullImage={(e) => setFullImage(e)}
                time={time}
                aspect={1 / 1}
              ></CropContainer>
            </Space>
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default GalleryPhotoModal;
