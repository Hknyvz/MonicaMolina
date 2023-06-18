import { deleteImage, saveImage } from "@/helpers/file";
import dbConnect from "@/mongoose/dbConnect";
import CarouselModel from "@/mongoose/models/Carousel";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
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
  } catch (err) {
    console.error("err", err);
    return res.status(500).json({ message: "Dosya kaydedilemedi.", err: err });
  }
};

export default handler;
