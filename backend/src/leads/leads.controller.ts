import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";
import { UpdateLeadDto } from "./dto/update-lead.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  // Public — the booking form on the site posts here.
  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  // Everything below needs a valid admin JWT (see /auth/login).
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("stats")
  stats() {
    return this.leadsService.stats();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  updateStatus(@Param("id") id: string, @Body() dto: UpdateLeadDto) {
    return this.leadsService.updateStatus(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.leadsService.remove(id);
  }
}
