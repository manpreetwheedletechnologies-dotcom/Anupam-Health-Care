import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTeamMemberDto {
  @IsNotEmpty() @IsString() name!: string;
  @IsNotEmpty() @IsString() role!: string;
  @IsNotEmpty() @IsString() desc!: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateTeamMemberDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() role?: string;
  @IsOptional() @IsString() desc?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
