import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private admin: SupabaseClient;
  private bucket: string;

  constructor(private config: ConfigService) {
    const url = config.get<string>('supabase.url');
    const key = config.get<string>('supabase.serviceRoleKey');
    this.bucket = config.get<string>('supabase.storageBucket', 'product-images');

    if (!url || !key) {
      throw new Error(
        'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required. See docs/SUPABASE-SETUP.md',
      );
    }

    this.admin = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }

  get client(): SupabaseClient {
    return this.admin;
  }

  get storageBucket(): string {
    return this.bucket;
  }

  async getUserFromToken(accessToken: string): Promise<SupabaseUser> {
    const { data, error } = await this.admin.auth.getUser(accessToken);
    if (error || !data.user) {
      throw new UnauthorizedException('Invalid or expired session');
    }
    return data.user;
  }

  async uploadFile(
    path: string,
    buffer: Buffer,
    contentType: string,
  ): Promise<string> {
    const { error } = await this.admin.storage
      .from(this.bucket)
      .upload(path, buffer, { contentType, upsert: true });

    if (error) throw new Error(`Storage upload failed: ${error.message}`);

    const { data } = this.admin.storage.from(this.bucket).getPublicUrl(path);
    return data.publicUrl;
  }

  async createAuthUser(params: {
    email: string;
    password: string;
    name: string;
    role: string;
  }) {
    const { data, error } = await this.admin.auth.admin.createUser({
      email: params.email,
      password: params.password,
      email_confirm: true,
      user_metadata: { name: params.name, role: params.role },
      app_metadata: { role: params.role },
    });
    if (error) throw new Error(error.message);
    return data.user!;
  }
}
