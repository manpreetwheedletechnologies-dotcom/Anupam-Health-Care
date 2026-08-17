import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { PackagesService } from "./packages.service";
import { CreatePackageDto, UpdatePackageDto } from "./dto/package.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("packages")
export class PackagesController {
  constructor(private readonly packages: PackagesService) {}

  @Get()
  findAll() {
    return this.packages.findAllPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get("admin/all")
  findAllAdmin() {
    return this.packages.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePackageDto) {
    return this.packages.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdatePackageDto) {
    return this.packages.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.packages.remove(id);
  }
}
