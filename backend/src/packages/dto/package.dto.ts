import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePackageDto {
  @IsNotEmpty() @IsString() name!: string;
  @IsNotEmpty() @IsString() price!: string;
  @IsNotEmpty() @IsString() desc!: string;
  @IsOptional() @IsArray() features?: string[];
  @IsOptional() @IsArray() equipment?: string[];
  @IsOptional() @IsArray() services?: string[];
  @IsOptional() @IsString() bestFor?: string;
  @IsOptional() @IsString() duration?: string;
  @IsOptional() @IsString() savings?: string;
  @IsOptional() @IsNumber() rating?: number;
  @IsOptional() @IsBoolean() popular?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdatePackageDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() price?: string;
  @IsOptional() @IsString() desc?: string;
  @IsOptional() @IsArray() features?: string[];
  @IsOptional() @IsArray() equipment?: string[];
  @IsOptional() @IsArray() services?: string[];
  @IsOptional() @IsString() bestFor?: string;
  @IsOptional() @IsString() duration?: string;
  @IsOptional() @IsString() savings?: string;
  @IsOptional() @IsNumber() rating?: number;
  @IsOptional() @IsBoolean() popular?: boolean;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
