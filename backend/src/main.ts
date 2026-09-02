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

  const envFrontend = process.env.FRONTEND_URL;
  const configuredOrigins = envFrontend
    ? envFrontend.split(",").map((s) => s.trim())
    : ["http://localhost:3000", "http://localhost:3001"];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (
        configuredOrigins.includes(origin) ||
        /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Accept,Authorization",
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
