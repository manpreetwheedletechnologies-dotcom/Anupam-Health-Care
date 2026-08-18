import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { AboutService } from "./about.service";
import { UpdateAboutDto } from "./dto/update-about.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("about")
export class AboutController {
  constructor(private readonly about: AboutService) {}

  // Public — used by the /about page
  @Get()
  get() {
    return this.about.get();
  }

  // Admin — the /admin/about editor saves here
  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Body() dto: UpdateAboutDto) {
    return this.about.update(dto);
  }
}
