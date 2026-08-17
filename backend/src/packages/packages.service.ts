import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreatePackageDto, UpdatePackageDto } from "./dto/package.dto";
import { fromJsonArray, toJsonArray } from "../common/json.util";

function present(row: any) {
  return {
    ...row,
    features: toJsonArray(row.features),
    equipment: toJsonArray(row.equipment),
    services: toJsonArray(row.services),
  };
}

@Injectable()
export class PackagesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllPublic() {
    const rows = await this.prisma.package.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map(present);
  }

  async findAllAdmin() {
    const rows = await this.prisma.package.findMany({ orderBy: { order: "asc" } });
    return rows.map(present);
  }

  async create(dto: CreatePackageDto) {
    const row = await this.prisma.package.create({
      data: {
        name: dto.name,
        price: dto.price,
        desc: dto.desc,
        features: fromJsonArray(dto.features),
        equipment: fromJsonArray(dto.equipment),
        services: fromJsonArray(dto.services),
        bestFor: dto.bestFor ?? "",
        duration: dto.duration ?? "",
        savings: dto.savings ?? "",
        rating: dto.rating ?? 4.5,
        popular: dto.popular ?? false,
        order: dto.order ?? 0,
        published: dto.published ?? true,
      },
    });
    return present(row);
  }

  async update(id: string, dto: UpdatePackageDto) {
    await this.ensureExists(id);
    const row = await this.prisma.package.update({
      where: { id },
      data: {
        ...(dto.name !== undefined ? { name: dto.name } : {}),
        ...(dto.price !== undefined ? { price: dto.price } : {}),
        ...(dto.desc !== undefined ? { desc: dto.desc } : {}),
        ...(dto.features !== undefined ? { features: fromJsonArray(dto.features) } : {}),
        ...(dto.equipment !== undefined ? { equipment: fromJsonArray(dto.equipment) } : {}),
        ...(dto.services !== undefined ? { services: fromJsonArray(dto.services) } : {}),
        ...(dto.bestFor !== undefined ? { bestFor: dto.bestFor } : {}),
        ...(dto.duration !== undefined ? { duration: dto.duration } : {}),
        ...(dto.savings !== undefined ? { savings: dto.savings } : {}),
        ...(dto.rating !== undefined ? { rating: dto.rating } : {}),
        ...(dto.popular !== undefined ? { popular: dto.popular } : {}),
        ...(dto.order !== undefined ? { order: dto.order } : {}),
        ...(dto.published !== undefined ? { published: dto.published } : {}),
      },
    });
    return present(row);
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.package.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const row = await this.prisma.package.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Package not found");
    return row;
  }
}
