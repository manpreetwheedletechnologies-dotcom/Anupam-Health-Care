import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateServiceDto {
  @IsNotEmpty() @IsString() title!: string;
  @IsOptional() @IsString() slug?: string; // auto-generated from title if omitted
  @IsNotEmpty() @IsString() desc!: string;
  @IsOptional() @IsString() longDesc?: string;
  @IsNotEmpty() @IsString() icon!: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsString() bg?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsArray() features?: string[];
  @IsOptional() @IsArray() benefits?: string[];
  @IsOptional() @IsArray() process?: string[];
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateServiceDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() desc?: string;
  @IsOptional() @IsString() longDesc?: string;
  @IsOptional() @IsString() icon?: string;
  @IsOptional() @IsString() color?: string;
  @IsOptional() @IsString() bg?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsArray() features?: string[];
  @IsOptional() @IsArray() benefits?: string[];
  @IsOptional() @IsArray() process?: string[];
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
