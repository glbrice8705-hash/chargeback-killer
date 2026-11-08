import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const cookieStore = cookies();
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  // Initialize client with user's cookies for RLS compliance
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false }
  });

  // Get authorization header or session
  const authHeader = req.headers.get('authorization');
  let token = authHeader?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: { user }, error: userError } = await supabase.auth.getUser(token);
  if (userError || !user) {
    return NextResponse.json({ error: 'Invalid token or session expired' }, { status: 401 });
  }

  // Fetch credits and subscription info using admin or RLS-scoped query
  const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SECRET_KEY || '');
  
  const [creditsRes, subRes, merchantRes] = await Promise.all([
    supabaseAdmin.from('user_credits').select('dispute_credits').eq('email', user.email).single(),
    supabaseAdmin.from('operator_subscriptions').select('subscription_status, price_id').eq('email', user.email).single(),
    supabaseAdmin.from('merchants').select('*').eq('id', user.id).single()
  ]);

  return NextResponse.json({
    email: user.email,
    credits: creditsRes.data?.dispute_credits || 0,
    subscription: subRes.data || { subscription_status: 'inactive' },
    merchant: merchantRes.data || null
  }, { status: 200 });
}