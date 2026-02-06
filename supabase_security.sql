-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE download_logs ENABLE ROW LEVEL SECURITY;

-- USERS TABLE POLICIES
-- 1. Users can view their own data
CREATE POLICY "Users can view own data" ON users
FOR SELECT USING (auth.uid() = id);

-- 2. Users can update their own data
CREATE POLICY "Users can update own data" ON users
FOR UPDATE USING (auth.uid() = id);

-- 3. Admin can view all data (Replace 'admin@example.com' with your actual email)
CREATE POLICY "Admin can view all users" ON users
FOR SELECT USING (auth.jwt() ->> 'email' = 'reze.chaisamran@gmail.com'); -- Replace with your email

-- DOWNLOAD_LOGS TABLE POLICIES
-- 1. Users can insert logs (History)
CREATE POLICY "Users can insert logs" ON download_logs
FOR INSERT WITH CHECK (auth.uid() = (SELECT id FROM users WHERE email = download_logs.user_email));

-- 2. Users can view their own logs
CREATE POLICY "Users can view own logs" ON download_logs
FOR SELECT USING (user_email = (SELECT email FROM users WHERE id = auth.uid()));

-- 3. Admin can view all logs
CREATE POLICY "Admin can view all logs" ON download_logs
FOR SELECT USING (auth.jwt() ->> 'email' = 'reze.chaisamran@gmail.com'); -- Replace with your email
