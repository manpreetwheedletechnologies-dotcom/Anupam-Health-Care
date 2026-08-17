import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from "class-validator";

export class CreateTestimonialDto {
  @IsNotEmpty() @IsString() name!: string;
  @IsNotEmpty() @IsString() location!: string;
  @IsNotEmpty() @IsString() quote!: string;
  @IsOptional() @IsInt() @Min(1) @Max(5) rating?: number;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsString() service?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateTestimonialDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsString() location?: string;
  @IsOptional() @IsString() quote?: string;
  @IsOptional() @IsInt() @Min(1) @Max(5) rating?: number;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsString() service?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsInt() order?: number;
  @IsOptional() @IsBoolean() published?: boolean;
}
