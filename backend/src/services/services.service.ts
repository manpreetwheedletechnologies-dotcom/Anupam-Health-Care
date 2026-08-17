import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateServiceDto, UpdateServiceDto } from "./dto/service.dto";
import { fromJsonArray, slugify, toJsonArray } from "../common/json.util";

function present(row: any) {
  return { ...row, features: toJsonArray(row.features) };
}

@Injectable()
export class ServicesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPublic() {
    const rows = await this.prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map(present);
  }

  async findAllAdmin() {
    const rows = await this.prisma.service.findMany({ orderBy: { order: "asc" } });
    return rows.map(present);
  }

  async findBySlug(slug: string) {
    const row = await this.prisma.service.findUnique({ where: { slug } });
    if (!row || !row.published) throw new NotFoundException("Service not found");
    return present(row);
  }

  async create(dto: CreateServiceDto) {
    const slug = dto.slug ? slugify(dto.slug) : slugify(dto.title);
    const row = await this.prisma.service.create({
      data: {
        title: dto.title,
        slug,
        desc: dto.desc,
        icon: dto.icon,
        color: dto.color ?? "navy",
        bg: dto.bg ?? "sky",
        image: dto.image ?? "/images/services/default.jpg",
        features: fromJsonArray(dto.features),
        order: dto.order ?? 0,
        published: dto.published ?? true,
      },
    });
    return present(row);
  }

  async update(id: string, dto: UpdateServiceDto) {
    await this.ensureExists(id);
    const row = await this.prisma.service.update({
      where: { id },
      data: {
        ...(dto.title !== undefined ? { title: dto.title } : {}),
        ...(dto.slug !== undefined ? { slug: slugify(dto.slug) } : {}),
        ...(dto.desc !== undefined ? { desc: dto.desc } : {}),
        ...(dto.icon !== undefined ? { icon: dto.icon } : {}),
        ...(dto.color !== undefined ? { color: dto.color } : {}),
        ...(dto.bg !== undefined ? { bg: dto.bg } : {}),
        ...(dto.image !== undefined ? { image: dto.image } : {}),
        ...(dto.features !== undefined ? { features: fromJsonArray(dto.features) } : {}),
        ...(dto.order !== undefined ? { order: dto.order } : {}),
        ...(dto.published !== undefined ? { published: dto.published } : {}),
      },
    });
    return present(row);
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.service.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const row = await this.prisma.service.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Service not found");
    return row;
  }
}
