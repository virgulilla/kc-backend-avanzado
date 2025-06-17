import amqplib from "amqplib";
import { Jimp } from "jimp";
import dotenv from "dotenv";

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
        await image.write(imagePath);
        console.log("Thumbnail generado:", imagePath);

        channel.ack(msg);
      } catch (err) {
        console.error("Error generando thumbnail:", err);
        channel.nack(msg, false, false);
      }
    },
    { noAck: false }
  );
})();
