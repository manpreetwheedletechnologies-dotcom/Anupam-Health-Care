import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTestimonialDto, UpdateTestimonialDto } from "./dto/testimonial.dto";

@Injectable()
export class TestimonialsService {
  constructor(private readonly prisma: PrismaService) {}

  findAllPublic() {
    return this.prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  }

  findAllAdmin() {
    return this.prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  }

  private defaultAvatar(name: string) {
    const colors = ["2e7d32", "1a2a4a"];
    const color = colors[name.length % colors.length];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=${color}&color=fff&size=100&bold=true`;
  }

  create(dto: CreateTestimonialDto) {
    return this.prisma.testimonial.create({
      data: {
        name: dto.name,
        location: dto.location,
        quote: dto.quote,
        rating: dto.rating ?? 5,
        date: dto.date ?? "Recently",
        service: dto.service ?? "",
        image: dto.image || this.defaultAvatar(dto.name),
        order: dto.order ?? 0,
        published: dto.published ?? true,
      },
    });
  }

  async update(id: string, dto: UpdateTestimonialDto) {
    await this.ensureExists(id);
    return this.prisma.testimonial.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.testimonial.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const row = await this.prisma.testimonial.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Testimonial not found");
    return row;
  }
}
