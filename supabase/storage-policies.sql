-- Run in Supabase Dashboard → SQL Editor (safe to re-run)

-- 1. Storage bucket for product/service images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = true;

-- 2. Policies (drop first so this script is idempotent)
drop policy if exists "Public read product images" on storage.objects;
drop policy if exists "Authenticated upload product images" on storage.objects;
drop policy if exists "Authenticated update product images" on storage.objects;

create policy "Public read product images"
on storage.objects for select
using (bucket_id = 'product-images');

create policy "Authenticated upload product images"
on storage.objects for insert
with check (
  bucket_id = 'product-images'
  and auth.role() = 'authenticated'
);

create policy "Authenticated update product images"
on storage.objects for update
using (bucket_id = 'product-images' and auth.role() = 'authenticated');
