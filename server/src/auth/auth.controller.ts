import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SyncProfileDto } from './auth.dto';
import { SupabaseAuthGuard } from './guards';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('auth')
export class AuthController {
  constructor(
    private auth: AuthService,
    private supabase: SupabaseService,
  ) {}

  /** Call after Supabase signUp/signIn on the client */
  @Post('sync')
  async sync(
    @Headers('authorization') authorization: string,
    @Body() dto: SyncProfileDto,
  ) {
    const token = authorization?.replace(/^Bearer\s+/i, '');
    if (!token) throw new UnauthorizedException('Authorization required');
    const sbUser = await this.supabase.getUserFromToken(token);
    const user = await this.auth.syncProfile(sbUser, dto);
    return { user };
  }

  @UseGuards(SupabaseAuthGuard)
  @Get('me')
  me(@Req() req: { user: unknown }) {
    return req.user;
  }
}
