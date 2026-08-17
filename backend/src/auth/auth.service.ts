import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma.service";

/**
 * Admin login now checks the User collection in MongoDB instead of env
 * variables. There's no public signup route — admin users are created via
 * `npm run create-admin` (see scripts/create-admin.js), which reads
 * ADMIN_EMAIL / ADMIN_PASSWORD from .env, hashes the password, and
 * upserts it into the User collection. After that first run you can
 * change ADMIN_EMAIL/ADMIN_PASSWORD in .env freely — they're only read
 * when you explicitly run create-admin again.
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly prisma: PrismaService
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const token = await this.jwt.signAsync({ sub: user.id, email: user.email });
    return { accessToken: token, email: user.email, name: user.name };
  }
}
