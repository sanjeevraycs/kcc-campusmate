-- Create users table for custom authentication
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  roll_number TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL UNIQUE,
  email TEXT,
  department TEXT,
  year TEXT,
  section TEXT,
  current_otp TEXT,
  otp_expires_at TIMESTAMP WITH TIME ZONE,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can view their own data
CREATE POLICY "Users can view their own data"
ON public.users
FOR SELECT
USING (id = (SELECT id FROM public.users WHERE phone_number = current_setting('request.jwt.claims', true)::json->>'phone'));

-- Users can update their own data
CREATE POLICY "Users can update their own data"
ON public.users
FOR UPDATE
USING (id = (SELECT id FROM public.users WHERE phone_number = current_setting('request.jwt.claims', true)::json->>'phone'));

-- Anyone can insert (for signup)
CREATE POLICY "Anyone can insert for signup"
ON public.users
FOR INSERT
WITH CHECK (true);

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();