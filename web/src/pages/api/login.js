import logger from "@/helpers/logger";
import dbConnect from "@/mongoose/dbConnect";
import User from "@/mongoose/models/User";

const handler = async (req, res) => {
  await dbConnect("Monica");

  const { method } = req;
  debugger;
  try {
    if (method === "POST") {
      const user = await User.findOne({ UserName: req.body.UserName });

      res.status(200).json(user);
    } else {
      return res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).json("Some error caught.");
  }
};

export default handler;
