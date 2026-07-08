import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import type { Express } from 'express';
import { extname } from 'path';
import { UserRole } from '../common/enums';
import { SupabaseAuthGuard, Roles, RolesGuard } from '../auth/guards';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('upload')
export class UploadController {
  constructor(private supabase: SupabaseService) {}

  @UseGuards(SupabaseAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.VENDOR)
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  async upload(@UploadedFile() file: Express.Multer.File) {
    const ext = extname(file.originalname) || '.jpg';
    const path = `uploads/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    const url = await this.supabase.uploadFile(
      path,
      file.buffer,
      file.mimetype,
    );
    return { url };
  }
}
