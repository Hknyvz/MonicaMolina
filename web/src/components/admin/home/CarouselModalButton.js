import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { FullSpace } from "./StyledComponents";
import CropContainer from "./CropContainer";
import { useFormik } from "formik";
import { createClient } from "@/pages/api/client";

function CarouselModalButton({ data, isCreate }) {
  const { confirm } = Modal;
  const [image, setImage] = useState(data?.ImageUrl);
  const [tempImage, setTempImage] = useState(data?.ImageUrl);
  const [modalData, setModalData] = useState({
    Id: data?._id,
    Order: data?.Order,
    ImageUrl: data?.ImageUrl,
    ImageText: data?.ImageText,
  });

  useEffect(() => {
    setImage(data?.ImageUrl);
  }, [data]);

  const formik = useFormik({
    initialValues: {
      Id: data?._id,
      Order: data?.Order,
      ImageUrl: data?.ImageUrl,
      ImageText: data?.ImageText,
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
          <form onSubmit={formik.handleSubmit}>
            <FullSpace style={{ width: "100%" }} direction="vertical">
              <Input
                id="ImageText"
                name="ImageText"
                value={formik.values.ImageText}
                placeholder="Image Text"
                onChange={formik.handleChange}
              />
              <input
                id="Order"
                name="Order"
                value={formik.values.Order}
                placeholder="Order Number"
                onChange={formik.handleChange}
              />
              <CropContainer
                image={tempImage}
                cropImage={(e) => setTempImage(e)}
              ></CropContainer>
            </FullSpace>
          </form>
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
