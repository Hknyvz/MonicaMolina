import dbConnect from "@/mongoose/dbConnect";
import CarouselModel from "@/mongoose/models/Carousel";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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
    throw error;
  }
};

const save = async (data, guid) => {
  try {
    const relativePath = saveImage(data.ImageUrl, guid);
    const model = new CarouselModel({ _id: guid });
    model.Order = data.Order;
    model.ImageUrl = relativePath;
    model.ImageText = data.ImageText;
    await model.save();
    const res = { message: "Dosya başarıyla kaydedildi.", data: model };
    return res;
  } catch (err) {
    throw err;
  }
};

const update = async (data) => {
  try {
    deleteImage(data.Id);
    saveImage(data.ImageUrl, data.Id);
    const model = { Order: data.Order, ImageText: data.ImageText };
    let updatedEntry = await CarouselModel.findByIdAndUpdate(data.Id, model, {
      new: true,
    });
    return updatedEntry;
  } catch (err) {
    throw err;
  }
};

const handler = async (req, res) => {
  await dbConnect("Carousel");
  const method = req.method;
  try {
    if (method === "GET") {
      let carousels = await CarouselModel.find();
      return res.status(200).json(carousels);
    } else if (req.method === "POST") {
      const newGuid = uuidv4();
      const response = await save(req.body, newGuid);

      return res.status(200).json(response);
    } else if (req.method === "PUT") {
      const response = await update(req.body);

      return res.status(200).json(response);
    }
  } catch (error) {
    console.error("err", err);
    return res.status(500).json({ message: "Dosya kaydedilemedi.", err: err });
  }
};

export default handler;
