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
      ImageUrl: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      values.ImageUrl = tempImage;
      const client = createClient();
      if (isCreate) {
        await client.post("/gallery/photo", values);
        setTempImage(null);
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
    console.log(data);
    formik.setFieldValue("Id", data?._id);
    formik.setFieldValue("Order", data?.Order);
    formik.setFieldValue("ImageUrl", data?.ImageUrl);
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
                cropImage={(e) => setTempImage(e)}
                time={time}
                aspect={undefined}
              ></CropContainer>
            </Space>
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default GalleryPhotoModal;
