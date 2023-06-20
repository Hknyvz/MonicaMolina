import { deleteImage, saveImage } from "@/helpers/file";
import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import BiographyModel from "@/mongoose/models/Biography";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

const handler = async (req, res) => {
  await dbConnect("Monica");
  const method = req.method;
  try {
    if (method === "GET") {
      let biography = await BiographyModel.findOne();
      return res.status(200).json(biography);
    } else if (method === "PUT") {
      const response = await Update(req.body);
      return res.status(200).json(response);
    }
  } catch (err) {
    logger.error(`Api Biography:${err}`);
    return res.status(500).json({ message: "Couldn't update", err: err });
  }
};

const Update = async (data) => {
  const directory = "biography-photo";
  if (data?.ImageUrl) {
    deleteImage(data.Id, directory);
    saveImage(data.ImageUrl, data.Id, directory);
  }
  const model = { Text: data.Text, Title: data.Title };
  let updatedEntry = await BiographyModel.findByIdAndUpdate(data.Id, model, {
    new: true,
  });
  console.log(updatedEntry);
  const res = { message: "Updated successful", data: updatedEntry };
  return res;
};

export default handler;
