import fs from "fs";
import path from "path";

const saveImage = (image, guid, directory) => {
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const decodedImage = Buffer.from(base64Data, "base64");
  let fileName = `${guid}.jpg`;
  let relativePath = path.join(directory, fileName);
  let filePath = path.join(process.cwd(), "public", relativePath);
  fs.writeFileSync(filePath, decodedImage);
  return relativePath;
};

const deleteImage = (id, directory) => {
  const filePath = path.join(process.cwd(), "public", directory, `${id}.jpg`);
  fs.unlinkSync(filePath);
};

export { saveImage, deleteImage };
