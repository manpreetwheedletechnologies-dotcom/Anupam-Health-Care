import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { CreateTeamMemberDto, UpdateTeamMemberDto } from "./dto/team.dto";

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  findAllPublic() {
    return this.prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
  }

  findAllAdmin() {
    return this.prisma.teamMember.findMany({ orderBy: { order: "asc" } });
  }

  // If no photo is uploaded, generate a colored initials avatar (same
  // pattern as TestimonialsService) so a card is never left with a plain
  // placeholder icon.
  private defaultAvatar(name: string) {
    const colors = ["1a2a4a", "2e7d32"];
    const color = colors[name.length % colors.length];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=${color}&color=fff&size=200&bold=true`;
  }

  create(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({
      data: {
        name: dto.name,
        role: dto.role,
        desc: dto.desc,
        image: dto.image || this.defaultAvatar(dto.name),
        order: dto.order ?? 0,
        published: dto.published ?? true,
      },
    });
  }

  async update(id: string, dto: UpdateTeamMemberDto) {
    await this.ensureExists(id);
    return this.prisma.teamMember.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.ensureExists(id);
    await this.prisma.teamMember.delete({ where: { id } });
    return { success: true };
  }

  private async ensureExists(id: string) {
    const row = await this.prisma.teamMember.findUnique({ where: { id } });
    if (!row) throw new NotFoundException("Team member not found");
    return row;
  }
}
