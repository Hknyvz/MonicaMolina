import React, { useState, useRef, useEffect } from "react";

import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { canvasPreview } from "../../utils/crop/canvasPreview";
import { useDebounceEffect } from "../../utils/crop/useDebounceEffect";

import "react-image-crop/dist/ReactCrop.css";
import { Button, message, Space, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { createClient } from "@/pages/api/client";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function CropContainer({ image, cropImage }) {
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const uploadRef = useRef();
  const blobUrlRef = useRef("");
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [selectedImage, setSelectedImage] = useState();

  function onImageLoad(e) {
    const { width, height } = e.currentTarget;
    setCrop(centerAspectCrop(width, height, 16 / 9));
  }

  function onDownloadCropClick() {
    if (!previewCanvasRef.current) {
      throw new Error("Crop canvas does not exist");
    }

    previewCanvasRef.current.toBlob((blob) => {
      if (!blob) {
        return null;
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = URL.createObjectURL(blob);
      cropImage(blobUrlRef.current);
    });
  }

  useEffect(() => {
    setSelectedImage(image);
    if (!image) {
    }
  }, [image]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
        onDownloadCropClick();
      }
    },
    100,
    [completedCrop]
  );
  const antUpload = async (file) => {
    if (file.fileList.length > 0)
      setSelectedImage(URL.createObjectURL(file.file.originFileObj));
    else setSelectedImage(null);
  };

  return (
    <>
      <Space direction="vertical">
        <Upload onChange={antUpload} ref={uploadRef}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {selectedImage && (
          <ReactCrop
            crop={crop}
            onChange={(percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={16 / 9}
          >
            <img
              ref={imgRef}
              alt="Crop me"
              src={selectedImage}
              onLoad={onImageLoad}
              width={472}
            />
          </ReactCrop>
        )}
        <canvas hidden ref={previewCanvasRef} />
      </Space>
    </>
  );
}
