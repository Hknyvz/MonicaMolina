import { Form, Input, Modal, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { FullSpace, RequiredFormLabel } from "../../shared/StyledComponent";
import { ErrorMessage, useFormik } from "formik";
import { createClient } from "@/pages/api/client";
import CropContainer from "../../shared/CropContainer";
import { LoadingContext } from "@/components/contexts/LoadingContext";
import { NotificationContext } from "../../shared/NotificationContext";
import * as Yup from "yup";

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
  const notification = useContext(NotificationContext);
  useEffect(() => {
    setTime(Date.now());
  }, [isOpen]);

  useEffect(() => {
    setFormikField();
  }, [data]);

  const validationSchema = Yup.object().shape({
    Order: Yup.string().required("Order field is required"),
    ImageUrl: Yup.string().required("Image data is required"),
  });

  const formik = useFormik({
    initialValues: {
      Id: "",
      Order: "",
      ImageUrl: "",
      ThumbnailUrl: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        values.ThumbnailUrl = cropImage;
        values.ImageUrl = fullImage;

        const client = createClient();
        let response;
        if (isCreate) {
          response = await client.post("/gallery/photo", values);
          console.log(response);
          setCropImage(null);
        } else {
          response = await client.put("/gallery/photo", values);
        }
        handleCancel();
        await refresh();
      } catch (error) {
        console.log(error);
        notification.error(error.response.data);
      } finally {
        setLoading(false);
      }
    },
    validationSchema: validationSchema,
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
            <RequiredFormLabel>Order</RequiredFormLabel>
            <Input
              id="Order"
              name="Order"
              value={formik.values.Order}
              placeholder="Photo Order"
              onChange={formik.handleChange}
            />
            <ErrorMessage name="Order"></ErrorMessage>
            <FullSpace direction="vertical">
              <RequiredFormLabel>Gallery Photo</RequiredFormLabel>
              <CropContainer
                image={undefined}
                cropImage={(e) => setCropImage(e)}
                fullImage={(e) => setFullImage(e)}
                time={time}
                aspect={1 / 1}
              />
            </FullSpace>
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default GalleryPhotoModal;
