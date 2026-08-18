import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { ValidationPipe } from "@nestjs/common";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import { AppModule } from "./app.module";

async function bootstrap() {
  // Admin-dashboard image uploads land here — make sure the folder
  // exists before multer (in UploadController) tries to write to it.
  const uploadsDir = join(process.cwd(), "uploads");
  if (!existsSync(uploadsDir)) {
    mkdirSync(uploadsDir, { recursive: true });
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
  });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, transform: true })
  );

  // Serve uploaded images at http://<backend host>/uploads/<filename>
  app.useStaticAssets(uploadsDir, { prefix: "/uploads/" });

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  // eslint-disable-next-line no-console
  console.log(`Anupam backend running on http://localhost:${port}`);
}
bootstrap();
