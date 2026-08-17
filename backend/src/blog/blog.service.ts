import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateBlogPostDto, UpdateBlogPostDto } from "./dto/blog.dto";
import { slugify } from "../common/json.util";

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  findAllPublic() {
    return this.prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
    });
  }

  findAllAdmin() {
    return this.prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
  }

  async findBySlug(slug: string) {
    const row = await this.prisma.blogPost.findUnique({ where: { slug } });
    if (!row || !row.published) throw new NotFoundException("Post not found");
    return row;
  }

  create(dto: CreateBlogPostDto) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);
    return this.prisma.blogPost.create({
      data: {
        title: dto.title,
        slug,
        excerpt: dto.excerpt,
        content: dto.content ?? "",
        date: dto.date ?? new Date().toLocaleString("en-IN", { month: "long", year: "numeric" }),
        published: dto.published ?? true,
      },
    });
  }

  async update(id: string, dto: UpdateBlogPostDto) {
    await this.ensureExists(id);
    return this.prisma.blogPost.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.slug !== undefined ? { slug: slugify(dto.slug) } : {}),
        ...(dto.excerpt !== undefined ? { excerpt: dto.excerpt } : {}),
        ...(dto.content !== undefined ? { content: dto.content } : {}),
        ...(dto.date !== undefined ? { date: dto.date } : {}),
        ...(dto.published !== undefined ? { published: dto.published } : {}),
      },
    });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.blogPost.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const row = await this.prisma.blogPost.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Post not found");
    return row;
  }
}
