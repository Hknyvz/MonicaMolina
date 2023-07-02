import { Form, Input, Modal, Space } from "antd";
import React, { useContext, useEffect, useState } from "react";
import CropContainer from "../shared/CropContainer";
import { useFormik } from "formik";
import { createClient } from "@/pages/api/client";
import { LoadingContext } from "@/components/contexts/LoadingContext";
import { FullSpace } from "../shared/StyledComponent";

function DiscographyModal({
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
  const { setLoading } = useContext(LoadingContext);

  const formik = useFormik({
    initialValues: {
      Id: "",
      Name: "",
      ImageUrl: "",
      Year: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      values.ImageUrl = tempImage;
      const client = createClient();
      if (isCreate) {
        await client.post("/discography", values);
        setTempImage(null);
      } else {
        await client.put("/discography", values);
      }

      handleCancel();
      await refresh();
      setLoading(false);
    },
  });

  useEffect(() => {
    setFormikField();
  }, [data]);

  useEffect(() => {
    setTime(Date.now());
  }, [isOpen]);

  const handleCancel = async () => {
    setFormikField();
    setIsOpen(false);
    setIsCreate(false);
  };

  const setFormikField = () => {
    formik.setFieldValue("Id", data?._id);
    formik.setFieldValue("Name", data?.Name);
    formik.setFieldValue("ImageUrl", data?.ImageUrl);
    formik.setFieldValue("Year", data?.Year);
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
              Album Name
              <Input
                id="Name"
                name="Name"
                value={formik.values.Name}
                placeholder="Album Name"
                onChange={formik.handleChange}
              />
            </label>
            <label>
              Album Year
              <Input
                id="Year"
                name="Year"
                value={formik.values.Year}
                placeholder="Album Year"
                onChange={formik.handleChange}
              />
            </label>
            <Space direction="vertical">
              Album Cover Image
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

export default DiscographyModal;
