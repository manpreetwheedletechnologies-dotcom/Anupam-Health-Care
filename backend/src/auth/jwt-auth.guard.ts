import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

/**
 * Attach with @UseGuards(JwtAuthGuard) on any controller/route that
 * mutates content (create/update/delete, leads list). Public GET
 * endpoints used by the marketing site stay unguarded.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader: string | undefined = request.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

    if (!token) {
      throw new UnauthorizedException("Missing admin token");
    }

    try {
      const payload = await this.jwt.verifyAsync(token);
      request.admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid or expired admin token");
    }
  }
}
