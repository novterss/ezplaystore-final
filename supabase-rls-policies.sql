-- ============================================
-- Supabase RLS (Row Level Security) Policies
-- สำหรับ EzplaystoreTH
-- ============================================

-- ⚠️ วิธีใช้:
-- 1. ไปที่ Supabase Dashboard → SQL Editor
-- 2. Paste script นี้แล้วกด Run
-- 3. หรือรันทีละ section ก็ได้

-- ============================================
-- 1. USERS TABLE
-- ============================================

-- เปิด RLS สำหรับ users table
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: ทุกคนอ่านข้อมูล user ได้ (สำหรับแสดง profile)
CREATE POLICY "Users are viewable by everyone" ON users
FOR SELECT USING (true);

-- Policy: Service role สามารถเพิ่ม/แก้ไข/ลบ user ได้
-- (ใช้กับ API routes ที่ใช้ service_role key)
CREATE POLICY "Service role can manage users" ON users
FOR ALL USING (auth.role() = 'service_role');

-- Policy: User อัพเดทข้อมูลตัวเองได้ (ถ้าใช้ Supabase Auth)
-- CREATE POLICY "Users can update own data" ON users
-- FOR UPDATE USING (auth.uid()::text = discord_id);


-- ============================================
-- 2. REVIEWS TABLE
-- ============================================

-- เปิด RLS สำหรับ reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Policy: ทุกคนอ่าน reviews ได้
CREATE POLICY "Reviews are viewable by everyone" ON reviews
FOR SELECT USING (true);

-- Policy: User ที่ login แล้วสร้าง review ได้
CREATE POLICY "Authenticated users can create reviews" ON reviews
FOR INSERT WITH CHECK (true);
-- หมายเหตุ: เราใช้ NextAuth ไม่ใช่ Supabase Auth 
-- ดังนั้นการ check auth ทำที่ API level แทน

-- Policy: Service role จัดการ reviews ได้
CREATE POLICY "Service role can manage reviews" ON reviews
FOR ALL USING (auth.role() = 'service_role');


-- ============================================
-- 3. DOWNLOAD_LOGS TABLE
-- ============================================

-- เปิด RLS สำหรับ download_logs table
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- Policy: ทุกคนอ่าน download logs ได้ (สำหรับ LiveStats)
CREATE POLICY "Download logs viewable by everyone" ON download_logs
FOR SELECT USING (true);

-- Policy: Service role เพิ่ม/จัดการ logs ได้
CREATE POLICY "Service role can manage download_logs" ON download_logs
FOR ALL USING (auth.role() = 'service_role');


-- ============================================
-- 4. OPTIONAL: ถ้ามี table อื่นๆ
-- ============================================

-- ถ้ามี announcements table:
-- ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Announcements viewable by everyone" ON announcements
-- FOR SELECT USING (true);

-- ถ้ามี products table:
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Products viewable by everyone" ON products
-- FOR SELECT USING (true);


-- ============================================
-- ✅ VERIFICATION
-- ============================================
-- รันคำสั่งนี้เพื่อเช็คว่า RLS เปิดแล้ว:
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';
