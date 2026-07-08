import { ConflictException, Injectable } from '@nestjs/common';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { UserRole } from '../common/enums';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SyncProfileDto } from './auth.dto';
import { userSelect } from './guards';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private supabase: SupabaseService,
  ) {}

  async syncProfile(sbUser: SupabaseUser, dto: SyncProfileDto = {}) {
    const meta = sbUser.user_metadata ?? {};
    const appMeta = sbUser.app_metadata ?? {};
    const email = sbUser.email!;

    const bySupabase = await this.prisma.user.findUnique({
      where: { supabaseId: sbUser.id },
      select: userSelect,
    });

    if (bySupabase) {
      return this.prisma.user.update({
        where: { id: bySupabase.id },
        data: {
          email,
          name: dto.name ?? bySupabase.name,
          phone: dto.phone ?? bySupabase.phone,
        },
        select: userSelect,
      });
    }

    const byEmail = await this.prisma.user.findUnique({
      where: { email },
      select: userSelect,
    });

    if (byEmail) {
      return this.prisma.user.update({
        where: { id: byEmail.id },
        data: {
          supabaseId: sbUser.id,
          name: dto.name ?? byEmail.name ?? (meta.name as string) ?? email.split('@')[0],
          phone: dto.phone ?? byEmail.phone,
        },
        select: userSelect,
      });
    }

    const role =
      (appMeta.role as string) ||
      (meta.role as string) ||
      UserRole.CUSTOMER;
    const name = dto.name || (meta.name as string) || email.split('@')[0];

    const emailTaken = await this.prisma.user.findUnique({ where: { email } });
    if (emailTaken) {
      throw new ConflictException('Email already linked to another account');
    }

    return this.prisma.user.create({
      data: {
        supabaseId: sbUser.id,
        email,
        name,
        phone: dto.phone,
        role,
        ...(role === UserRole.VENDOR && dto.shopName
          ? {
              vendor: {
                create: {
                  shopName: dto.shopName,
                  approved: false,
                },
              },
            }
          : {}),
      },
      select: userSelect,
    });
  }

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: userSelect,
    });
  }

  /** Used by seed script — creates Supabase + Prisma user */
  async provisionUser(params: {
    email: string;
    password: string;
    name: string;
    role: string;
    shopName?: string;
    approved?: boolean;
  }) {
    const sbUser = await this.supabase.createAuthUser({
      email: params.email,
      password: params.password,
      name: params.name,
      role: params.role,
    });

    const user = await this.prisma.user.upsert({
      where: { supabaseId: sbUser.id },
      update: {
        name: params.name,
        role: params.role,
        email: params.email,
      },
      create: {
        supabaseId: sbUser.id,
        email: params.email,
        name: params.name,
        role: params.role,
        ...(params.role === UserRole.VENDOR
          ? {
              vendor: {
                create: {
                  shopName: params.shopName ?? 'My Shop',
                  approved: params.approved ?? false,
                },
              },
            }
          : {}),
      },
      select: userSelect,
    });

    return user;
  }
}
