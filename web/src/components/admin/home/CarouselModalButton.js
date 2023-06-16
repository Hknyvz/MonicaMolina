import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FullSpace } from "./StyledComponents";
import CropContainer from "./CropContainer";
import { useFormik } from "formik";
import { createClient } from "@/pages/api/client";

function CarouselModalButton({ data, isCreate }) {
  const { confirm } = Modal;
  const [image, setImage] = useState(data?.image);
  const [tempImage, setTempImage] = useState(data?.image);
  const [modalData, setModalData] = useState({
    Id: data?.id,
    Order: data?.order,
    ImageUrl: data?.image,
    ImageText: data?.text,
  });

  useEffect(() => {
    setImage(data?.image);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      Id: modalData.Id,
      Order: modalData.Order,
      ImageUrl: modalData.ImageUrl,
      ImageText: modalData.ImageText,
    },
    onSubmit: async (values) => {
      values.ImageUrl = tempImage;
      const client = createClient();
      await client.post("/carousel", values);
      if (!isCreate) {
        setImage(tempImage);
      } else {
        setTempImage(null);
      }
    },
  });

  const showModal = () => {
    confirm({
      icon: null,
      content: (
        <div style={{ width: "100%" }}>
          <Form>
            <FullSpace style={{ width: "100%" }} direction="vertical">
              <Input
                name="ImageText"
                value={formik.initialValues.ImageText}
                placeholder="Image Text"
                onChange={formik.handleChange}
              />
              <Input
                name="Order"
                value={formik.initialValues.Order}
                placeholder="Order Number"
                onChange={formik.handleChange}
              />
              <CropContainer
                image={tempImage}
                cropImage={(e) => setTempImage(e)}
              ></CropContainer>
            </FullSpace>
          </Form>
        </div>
      ),
      onCancel() {
        setTempImage(image);
        Modal.destroyAll();
      },
      onOk: formik.handleSubmit,
    });
  };

  return (
    <>
      {data ? (
        <Button
          onClick={showModal}
          style={{ backgroundColor: "#ffa100", color: "white" }}
        >
          Update
        </Button>
      ) : (
        <Button type="primary" onClick={showModal}>
          Add a row
        </Button>
      )}
    </>
  );
}

export default CarouselModalButton;
