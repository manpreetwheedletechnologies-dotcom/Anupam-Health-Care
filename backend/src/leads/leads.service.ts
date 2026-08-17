import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({ data: { ...dto, status: "new" } });
  }

  findAll() {
    return this.prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  }

  async updateStatus(id: string, dto: UpdateLeadDto) {
    await this.ensureExists(id);
    return this.prisma.lead.update({ where: { id }, data: { status: dto.status } });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.lead.delete({ where: { id } });
    return { success: true };
  }

  async stats() {
    const [total, newLeads, converted, services, packages, testimonials, team, blog] =
      await Promise.all([
        this.prisma.lead.count(),
        this.prisma.lead.count({ where: { status: "new" } }),
        this.prisma.lead.count({ where: { status: "converted" } }),
        this.prisma.service.count(),
        this.prisma.package.count(),
        this.prisma.testimonial.count(),
        this.prisma.teamMember.count(),
        this.prisma.blogPost.count(),
      ]);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const leadsToday = await this.prisma.lead.count({
      where: { createdAt: { gte: startOfToday } },
    });

    return {
      totalLeads: total,
      newLeads,
      convertedLeads: converted,
      leadsToday,
      counts: { services, packages, testimonials, team, blog },
    };
  }

  private async ensureExists(id: string) {
    const row = await this.prisma.lead.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Lead not found");
    return row;
  }
}
