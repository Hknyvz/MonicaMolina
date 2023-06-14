import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { FullSpace } from "./StyledComponents";
import CropContainer from "./CropContainer";

function CarouselModalButton({ data }) {
  const { confirm } = Modal;
  const [image, setImage] = useState();

  const handleOk = async () => {
    // setSelectData((prev) => ({ ...prev, image: image }));
    // const client = createClient();
    // await client.post("/carousel", selectedData);
    // setIsModalOpen(false);
    // clearSelectedData();
    //debugger;
    // const reader = new FileReader();
    // reader.onload = function (event) {
    //   const base64String = event.target.result;
    //   // Base64 formatına dönüştürülen verilerle yapılacak işlemler
    //   console.log(base64String);
    // };
    // reader.readAsDataURL(image);
  };

  const showModal = () => {
    confirm({
      icon: null,
      content: (
        <div style={{ width: "100%" }}>
          <Form>
            <FullSpace style={{ width: "100%" }} direction="vertical">
              <Input
                value={data?.text}
                placeholder="Image Text"
                onChange={(e) =>
                  setSelectData((prev) => ({
                    ...prev,
                    text: e.target.value,
                  }))
                }
              />
              <Input
                value={data?.order}
                placeholder="Order Number"
                onChange={(e) =>
                  setSelectData((prev) => ({
                    ...prev,
                    order: e.target.value,
                  }))
                }
              />
              <CropContainer
                image={data?.image}
                cropImage={(e) => setImage(e)}
              ></CropContainer>
            </FullSpace>
          </Form>
        </div>
      ),
      onCancel() {
        Modal.destroyAll();
      },
      onOk: handleOk,
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
