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

  create(dto: CreateTeamMemberDto) {
    return this.prisma.teamMember.create({
      data: {
        name: dto.name,
        role: dto.role,
        desc: dto.desc,
        image: dto.image ?? "",
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
