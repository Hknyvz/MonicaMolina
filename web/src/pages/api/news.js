import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import News from "@/mongoose/models/News";

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
      let news = await News.find().exec();
      return res.status(200).json(news);
    }
  } catch (err) {
    logger.error(`Api Biography:${err}`);
    return res.status(500).json({ message: "Couldn't update", err: err });
  }
};

export default handler;
