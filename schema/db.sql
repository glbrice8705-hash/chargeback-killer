-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: chargeback_dossiers
CREATE TABLE IF NOT EXISTS public.chargeback_dossiers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stripe_session_id TEXT UNIQUE NOT NULL,
    customer_email TEXT NOT NULL,
    merchant_name TEXT NOT NULL,
    dispute_amount NUMERIC(10, 2) NOT NULL,
    win_probability_score INT,
    dossier_json JSONB NOT NULL,
    status TEXT NOT NULL DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: exclusion_vault
CREATE TABLE IF NOT EXISTS public.exclusion_vault (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    entity_type TEXT NOT NULL, -- 'ip', 'email_domain', 'card_bin'
    entity_value TEXT NOT NULL,
    threat_reason TEXT NOT NULL,
    risk_score INT NOT NULL DEFAULT 95,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: processed_webhook_events (Idempotency)
CREATE TABLE IF NOT EXISTS public.processed_webhook_events (
    event_id TEXT PRIMARY KEY,
    event_type TEXT NOT NULL,
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.chargeback_dossiers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read by session ID" ON public.chargeback_dossiers FOR SELECT USING (true);
