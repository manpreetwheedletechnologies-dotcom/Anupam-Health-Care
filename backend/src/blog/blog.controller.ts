import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { BlogService } from "./blog.service";
import { CreateBlogPostDto, UpdateBlogPostDto } from "./dto/blog.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("blog")
export class BlogController {
  constructor(private readonly blog: BlogService) {}

  @Get()
  findAll() {
    return this.blog.findAllPublic();
  }

  @Get("slug/:slug")
  findOne(@Param("slug") slug: string) {
    return this.blog.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get("admin/all")
  findAllAdmin() {
    return this.blog.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateBlogPostDto) {
    return this.blog.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateBlogPostDto) {
    return this.blog.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.blog.remove(id);
  }
}
