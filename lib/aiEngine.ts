import { GoogleGenAI, Type } from '@google/genai';

export interface RepresentmentPayload {
  orderId: string;
  merchantName: string;
  customerName: string;
  customerEmail: string;
  disputeAmount: number;
  reasonCode: string;
  deliveryProof: string;
  cardBrand?: string;
  ipAddress?: string;
}

export interface GeneratedRepresentmentDossier {
  winProbabilityScore: number;
  defenseStrategy: string;
  networkMandate: string;
  executiveSummary: string;
  formalRebuttalLetter: string;
  chronologicalEvidenceTimeline: Array<{
    timestamp: string;
    event: string;
    telemetrySource: string;
    legalWeight: 'Critical' | 'Supporting' | 'Corroborating';
  }>;
  evidenceMatrix: Array<{
    category: string;
    proofSupplied: string;
    cardNetworkRuleRef: string;
    adjudicationImpact: string;
  }>;
  processorChecklist: string[];
  reversalValue: number;
}

export async function runRepresentmentEngine(payload: RepresentmentPayload): Promise<GeneratedRepresentmentDossier> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not defined.');
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `You are the Chief Representment Officer at ChargebackKiller.
Synthesize a ruthless, legally cited, institutional bank-grade Representment Rebuttal Package for a payment gateway chargeback under Visa CE 3.0 and Mastercard dispute rules.
Output MUST strictly conform to JSON format with zero conversational commentary.`;

  const userContent = `Order Reference: ${payload.orderId}
Merchant: ${payload.merchantName}
Cardholder: ${payload.customerName} (${payload.customerEmail})
Disputed Amount: $${payload.disputeAmount} USD
Reason Code: ${payload.reasonCode}
Fulfillment & Telemetry Proof: ${payload.deliveryProof}
Card Network: ${payload.cardBrand || 'Visa'}
Session IP: ${payload.ipAddress || '198.51.100.42'}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: [
      { role: 'user', parts: [{ text: `${systemPrompt}\n\n${userContent}` }] }
    ],
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          winProbabilityScore: { type: Type.INTEGER },
          defenseStrategy: { type: Type.STRING },
          networkMandate: { type: Type.STRING },
          executiveSummary: { type: Type.STRING },
          formalRebuttalLetter: { type: Type.STRING },
          chronologicalEvidenceTimeline: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                timestamp: { type: Type.STRING },
                event: { type: Type.STRING },
                telemetrySource: { type: Type.STRING },
                legalWeight: { type: Type.STRING, enum: ['Critical', 'Supporting', 'Corroborating'] }
              },
              required: ['timestamp', 'event', 'telemetrySource', 'legalWeight']
            }
          },
          evidenceMatrix: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                proofSupplied: { type: Type.STRING },
                cardNetworkRuleRef: { type: Type.STRING },
                adjudicationImpact: { type: Type.STRING }
              },
              required: ['category', 'proofSupplied', 'cardNetworkRuleRef', 'adjudicationImpact']
            }
          },
          processorChecklist: { type: Type.ARRAY, items: { type: Type.STRING } },
          reversalValue: { type: Type.INTEGER }
        },
        required: [
          'winProbabilityScore',
          'defenseStrategy',
          'networkMandate',
          'executiveSummary',
          'formalRebuttalLetter',
          'chronologicalEvidenceTimeline',
          'evidenceMatrix',
          'processorChecklist',
          'reversalValue'
        ]
      },
      temperature: 0.15,
    }
  });

  if (!response.text) {
    throw new Error('Empty response from Gemini API');
  }

  return JSON.parse(response.text) as GeneratedRepresentmentDossier;
}
