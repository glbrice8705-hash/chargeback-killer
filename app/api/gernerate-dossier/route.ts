import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      transactionId = 'TX-99482-B', 
      amount = '149.00', 
      currency = 'USD', 
      reasonCode = '10.4 / Fraud', 
      customerEmail = 'client@domain.com', 
      ipAddress = '192.0.2.45', 
      deviceFingerprint = 'macOS / Safari / 14 prior sessions', 
      fulfillmentLogs = { status: 'Instant digital provision', timestamp: '2026-10-12T14:22:05Z' }, 
      chatLogs = { interaction: 'Active inquiry on Oct 18 with zero mention of unauthorized access' } 
    } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || typeof apiKey !== 'string' || (!apiKey.startsWith('AIza') && !apiKey.startsWith('AQ.'))) {
      console.error('CRITICAL: GEMINI_API_KEY is missing or invalid.');
      throw new Error('GEMINI_API_KEY is missing or invalid in environment variables.');
    }

    const systemInstructionText = `
You are a senior payment processing dispute analyst and legal documentation specialist. 
Your task is to transform raw merchant transaction metadata, server logs, and customer interaction histories into an authoritative, compelling evidence dossier and dispute response letter formatted for card issuer arbitration (Visa/Mastercard rules).

Structure the output strictly into these four markdown sections:
1. EXECUTIVE STATEMENT: A formal opening assertion declaring the chargeback invalid based on cryptographic and behavioral proof of cardholder authorization.
2. TRANSACTION NARRATIVE & CHRONOLOGY: A sequential, story-driven breakdown splitting the timeline into 'Order Placement & Identity Binding' and 'Service Delivery & Usage Confirmation'.
3. SCRIPTED EVIDENCE HIGHLIGHTS: Provide analytical commentary formatted as blockquote callouts ("Merchant Notes") that 'jazz up' the technical logs, translating hex IPs, device signatures, and access timestamps into persuasive arguments proving the cardholder's active utilization.
4. APPLICABLE CARD BRAND RULES & CLOSING REMAND: Cite specific card network liability shift or compelling evidence guidelines demanding an immediate reversal.

Maintain a formal, uncompromising, and mathematically precise legal tone throughout.
`;

    const userPromptText = `
Generate the formal dispute dossier using the following raw transaction records:
- Transaction ID: 
${transactionId}
- Amount: 
${amount} ${currency}
- Dispute Reason Code: 
${reasonCode}
- Customer Email: 
${customerEmail}
- IP Address: 
${ipAddress}
- Device Fingerprint: 
${deviceFingerprint}
- Fulfillment Logs: 
${JSON.stringify(fulfillmentLogs)}
- Support/Chat Logs: 
${JSON.stringify(chatLogs)}
`;

    // Dynamic authentication handling: Bearer token for AQ. vs query param for AIza
    const isBearerToken = apiKey.startsWith('AQ.');
    const endpointUrl = isBearerToken
      ? `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`
      : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (isBearerToken) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const geminiRes = await fetch(endpointUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        contents: [{ parts: [{ text: userPromptText }] }],
        systemInstruction: { parts: [{ text: systemInstructionText }] },
        generationConfig: { temperature: 0.2 }
      }),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      throw new Error(`Gemini API Error: ${JSON.stringify(data)}`);
    }

    const dossierText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!dossierText) {
      throw new Error('Gemini returned a malformed response structure.');
    }

    return NextResponse.json({ 
      success: true, 
      dossier: dossierText 
    });

  } catch (error: any) {
    console.error('Dossier generation failure:', error.message);
    return NextResponse.json(
      { success: false, error: error.message }, 
      { status: 500 }
    );
  }
}