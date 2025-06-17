import amqplib from "amqplib";
import dotenv from "dotenv";
dotenv.config();

const EXCHANGE_NAME = "thumbnail_jobs";
let channel;

export async function publishThumbnailJob(imagePath) {
  if (!imagePath) return;

  if (!channel) {
    const connection = await amqplib.connect(process.env.RABBITMQ_BROKER_URL);
    channel = await connection.createChannel();
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
  }

  const message = {
    imagePath,
  };

  channel.publish(EXCHANGE_NAME, "*", Buffer.from(JSON.stringify(message)), {
    persistent: true,
  });
}
