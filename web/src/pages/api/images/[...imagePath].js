import logger from "@/helpers/logger";
import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { imagePath } = req.query;
  const joinPath = imagePath.join("/");
  const fullPath = path.join(process.cwd(), "public", joinPath);
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      logger.error(err);
      res.status(404).end();
      return;
    }
    res.setHeader("Content-Type", "image/webp");
    return res.end(data);
  });
}
