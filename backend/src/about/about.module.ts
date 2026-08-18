import { Module } from "@nestjs/common";
import { AboutController } from "./about.controller";
import { AboutService } from "./about.service";
import { PrismaService } from "../prisma.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [AuthModule],
  controllers: [AboutController],
  providers: [AboutService, PrismaService],
})
export class AboutModule {}
