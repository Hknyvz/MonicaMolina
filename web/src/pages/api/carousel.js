import dbConnect from "@/mongoose/dbConnect";
import CarouselModel from "@/mongoose/models/Carousel";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const handler = async (req, res) => {
  await dbConnect("Carousel");
  const method = req.method;

  if (method === "GET") {
    let a = await CarouselModel.find();
    console.log(a._id);
    return res.status(200).json(a);
  } else if (req.method === "POST") {
    let imageData = req.body.ImageUrl;
    const base64Data = imageData.replace(/^data:image\/png;base64,/, "");
    const decodedImage = Buffer.from(base64Data, "base64");
    const guid = uuidv4();
    let fileName = `${guid}.jpg`;
    let relativePath = path.join("/home-photo", fileName);
    let filePath = path.join(process.cwd(), "public", relativePath);
    try {
      fs.writeFileSync(filePath, decodedImage);

      const model = new CarouselModel({ _id: guid });
      model.Order = req.body.Order;
      model.ImageUrl = relativePath;
      model.ImageText = req.body.ImageText;
      const result = await model.save();
      return res
        .status(200)
        .json({ message: "Dosya başarıyla kaydedildi.", data: model });
    } catch (err) {
      console.error("err", err);
      return res
        .status(500)
        .json({ message: "Dosya kaydedilemedi.", err: err });
    }
  }
};

export default handler;
