import fs from "fs";
import path from "path";
import logger from "./logger";

const saveImage = (image, guid) => {
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const decodedImage = Buffer.from(base64Data, "base64");
  let fileName = `${guid}.jpg`;
  let relativePath = path.join("/home-photo", fileName);
  let filePath = path.join(process.cwd(), "public", relativePath);
  fs.writeFileSync(filePath, decodedImage);
  return relativePath;
};

const deleteImage = (id) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "home-photo",
    `${id}.jpg`
  );
  fs.unlinkSync(filePath);
};

export { saveImage, deleteImage };
