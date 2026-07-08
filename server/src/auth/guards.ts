import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../common/enums';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);

const userSelect = {
  id: true,
  email: true,
  name: true,
  role: true,
  phone: true,
  supabaseId: true,
  vendor: { select: { id: true, shopName: true, approved: true } },
} as const;

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(
    private supabase: SupabaseService,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers.authorization as string | undefined;
    if (!auth?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const token = auth.slice(7);
    const sbUser = await this.supabase.getUserFromToken(token);

    let user = await this.prisma.user.findUnique({
      where: { supabaseId: sbUser.id },
      select: userSelect,
    });

    if (!user) {
      throw new UnauthorizedException(
        'Profile not synced. Call POST /api/auth/sync after login.',
      );
    }

    req.user = user;
    req.supabaseUser = sbUser;
    return true;
  }
}

/** @deprecated use SupabaseAuthGuard — kept for existing controllers */
export const JwtAuthGuard = SupabaseAuthGuard;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles?.length) return true;
    const { user } = context.switchToHttp().getRequest();
    return user && roles.includes(user.role);
  }
}

export { userSelect };
