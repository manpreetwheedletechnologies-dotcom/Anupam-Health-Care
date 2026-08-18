import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBlogPostDto {
  @IsNotEmpty() @IsString() title!: string;
  @IsOptional() @IsString() slug?: string;
  @IsNotEmpty() @IsString() excerpt!: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsBoolean() published?: boolean;
}

export class UpdateBlogPostDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsString() slug?: string;
  @IsOptional() @IsString() excerpt?: string;
  @IsOptional() @IsString() content?: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() date?: string;
  @IsOptional() @IsBoolean() published?: boolean;
}
