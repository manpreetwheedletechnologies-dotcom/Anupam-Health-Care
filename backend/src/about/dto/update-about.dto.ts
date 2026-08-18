import { IsOptional, IsString } from "class-validator";

export class UpdateAboutDto {
  @IsOptional() @IsString() heroTitle?: string;
  @IsOptional() @IsString() heroSubtitle?: string;
  @IsOptional() @IsString() storyParagraph1?: string;
  @IsOptional() @IsString() storyParagraph2?: string;
  @IsOptional() @IsString() storyImage?: string;
  @IsOptional() @IsString() founderName?: string;
  @IsOptional() @IsString() founderRole?: string;
  @IsOptional() @IsString() founderQuote?: string;
  @IsOptional() @IsString() missionText?: string;
  @IsOptional() @IsString() visionText?: string;
}
