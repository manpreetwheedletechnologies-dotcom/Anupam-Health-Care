import {
  BadRequestException,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { randomUUID } from "crypto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * Powers the "upload an image" control in the admin dashboard (service
 * photos, team photos, blog banners, testimonial avatars, about-page
 * story image). Files are saved to backend/uploads and served back out
 * at /uploads/<filename> — see main.ts for the static file serving setup.
 */
@Controller("uploads")
export class UploadController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads",
        filename: (_req, file, cb) => {
          cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
        },
      }),
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: (_req, file, cb) => {
        if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
          cb(new BadRequestException("Only image files (jpg, png, webp, gif, svg) are allowed"), false);
          return;
        }
        cb(null, true);
      },
    })
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("No file uploaded");
    }
    return { url: `/uploads/${file.filename}` };
  }
}
