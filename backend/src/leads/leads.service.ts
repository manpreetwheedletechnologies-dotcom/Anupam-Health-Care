import { Injectable } from "@nestjs/common";
import { randomUUID } from "crypto";
import { CreateLeadDto } from "./dto/create-lead.dto";

export interface Lead extends CreateLeadDto {
  id: string;
  createdAt: Date;
}

/**
 * In-memory store — good enough to wire up the frontend and test the
 * flow end to end. Swap this for Prisma + Postgres when ready:
 *
 *   model Lead {
 *     id        String   @id @default(uuid())
 *     name      String
 *     phone     String
 *     service   String
 *     area      String
 *     createdAt DateTime @default(now())
 *   }
 *
 * Then replace the array below with `this.prisma.lead.create(...)` /
 * `findMany()` calls.
 */
@Injectable()
export class LeadsService {
  private leads: Lead[] = [];

  create(dto: CreateLeadDto): Lead {
    const lead: Lead = {
      ...dto,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.leads.push(lead);
    return lead;
  }

  findAll(): Lead[] {
    return this.leads;
  }
}
