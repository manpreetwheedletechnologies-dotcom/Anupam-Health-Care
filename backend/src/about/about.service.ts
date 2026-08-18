import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { UpdateAboutDto } from "./dto/update-about.dto";

/**
 * The About page has exactly one "document" of content — there's no list,
 * no create/delete from the admin dashboard, just one record you edit.
 * get() lazily creates it (using the schema's defaults) the first time
 * anyone asks, so there's nothing to seed manually.
 */
@Injectable()
export class AboutService {
  constructor(private readonly prisma: PrismaService) {}

  async get() {
    const existing = await this.prisma.aboutContent.findFirst();
    if (existing) return existing;
    return this.prisma.aboutContent.create({ data: {} });
  }

  async update(dto: UpdateAboutDto) {
    const existing = await this.prisma.aboutContent.findFirst();
    if (!existing) {
      return this.prisma.aboutContent.create({ data: dto });
    }
    return this.prisma.aboutContent.update({
      where: { id: existing.id },
      data: dto,
    });
  }
}
