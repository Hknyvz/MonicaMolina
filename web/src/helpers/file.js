import fs from "fs";
import path from "path";

const saveImage = (image, guid) => {
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const decodedImage = Buffer.from(base64Data, "base64");
  let fileName = `${guid}.jpg`;
  let relativePath = path.join("/home-photo", fileName);
  let filePath = path.join(process.cwd(), "public", relativePath);
  try {
    fs.writeFileSync(filePath, decodedImage);
    return relativePath;
  } catch (error) {
    throw error;
  }
};

const deleteImage = (id) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "home-photo",
      `${id}.jpg`
    );
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("File to be deleted not found");
  }
};

export { saveImage, deleteImage };
