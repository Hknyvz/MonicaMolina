import React, { useState, useRef, useEffect } from "react";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "../../utils/crop/canvasPreview";
import { useDebounceEffect } from "../../utils/crop/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { Button, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function CropContainer({ image, cropImage, time, aspect }) {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const uploadRef = useRef();
  const hiddenAnchorRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState();
  const [crop, setCrop] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [fileList, setFileList] = useState([]);

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    aspect = aspect ? aspect : width / height;
    setCrop(centerAspectCrop(width, height, aspect));
  }

  function croppedSend() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        return null;
      }

      const reader = new FileReader();
      let base64String;
      reader.onloadend = function () {
        base64String = reader.result;
        cropImage(base64String);
      };
      reader.readAsDataURL(blob);
    });
  }

  useEffect(() => {
    setSelectedImage(image);
    handleRemoveFiles();
  }, [image, time]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        await canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop
        );
        croppedSend();
      }
    },
    100,
    [completedCrop, fileList]
  );

  const antUpload = (file) => {
    if (file.fileList.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setSelectedImage(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file.file.originFileObj);
      setFileList([...file.fileList]);
    } else setSelectedImage(null);
  };

  const handleRemoveFiles = () => {
    setFileList([]);
  };

  return (
    <>
      <Space direction="vertical">
        <Upload
          fileList={fileList}
          onChange={antUpload}
          ref={uploadRef}
          onRemove={handleRemoveFiles}
          multiple={false}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        <label>Max 10 mb</label>
        {uploadRef?.current?.fileList.length > 0
          ? selectedImage && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspect}
              >
                <img
                  ref={imgRef}
                  alt="Crop me"
                  src={selectedImage}
                  onLoad={onImageLoad}
                  width={472}
                />
              </ReactCrop>
            )
          : selectedImage && (
              <img
                alt="Crop me"
                src={selectedImage}
                onLoad={onImageLoad}
                width={472}
              />
            )}
        <canvas
          hidden
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
          }}
        />
      </Space>
    </>
  );
}
