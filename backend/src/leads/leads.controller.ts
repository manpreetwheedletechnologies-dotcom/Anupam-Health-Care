import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { CreateLeadDto } from "./dto/create-lead.dto";

@Controller("leads")
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Post()
  create(@Body() dto: CreateLeadDto) {
    return this.leadsService.create(dto);
  }

  // Admin view — requires the x-admin-key header to match ADMIN_API_KEY.
  // Leads contain names and phone numbers, so this must not be public.
  // Swap for real auth (JWT/session) when this moves past a prototype.
  @Get()
  findAll(@Headers("x-admin-key") adminKey?: string) {
    const expected = process.env.ADMIN_API_KEY;
    if (!expected || adminKey !== expected) {
      throw new UnauthorizedException("Invalid or missing admin key");
    }
    return this.leadsService.findAll();
  }
}
