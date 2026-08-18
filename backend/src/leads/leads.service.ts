import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";

@Injectable()
export class LeadsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLeadDto) {
    return this.prisma.lead.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        service: dto.service,
        area: dto.area,
        preferredDate: dto.preferredDate ?? "",
        preferredTime: dto.preferredTime ?? "",
        status: "new",
      },
    });
  }

  findAll() {
    return this.prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  }

  // Handles status changes AND confirming an appointment date/time —
  // whichever fields are present in the request get updated.
  async update(id: string, dto: UpdateLeadDto) {
    await this.ensureExists(id);
    return this.prisma.lead.update({
      where: { id },
      data: {
        ...(dto.status !== undefined ? { status: dto.status } : {}),
        ...(dto.confirmedDate !== undefined ? { confirmedDate: dto.confirmedDate } : {}),
        ...(dto.confirmedTime !== undefined ? { confirmedTime: dto.confirmedTime } : {}),
      },
    });
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

    // Appointments confirmed by admin (confirmedDate set) — useful for a
    // dashboard "upcoming appointments" count.
    const upcomingAppointments = await this.prisma.lead.count({
      where: { confirmedDate: { not: "" } },
    });

    return {
      totalLeads: total,
      newLeads,
      convertedLeads: converted,
      leadsToday,
      upcomingAppointments,
      counts: { services, packages, testimonials, team, blog },
    };
  }

  private async ensureExists(id: string) {
    const row = await this.prisma.lead.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Lead not found");
    return row;
  }
}
