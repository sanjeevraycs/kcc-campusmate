-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  roll_number TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  course TEXT,
  year INTEGER,
  department TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_code TEXT NOT NULL,
  course_name TEXT NOT NULL,
  professor TEXT,
  credits INTEGER,
  semester TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view courses"
  ON public.courses FOR SELECT
  USING (true);

-- Create timetable table
CREATE TABLE public.timetable (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  day_of_week TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  room_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.timetable ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own timetable"
  ON public.timetable FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own timetable"
  ON public.timetable FOR ALL
  USING (auth.uid() = user_id);

-- Create complaints table
CREATE TABLE public.complaints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'pending',
  is_anonymous BOOLEAN DEFAULT false,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own complaints"
  ON public.complaints FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create complaints"
  ON public.complaints FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own complaints"
  ON public.complaints FOR UPDATE
  USING (auth.uid() = user_id);

-- Create cab_sharing table
CREATE TABLE public.cab_sharing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  ride_type TEXT NOT NULL,
  destination TEXT NOT NULL,
  departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
  seats_available INTEGER,
  cost_per_person DECIMAL(10,2),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.cab_sharing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active rides"
  ON public.cab_sharing FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create rides"
  ON public.cab_sharing FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own rides"
  ON public.cab_sharing FOR UPDATE
  USING (auth.uid() = user_id);

-- Create lost_found table
CREATE TABLE public.lost_found (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  item_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  status TEXT DEFAULT 'active',
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lost_found ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active items"
  ON public.lost_found FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can create items"
  ON public.lost_found FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own items"
  ON public.lost_found FOR UPDATE
  USING (auth.uid() = user_id);

-- Create marketplace table
CREATE TABLE public.marketplace (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  condition TEXT,
  images TEXT[],
  status TEXT DEFAULT 'available',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.marketplace ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available items"
  ON public.marketplace FOR SELECT
  USING (status = 'available');

CREATE POLICY "Users can create listings"
  ON public.marketplace FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listings"
  ON public.marketplace FOR UPDATE
  USING (auth.uid() = user_id);

-- Create gate_logs table
CREATE TABLE public.gate_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  entry_type TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.gate_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own gate logs"
  ON public.gate_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create gate logs"
  ON public.gate_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create elections table
CREATE TABLE public.elections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'upcoming',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.elections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view elections"
  ON public.elections FOR SELECT
  USING (true);

-- Create candidates table
CREATE TABLE public.candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  position TEXT NOT NULL,
  manifesto TEXT,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view candidates"
  ON public.candidates FOR SELECT
  USING (true);

-- Create votes table
CREATE TABLE public.votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  election_id UUID REFERENCES public.elections(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  candidate_id UUID REFERENCES public.candidates(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(election_id, user_id)
);

ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own votes"
  ON public.votes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can cast votes"
  ON public.votes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_complaints_updated_at
  BEFORE UPDATE ON public.complaints
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_marketplace_updated_at
  BEFORE UPDATE ON public.marketplace
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();