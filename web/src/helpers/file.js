import fs from "fs";
import Jimp from "jimp";
import path from "path";
import logger from "./logger";

const saveImage = async (image, guid, directory) => {
  let base64Data = image.replace(/^data:image\/png;base64,/, "");
  base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "");
  base64Data = base64Data.replace(/^data:image\/jpg;base64,/, "");
  base64Data = base64Data.replace(/^data:image\/gif;base64,/, "");
  base64Data = base64Data.replace(/^data:image\/bmp;base64,/, "");
  let fileName = `${guid}.webp`;
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
      `${id}.webp`
    );
    fs.unlinkSync(filePath);
  } catch (error) {
    logger.error(error);
  }
};

async function createWebpImage(base64Image, outputPath) {
  const image = await Jimp.read(Buffer.from(base64Image, "base64"));

  await image.writeAsync(outputPath);
}

export { saveImage, deleteImage };
