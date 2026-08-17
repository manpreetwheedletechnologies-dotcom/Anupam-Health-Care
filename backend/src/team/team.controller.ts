import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { TeamService } from "./team.service";
import { CreateTeamMemberDto, UpdateTeamMemberDto } from "./dto/team.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("team")
export class TeamController {
  constructor(private readonly team: TeamService) {}

  @Get()
  findAll() {
    return this.team.findAllPublic();
  }

  @UseGuards(JwtAuthGuard)
  @Get("admin/all")
  findAllAdmin() {
    return this.team.findAllAdmin();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateTeamMemberDto) {
    return this.team.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTeamMemberDto) {
    return this.team.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.team.remove(id);
  }
}
