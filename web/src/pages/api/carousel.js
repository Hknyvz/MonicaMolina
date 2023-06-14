import dbConnect from "@/mongoose/dbConnect";
import Carousel from "@/mongoose/models/Carousel";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const handler = async (req, res) => {
  await dbConnect();
  const writeFileAsync = promisify(fs.writeFile);
  console.log(req.body);
  if (req.method === "POST") {
    let imageData = req.body.image;

    if (typeof imageData === "string" && imageData.startsWith("data:image")) {
      const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
      imageData = Buffer.from(base64Data, "base64");
    }

    let fileName = `home_carousel_${req.body.order}.png`;
    let filePath = path.join(process.cwd(), "public", "/home-photo", fileName);

    try {
      await writeFileAsync(filePath, imageData, { encoding: "base64" });
      const newCarousel = await Carousel.create({
        Order: req.body.order,
        ImageUrl: filePath,
        ImageText: req.body.text,
      });
      return res
        .status(200)
        .json({ message: "Dosya başarıyla kaydedildi.", data: newCarousel });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Dosya kaydedilemedi.", err: err });
    }
  }
};

export default handler;
