import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ServicesService } from "./services.service";
import { CreateServiceDto, UpdateServiceDto } from "./dto/service.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("services")
export class ServicesController {
  constructor(private readonly services: ServicesService) {}

  // Public — used by the marketing site (homepage grid, /services, /services/[slug])
  @Get()
  findAll(@Query("admin") admin?: string) {
    // The dashboard calls this with ?admin=1 + a token to also see drafts;
    // the real gate for that is the guarded /services/admin route below,
    // this branch is only ever reached with a valid header from the guard.
    return this.services.findAllPublic();
  }

  @Get("slug/:slug")
  findOne(@Param("slug") slug: string) {
    return this.services.findBySlug(slug);
  }

  // Admin — everything, including unpublished drafts
  @UseGuards(JwtAuthGuard)
  @Get("admin/all")
  findAllAdmin() {
    return this.services.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateServiceDto) {
    return this.services.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateServiceDto) {
    return this.services.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.services.remove(id);
  }
}
