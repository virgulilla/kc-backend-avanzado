import amqplib from "amqplib";
import { Jimp } from "jimp";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const EXCHANGE_NAME = "thumbnail_jobs";
const QUEUE_NAME = "thumbnail_queue";

(async () => {
  const conn = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);
  const channel = await conn.createChannel();

  await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
  const q = await channel.assertQueue(QUEUE_NAME, { durable: true });

  await channel.bindQueue(q.queue, EXCHANGE_NAME, "*");

  console.log("Escuchando trabajos de thumbnails...");

  channel.consume(
    q.queue,
    async (msg) => {
      try {
        const { imagePath } = JSON.parse(msg.content.toString());

        const image = await Jimp.read(imagePath);
        image.resize({ w: 100, h: 100 });
        const dir = path.dirname(imagePath);
        const ext = path.extname(imagePath);
        const base = path.basename(imagePath, ext);
        const thumbnailPath = path.join(dir, `${base}_thumbnail${ext}`);
        await image.write(thumbnailPath);
        console.log("Thumbnail generado:", thumbnailPath);

        channel.ack(msg);
      } catch (err) {
        console.error("Error generando thumbnail:", err);
        channel.nack(msg, false, false);
      }
    },
    { noAck: false }
  );
})();
