import { Form, Input, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { FullSpace } from "./StyledComponents";
import CropContainer from "./CropContainer";
import { useFormik } from "formik";
import { createClient } from "@/pages/api/client";

function CarouselModal({
  data,
  isCreate,
  isOpen,
  setIsCreate,
  setIsOpen,
  title,
  refresh,
}) {
  const [tempImage, setTempImage] = useState(data?.ImageUrl);
  const [time, setTime] = useState();

  const formik = useFormik({
    initialValues: {
      Id: "",
      Order: "",
      ImageUrl: "",
      ImageText: "",
    },
    onSubmit: async (values) => {
      values.ImageUrl = tempImage;
      const client = createClient();

      if (isCreate) {
        await client.post("/carousel", values);
        setTempImage(null);
      } else {
        await client.put("/carousel", values);
      }
      await refresh();
      handleCancel();
    },
  });

  useEffect(() => {
    setFormikField();
  }, [data]);

  useEffect(() => {
    setTime(Date.now());
  }, [isOpen]);

  const handleCancel = () => {
    setFormikField();
    setIsOpen(false);
    setIsCreate(false);
  };

  const setFormikField = () => {
    formik.setFieldValue("Id", data?._id);
    formik.setFieldValue("ImageText", data?.ImageText);
    formik.setFieldValue("ImageUrl", data?.ImageUrl);
    formik.setFieldValue("Order", data?.Order);
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
              Image Text
              <Input
                id="ImageText"
                name="ImageText"
                value={formik.values.ImageText}
                placeholder="Image Text"
                onChange={formik.handleChange}
              />
            </label>
            <label>
              Order
              <Input
                id="Order"
                name="Order"
                value={formik.values.Order}
                placeholder="Order Number"
                onChange={formik.handleChange}
              />
            </label>
            {isCreate && (
              <Space direction="vertical">
                Upload
                <CropContainer
                  image={formik.values.ImageUrl}
                  cropImage={(e) => setTempImage(e)}
                  time={time}
                ></CropContainer>
              </Space>
            )}
          </FullSpace>
        </Form>
      </Modal>
    </>
  );
}

export default CarouselModal;
