import fs from "fs";
import Jimp from "jimp";
import path from "path";

const saveImage = async (image, guid, directory) => {
  const base64Data = image.replace(/^data:image\/png;base64,/, "");
  const decodedImage = Buffer.from(base64Data, "base64");
  let fileName = `${guid}.webp`;
  let relativePath = path.join(directory, fileName);
  let filePath = path.join(process.cwd(), "public", relativePath);
  // fs.writeFileSync(filePath, decodedImage);
  // relativePath = relativePath.replace("\\", "/");
  // relativePath = "/" + relativePath;
  await convertToWebp(base64Data, filePath);
  return relativePath;
};

const deleteImage = (id, directory) => {
  try {
    const filePath = path.join(process.cwd(), "public", directory, `${id}.jpg`);
    fs.unlinkSync(filePath);
  } catch (error) {}
};

async function convertToWebp(base64Image, outputPath) {
  const image = await Jimp.read(Buffer.from(base64Image, "base64"));

  await image.writeAsync(outputPath);
  console.log("Resim başarıyla kaydedildi");
}

export { saveImage, deleteImage };
