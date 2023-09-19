import fs from "fs";
import Jimp from "jimp";
import path from "path";
import logger from "./logger";

const saveImage = async (image, guid, directory) => {
  let base64Data = image.replace(/^data:image\/png;base64,/, "");
  base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
  base64Data = base64Data.replace(/^data:image\/jpg;base64,/, "");
  base64Data = base64Data.replace(/^data:image\/webp;base64,/, "");
  let fileName = `${guid}.jpeg`;
  let relativePath = path.join(directory, fileName);
  let filePath = path.join(process.cwd(), "public", relativePath);
  await createWebpImage(base64Data, filePath);
  return relativePath;
};

const deleteImage = (id, directory) => {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      directory,
      `${id}.jpeg`
    );
    fs.unlinkSync(filePath);
  } catch (error) {
    logger.error(error);
  }
};

function createWebpImage(base64Image, outputPath) {
  Jimp.read(Buffer.from(base64Image, "base64"), (err, image) => {
    if (err) throw err;
    image.quality(60).write(outputPath);
  });
}

export { saveImage, deleteImage };
