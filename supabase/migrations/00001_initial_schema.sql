-- ============================================================
-- AGRIVISION - COMPLETE POSTGRESQL SCHEMA & RLS MIGRATION
-- ============================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUM TYPES
CREATE TYPE user_role AS ENUM ('farmer', 'expert', 'admin');
CREATE TYPE crop_cycle_status AS ENUM ('sown', 'growing', 'harvesting', 'completed');
CREATE TYPE disease_scan_status AS ENUM ('scanned', 'expert_reviewed', 'resolved');
CREATE TYPE service_category AS ENUM ('mandi', 'fpo', 'cold_storage', 'seed_fertilizer', 'rental', 'warehouse', 'krishi_kendra');
CREATE TYPE urgency_level AS ENUM ('normal', 'high', 'critical');
CREATE TYPE case_status AS ENUM ('pending', 'assigned', 'in_review', 'resolved');
CREATE TYPE sender_role AS ENUM ('user', 'krishimitra', 'expert');

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'farmer',
    full_name TEXT NOT NULL,
    phone TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'en',
    state TEXT,
    district TEXT,
    village_city TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. FARMER PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.farmer_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_land_area_acres NUMERIC(6, 2) DEFAULT 0.0,
    primary_crops TEXT[] DEFAULT '{}',
    experience_years INT DEFAULT 0,
    soil_testing_done BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. EXPERT PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.expert_profiles (
    id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
    specialization TEXT NOT NULL,
    qualification TEXT,
    organization TEXT,
    rating NUMERIC(3, 2) DEFAULT 5.0,
    total_cases_resolved INT DEFAULT 0,
    verified BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. FARMS TABLE
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    village TEXT,
    total_area_acres NUMERIC(6, 2) NOT NULL DEFAULT 1.0,
    survey_number TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. FIELDS TABLE
CREATE TABLE IF NOT EXISTS public.fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    area_acres NUMERIC(6, 2) NOT NULL DEFAULT 1.0,
    soil_type TEXT NOT NULL DEFAULT 'Loamy',
    soil_ph NUMERIC(3, 1) DEFAULT 6.8,
    nitrogen_ppm NUMERIC(6, 2) DEFAULT 140.0,
    phosphorus_ppm NUMERIC(6, 2) DEFAULT 35.0,
    potassium_ppm NUMERIC(6, 2) DEFAULT 180.0,
    organic_carbon_pct NUMERIC(4, 2) DEFAULT 0.5,
    irrigation_type TEXT DEFAULT 'Canal/Borewell',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. CROPS TABLE
CREATE TABLE IF NOT EXISTS public.crops (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    category TEXT NOT NULL, -- Cereal, Pulse, Commercial, Vegetable
    duration_days INT NOT NULL DEFAULT 120,
    ideal_soil_ph_min NUMERIC(3, 1) DEFAULT 6.0,
    ideal_soil_ph_max NUMERIC(3, 1) DEFAULT 7.5,
    ideal_temp_min_c INT DEFAULT 15,
    ideal_temp_max_c INT DEFAULT 32,
    water_requirement_mm INT DEFAULT 500,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. CROP CYCLES TABLE
CREATE TABLE IF NOT EXISTS public.crop_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE RESTRICT,
    sowing_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_harvest_date DATE,
    status crop_cycle_status NOT NULL DEFAULT 'sown',
    yield_actual_tonnes NUMERIC(6, 2),
    revenue_actual_inr NUMERIC(10, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. SOIL RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.soil_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    tested_at DATE NOT NULL DEFAULT CURRENT_DATE,
    ph_level NUMERIC(3, 1) NOT NULL,
    nitrogen_ppm NUMERIC(6, 2) NOT NULL,
    phosphorus_ppm NUMERIC(6, 2) NOT NULL,
    potassium_ppm NUMERIC(6, 2) NOT NULL,
    organic_matter_pct NUMERIC(4, 2) DEFAULT 0.5,
    lab_name TEXT,
    report_file_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. WEATHER RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.weather_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district TEXT NOT NULL,
    temp_c NUMERIC(4, 1) NOT NULL,
    humidity_pct INT NOT NULL,
    rainfall_mm NUMERIC(5, 1) DEFAULT 0.0,
    wind_speed_kmh NUMERIC(4, 1) DEFAULT 10.0,
    condition TEXT NOT NULL DEFAULT 'Partly Cloudy',
    forecast_json JSONB DEFAULT '[]'::jsonb,
    recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. DISEASE DETECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.disease_detections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(id) ON DELETE CASCADE,
    field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
    crop_name TEXT NOT NULL,
    image_url TEXT NOT NULL,
    detected_disease TEXT NOT NULL,
    confidence_pct NUMERIC(5, 2) NOT NULL DEFAULT 85.0,
    severity TEXT NOT NULL DEFAULT 'Moderate',
    treatment_recommendations TEXT[] DEFAULT '{}',
    status disease_scan_status NOT NULL DEFAULT 'scanned',
    scanned_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. CROP RECOMMENDATIONS TABLE
CREATE TABLE IF NOT EXISTS public.crop_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    recommended_crop_id UUID NOT NULL REFERENCES public.crops(id) ON DELETE CASCADE,
    suitability_score INT NOT NULL, -- 0 to 100
    expected_yield_range TEXT NOT NULL,
    water_req_score INT DEFAULT 75,
    risk_level TEXT DEFAULT 'Low',
    reasoning TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. YIELD PREDICTIONS TABLE
CREATE TABLE IF NOT EXISTS public.yield_predictions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    crop_cycle_id UUID NOT NULL REFERENCES public.crop_cycles(id) ON DELETE CASCADE,
    predicted_yield_min_tonnes NUMERIC(6, 2) NOT NULL,
    predicted_yield_max_tonnes NUMERIC(6, 2) NOT NULL,
    predicted_revenue_min_inr NUMERIC(10, 2) NOT NULL,
    predicted_revenue_max_inr NUMERIC(10, 2) NOT NULL,
    confidence_pct INT DEFAULT 88,
    key_factors TEXT[] DEFAULT '{}',
    calculated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. MARKET PRICES TABLE
CREATE TABLE IF NOT EXISTS public.market_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    commodity TEXT NOT NULL,
    mandi_name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    price_per_quintal_inr NUMERIC(8, 2) NOT NULL,
    min_price NUMERIC(8, 2),
    max_price NUMERIC(8, 2),
    modal_price NUMERIC(8, 2),
    price_change_pct NUMERIC(4, 2) DEFAULT 0.0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. AGRICULTURAL SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.agricultural_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category service_category NOT NULL,
    address TEXT NOT NULL,
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    phone TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 17. ADVISORIES TABLE
CREATE TABLE IF NOT EXISTS public.advisories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.expert_profiles(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_hi TEXT NOT NULL,
    content_en TEXT NOT NULL,
    content_hi TEXT NOT NULL,
    target_crops TEXT[] DEFAULT '{}',
    target_districts TEXT[] DEFAULT '{}',
    urgency urgency_level DEFAULT 'normal',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 18. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'general',
    is_read BOOLEAN DEFAULT FALSE,
    link_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 19. CHAT SESSIONS & MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'KrishiMitra Session',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    sender_type sender_role NOT NULL DEFAULT 'user',
    message_text TEXT NOT NULL,
    media_url TEXT,
    language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 20. EXPERT CASES TABLE
CREATE TABLE IF NOT EXISTS public.expert_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farmer_id UUID NOT NULL REFERENCES public.farmer_profiles(id) ON DELETE CASCADE,
    expert_id UUID REFERENCES public.expert_profiles(id) ON DELETE SET NULL,
    disease_detection_id UUID REFERENCES public.disease_detections(id) ON DELETE CASCADE,
    status case_status NOT NULL DEFAULT 'pending',
    priority urgency_level DEFAULT 'normal',
    resolution_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_farms_farmer ON public.farms(farmer_id);
CREATE INDEX IF NOT EXISTS idx_fields_farm ON public.fields(farm_id);
CREATE INDEX IF NOT EXISTS idx_crop_cycles_field ON public.crop_cycles(field_id);
CREATE INDEX IF NOT EXISTS idx_disease_farmer ON public.disease_detections(farmer_id);
CREATE INDEX IF NOT EXISTS idx_market_commodity ON public.market_prices(commodity, district);
CREATE INDEX IF NOT EXISTS idx_chat_session ON public.chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_detections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expert_cases ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can view & update their own profile
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Farms: Farmers can manage their own farms
CREATE POLICY "Farmers can read own farms" ON public.farms FOR SELECT USING (farmer_id = auth.uid());
CREATE POLICY "Farmers can insert own farms" ON public.farms FOR INSERT WITH CHECK (farmer_id = auth.uid());
CREATE POLICY "Farmers can update own farms" ON public.farms FOR UPDATE USING (farmer_id = auth.uid());
CREATE POLICY "Farmers can delete own farms" ON public.farms FOR DELETE USING (farmer_id = auth.uid());

-- Fields: Farmers can manage fields belonging to their farms
CREATE POLICY "Farmers can read fields" ON public.fields FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.farms WHERE farms.id = fields.farm_id AND farms.farmer_id = auth.uid())
);
CREATE POLICY "Farmers can insert fields" ON public.fields FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.farms WHERE farms.id = fields.farm_id AND farms.farmer_id = auth.uid())
);

-- Crops: Publicly readable for all authenticated users
CREATE POLICY "Public crops read" ON public.crops FOR SELECT USING (TRUE);

-- Disease Detections: Farmers can view/create own disease scans
CREATE POLICY "Farmers view own scans" ON public.disease_detections FOR SELECT USING (farmer_id = auth.uid());
CREATE POLICY "Farmers create own scans" ON public.disease_detections FOR INSERT WITH CHECK (farmer_id = auth.uid());
CREATE POLICY "Experts view assigned scans" ON public.disease_detections FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.expert_cases WHERE expert_cases.disease_detection_id = disease_detections.id AND expert_cases.expert_id = auth.uid())
);

-- Chat: Users can access their own chat sessions
CREATE POLICY "Users view own chat sessions" ON public.chat_sessions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users insert own chat sessions" ON public.chat_sessions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users view own chat messages" ON public.chat_messages FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.chat_sessions WHERE chat_sessions.id = chat_messages.session_id AND chat_sessions.user_id = auth.uid())
);
CREATE POLICY "Users insert chat messages" ON public.chat_messages FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.chat_sessions WHERE chat_sessions.id = chat_messages.session_id AND chat_sessions.user_id = auth.uid())
);

-- Notifications: Users can view & update their own notifications
CREATE POLICY "Users view notifications" ON public.notifications FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users update notifications" ON public.notifications FOR UPDATE USING (user_id = auth.uid());

-- Market Prices & Services: Publicly readable by all users
ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public market prices read" ON public.market_prices FOR SELECT USING (TRUE);
ALTER TABLE public.agricultural_services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public services read" ON public.agricultural_services FOR SELECT USING (TRUE);

-- Storage Buckets Setup (Execute in Supabase SQL editor/Storage console)
INSERT INTO storage.buckets (id, name, public) VALUES ('crop-images', 'crop-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('profile-images', 'profile-images', true) ON CONFLICT DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false) ON CONFLICT DO NOTHING;
