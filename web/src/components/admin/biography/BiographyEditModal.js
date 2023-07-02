import { Form, Input, Modal, Typography } from "antd";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import CropContainer from "../shared/CropContainer";
import { FullSpace } from "../shared/StyledComponent";
import { LoadingContext } from "@/components/contexts/LoadingContext";
import { createClient } from "@/pages/api/client";
import { imageUrlBuilder } from "@/helpers/imageUrlBuilder";

const { Title } = Typography;

function BiographyEditModal({ data, isOpen, setIsOpen, title, refresh }) {
  const [tempImage, setTempImage] = useState();
  const { setLoading } = useContext(LoadingContext);

  const formik = useFormik({
    initialValues: {
      Id: data._id,
      Title: data.Title,
      Text: data.Text,
      ImageUrl: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      values.ImageUrl = tempImage;
      const client = createClient();
      await client.put("/biography", values);
      await refresh();
      handleCancel();
      setLoading(false);
    },
  });
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={formik.handleSubmit}
      onCancel={handleCancel}
      maskClosable={false}
    >
      <Form>
        <FullSpace direction="vertical">
          <div>
            <Title level={4}>Title</Title>
            <Input
              name="Title"
              value={formik.values.Title}
              onChange={formik.handleChange}
            />
          </div>
          <div>
            <Title level={4}>Photo</Title>
            <CropContainer
              image={""}
              cropImage={(e) => setTempImage(e)}
              aspect={9 / 16}
            ></CropContainer>
            {tempImage ? (
              ""
            ) : (
              <img src={imageUrlBuilder(data.ImageUrl)} width={"98%"} />
            )}
          </div>
          <div>
            <Title level={4}>Biography Text</Title>
            <Input.TextArea
              name="Text"
              value={formik.values.Text}
              onChange={formik.handleChange}
              style={{ minHeight: 250 }}
            />
          </div>
        </FullSpace>
      </Form>
    </Modal>
  );
}

export default BiographyEditModal;
