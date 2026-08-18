import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { LeadsModule } from "./leads/leads.module";
import { ServicesModule } from "./services/services.module";
import { PackagesModule } from "./packages/packages.module";
import { TestimonialsModule } from "./testimonials/testimonials.module";
import { TeamModule } from "./team/team.module";
import { BlogModule } from "./blog/blog.module";
import { UploadModule } from "./upload/upload.module";
import { AboutModule } from "./about/about.module";

@Module({
  imports: [
    AuthModule,
    LeadsModule,
    ServicesModule,
    PackagesModule,
    TestimonialsModule,
    TeamModule,
    BlogModule,
    UploadModule,
    AboutModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
